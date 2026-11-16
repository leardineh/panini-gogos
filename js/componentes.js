/* =========================================================
   COMPONENTES
   Pedaços do site que se repetem em várias páginas:
   cabeçalho, rodapé, cartão de produto, carrinho e favoritos.
   ========================================================= */

/* ---------- Funções de ajuda ---------- */

// Formata número como dinheiro: 29.9 -> "R$ 29,90"
function dinheiro(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Protege textos para não quebrarem o HTML
function esc(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Acha um produto pelo id. Aceita também "produto:variacao" (ex.: "gogos-peca-unica:zeus")
function acharProduto(id) {
  var partes = String(id).split(':');
  var produto = TODOS_PRODUTOS.find(function (p) { return p.id === partes[0]; });
  if (produto && partes[1] && !acharVariacao(produto, partes[1])) return undefined;
  return produto;
}

/* ---------- Variações (produtos com opções, como o Blister com 1 peça) ---------- */

// Guarda qual variação está escolhida em cada produto (começa pela primeira)
var VARIACAO_ESCOLHIDA = {};

function acharVariacao(produto, idVariacao) {
  if (!produto.variacoes) return null;
  return produto.variacoes.find(function (v) { return v.id === idVariacao; }) || null;
}

function variacaoAtual(produto) {
  if (!produto.variacoes) return null;
  return acharVariacao(produto, VARIACAO_ESCOLHIDA[produto.id]) || produto.variacoes[0];
}

// Junta as informações de um item do carrinho (com ou sem variação)
function infoDoItem(chave) {
  var produto = acharProduto(chave);
  var variacao = acharVariacao(produto, String(chave).split(':')[1]);
  return {
    produto: produto,
    variacao: variacao,
    nome: produto.nome + (variacao ? ' — ' + variacao.nome : ''),
    imagem: variacao ? variacao.imagem : produto.imagem,
    link: '#/produto/' + produto.id + (variacao ? '?v=' + variacao.id : ''),
  };
}

function ehGogos(produto) {
  return produto.id.indexOf('gogos-') === 0;
}

/* ---------- Carrinho e favoritos (ficam salvos no navegador) ---------- */

var LOJA = {
  carrinho: lerSalvo('panini-mockup-cart').filter(function (item) {
    var p = acharProduto(item.id);
    return p && ehGogos(p) && item.quantity > 0;
  }),
  favoritos: lerSalvo('panini-mockup-favorites').filter(function (id) {
    return typeof id === 'string' && acharProduto(id);
  }),
};

function lerSalvo(chave) {
  try {
    var v = JSON.parse(localStorage.getItem(chave) || '[]');
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

function salvarLoja() {
  try {
    localStorage.setItem('panini-mockup-cart', JSON.stringify(LOJA.carrinho));
    localStorage.setItem('panini-mockup-favorites', JSON.stringify(LOJA.favoritos));
  } catch (e) {}
  desenharPagina(); // redesenha a página para mostrar as mudanças
}

function quantidadeNoCarrinho() {
  return LOJA.carrinho.reduce(function (soma, item) { return soma + item.quantity; }, 0);
}

function totalDoCarrinho() {
  return LOJA.carrinho.reduce(function (soma, item) {
    var p = acharProduto(item.id);
    return soma + (p ? p.preco : 0) * item.quantity;
  }, 0);
}

function adicionarAoCarrinho(id) {
  var produto = acharProduto(id);
  if (!produto || !ehGogos(produto)) return;
  // Se o produto tem variações, o carrinho guarda "produto:variacao"
  var variacao = variacaoAtual(produto);
  var chave = variacao ? produto.id + ':' + variacao.id : produto.id;
  var item = LOJA.carrinho.find(function (i) { return i.id === chave; });
  if (item) item.quantity++;
  else LOJA.carrinho.push({ id: chave, quantity: 1 });
  mostrarAviso('sucesso', 'Kit adicionado ao carrinho', infoDoItem(chave).nome);
  salvarLoja();
}

function mudarQuantidade(id, quantidade) {
  if (quantidade < 1) return;
  LOJA.carrinho.forEach(function (i) { if (i.id === id) i.quantity = quantidade; });
  salvarLoja();
}

function removerDoCarrinho(id) {
  LOJA.carrinho = LOJA.carrinho.filter(function (i) { return i.id !== id; });
  mostrarAviso('info', 'Item removido do carrinho');
  salvarLoja();
}

function alternarFavorito(id) {
  var jaEra = LOJA.favoritos.indexOf(id) !== -1;
  if (jaEra) LOJA.favoritos = LOJA.favoritos.filter(function (f) { return f !== id; });
  else LOJA.favoritos.push(id);
  mostrarAviso('sucesso', jaEra ? 'Removido dos favoritos' : 'Salvo nos favoritos');
  salvarLoja();
}

/* ---------- Avisos no canto da tela ---------- */

var ICONE_SUCESSO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>';
var ICONE_INFO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>';

function mostrarAviso(tipo, titulo, texto) {
  var caixa = document.getElementById('avisos');
  var aviso = document.createElement('div');
  aviso.className = 'aviso ' + tipo;
  aviso.innerHTML = (tipo === 'sucesso' ? ICONE_SUCESSO : ICONE_INFO) +
    '<div><div class="aviso-titulo">' + esc(titulo) + '</div>' +
    (texto ? '<div class="aviso-texto">' + esc(texto) + '</div>' : '') + '</div>';
  caixa.appendChild(aviso);
  setTimeout(function () { aviso.classList.add('saindo'); }, 4000);
  setTimeout(function () { aviso.remove(); }, 4300);
}

/* ---------- Logo ---------- */

function logo() {
  return '<img src="imagens/logo-panini.png" alt="Panini" width="1350" height="318" class="h-auto w-[178px] shrink-0">';
}

/* ---------- Cabeçalho (topo de todas as páginas) ---------- */

var menuCelularAberto = false;

function cabecalho(rotaAtual) {
  var favoritos = LOJA.favoritos.length;
  var itens = quantidadeNoCarrinho();
  var ativo = function (rota) { return rotaAtual === rota ? ' text-primary' : ''; };

  var html = '<header class="sticky top-0 z-30 bg-background shadow-sm">';

  // Faixa vermelha do topo
  html += '<div class="bg-primary text-primary-foreground"><div class="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-4 py-2 text-center text-xs font-semibold tracking-wide md:text-sm">' +
    icone('truck', 'h-4 w-4 shrink-0') +
    '<span>Frete grátis acima de R$ 199 · <a class="underline" href="#/gogos">Coleção conceitual Gogo’s</a></span></div></div>';

  // Logo, busca e ícones
  html += '<div class="border-b"><div class="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 md:gap-7">' +
    '<button type="button" class="md:hidden" aria-label="' + (menuCelularAberto ? 'Fechar menu' : 'Abrir menu') + '" data-acao="menu">' + icone(menuCelularAberto ? 'x' : 'menu', 'h-6 w-6') + '</button>' +
    '<a class="shrink-0" aria-label="Panini — página inicial" href="#/">' + logo() + '</a>' +
    '<form class="relative hidden flex-1 md:block" role="search" data-acao="buscar">' +
      '<input type="search" name="q" placeholder="O que você está procurando?" aria-label="Buscar produtos" class="h-11 w-full rounded-full border bg-surface pl-5 pr-12 text-sm outline-none focus:border-primary">' +
      '<button type="submit" aria-label="Buscar" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">' + icone('search', 'h-5 w-5') + '</button>' +
    '</form>' +
    '<div class="ml-auto flex items-center gap-4 text-sm font-medium md:ml-0">' +
      '<a href="https://panini.com.br/customer/account/login/" target="_blank" rel="noreferrer" class="hidden items-center gap-2 hover:text-primary lg:flex">' + icone('user', 'h-5 w-5') +
        '<span class="leading-tight">Olá, visitante<br><span class="font-bold">Entre na Panini</span></span></a>' +
      '<a aria-label="QR Code do site" class="hidden hover:text-primary sm:block" href="#/qrcode">' + icone('qr-code', 'h-6 w-6') + '</a>' +
      '<a aria-label="Favoritos, ' + favoritos + ' itens" class="relative hover:text-primary" href="#/favoritos">' + icone('heart', 'h-6 w-6') +
        (favoritos > 0 ? '<span class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">' + favoritos + '</span>' : '') + '</a>' +
      '<a aria-label="Carrinho, ' + itens + ' itens" class="relative hover:text-primary" href="#/carrinho">' + icone('shopping-cart', 'h-6 w-6') +
        '<span class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">' + itens + '</span></a>' +
    '</div></div>' +
    // Busca no celular
    '<form class="relative px-4 pb-3 md:hidden" role="search" data-acao="buscar">' +
      '<input type="search" name="q" placeholder="Buscar na loja" aria-label="Buscar produtos" class="h-10 w-full rounded-full border bg-surface pl-4 pr-11 text-sm outline-none focus:border-primary">' +
      '<button type="submit" aria-label="Buscar" class="absolute right-8 top-1/2 -translate-y-[calc(50%+6px)]">' + icone('search', 'h-5 w-5') + '</button>' +
    '</form></div>';

  // Menu amarelo de categorias
  html += '<nav class="hidden border-b bg-secondary md:block" aria-label="Categorias principais"><ul class="mx-auto flex max-w-[1440px] items-center justify-between px-3 font-display text-[14px] font-bold uppercase tracking-wide text-secondary-foreground xl:text-[15px]">' +
    '<li><a class="flex items-center gap-1.5 px-2 py-3 hover:text-primary' + ativo('/gogos') + '" href="#/gogos">Gogo’s <span class="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">Novo</span></a></li>';
  CATEGORIAS.forEach(function (c) {
    html += '<li><a class="block px-2 py-3 hover:text-primary' + ativo('/categoria/' + c.slug) + '" href="#/categoria/' + c.slug + '">' + esc(c.nome) + '</a></li>';
  });
  html += '</ul></nav>';

  // Menu do celular (abre no botão ☰)
  if (menuCelularAberto) {
    html += '<nav class="absolute left-0 right-0 border-b bg-secondary px-4 py-4 shadow-card md:hidden" aria-label="Menu móvel"><ul class="grid grid-cols-2 gap-2 font-display text-lg font-bold uppercase">' +
      '<li><a href="#/gogos" class="block rounded-md bg-ink px-4 py-3 text-brand-yellow">Gogo’s</a></li>';
    CATEGORIAS.forEach(function (c) {
      html += '<li><a href="#/categoria/' + c.slug + '" class="block rounded-md bg-background px-4 py-3">' + esc(c.nome) + '</a></li>';
    });
    html += '<li><a href="#/qrcode" class="block rounded-md bg-background px-4 py-3">QR Code</a></li></ul></nav>';
  }

  return html + '</header>';
}

/* ---------- Rodapé (fim de todas as páginas) ---------- */

function rodape() {
  return '<footer class="bg-ink text-ink-foreground"><div class="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-4">' +
    '<div class="space-y-4"><div class="inline-flex rounded-md bg-background p-3">' + logo() + '</div>' +
      '<p class="max-w-xs text-sm opacity-70">Uma experiência conceitual inspirada na loja Panini Brasil, com a coleção autoral Gogo’s.</p>' +
      '<a class="inline-flex rounded-md bg-secondary px-4 py-2 font-display font-bold uppercase text-secondary-foreground" href="#/qrcode">Abrir QR Code</a></div>' +
    '<div><h2 class="mb-4 font-display text-lg font-bold uppercase tracking-wide text-brand-yellow">Institucional</h2><ul class="space-y-2 text-sm opacity-80">' +
      '<li><a href="https://panini.com.br/sobre-a-panini" target="_blank" rel="noreferrer" class="hover:underline">Sobre a Panini</a></li>' +
      '<li><a href="https://panini.com.br/privacy-policy-cookie-restriction-mode" target="_blank" rel="noreferrer" class="hover:underline">Política de privacidade</a></li>' +
      '<li><a href="https://paninihelp.zendesk.com/hc/pt-br" target="_blank" rel="noreferrer" class="hover:underline">Central de atendimento</a></li></ul></div>' +
    '<div><h2 class="mb-4 font-display text-lg font-bold uppercase tracking-wide text-brand-yellow">Categorias</h2><ul class="space-y-2 text-sm opacity-80">' +
      '<li><a class="hover:underline" href="#/categoria/mangas">Mangás</a></li>' +
      '<li><a class="hover:underline" href="#/categoria/marvel">Marvel</a></li>' +
      '<li><a class="hover:underline" href="#/categoria/figurinhas">Figurinhas</a></li>' +
      '<li><a class="hover:underline" href="#/gogos">Gogo’s</a></li></ul></div>' +
    '<div><h2 class="mb-4 font-display text-lg font-bold uppercase tracking-wide text-brand-yellow">Sua experiência</h2><ul class="space-y-2 text-sm opacity-80">' +
      '<li><a class="hover:underline" href="#/favoritos">Favoritos</a></li>' +
      '<li><a class="hover:underline" href="#/carrinho">Carrinho de kits</a></li>' +
      '<li><a href="https://panini.com.br/" target="_blank" rel="noreferrer" class="hover:underline">Loja oficial Panini</a></li></ul></div>' +
    '</div><div class="border-t border-ink-foreground/10 px-4 py-5 text-center text-xs opacity-70"><p class="mx-auto max-w-4xl">© 2026 Mockup ilustrativo — não é o site oficial. Produtos e preços da Panini foram consultados em 14/11/2026 e podem mudar; a compra desses itens é concluída na loja oficial. Os kits Gogo’s são conceituais e não estão à venda.</p></div></footer>';
}

/* ---------- Cartão de produto ---------- */

function cartaoProduto(p) {
  var gogos = ehGogos(p);
  var favorito = LOJA.favoritos.indexOf(p.id) !== -1;
  var nome = esc(p.nome);
  var variacao = variacaoAtual(p);
  var imagem = variacao ? variacao.imagem : p.imagem;
  // Kits Gogo's abrem a página do produto; os oficiais abrem a loja Panini
  var link = gogos ? 'href="#/produto/' + p.id + (variacao ? '?v=' + variacao.id : '') + '"' : 'href="' + esc(p.linkOficial) + '" target="_blank" rel="noreferrer"';

  var html = '<article class="group flex h-full flex-col rounded-lg border bg-card p-3 transition-shadow hover:shadow-card">' +
    '<div class="relative overflow-hidden rounded-md bg-surface">' +
      '<a ' + link + ' aria-label="Ver ' + nome + (gogos ? '' : ' na loja oficial') + '"><img src="' + esc(imagem) + '" alt="' + nome + (variacao ? ' — ' + esc(variacao.nome) : '') + '" loading="lazy" width="700" height="700" class="aspect-square w-full object-contain transition-transform group-hover:scale-105"></a>' +
      (p.etiqueta ? '<span class="absolute left-2 top-2 rounded-sm bg-primary px-2 py-0.5 text-[11px] font-bold uppercase text-primary-foreground">' + esc(p.etiqueta) + '</span>' : '') +
      '<button type="button" data-acao="favoritar" data-id="' + p.id + '" aria-label="' + (favorito ? 'Remover ' + nome + ' dos favoritos' : 'Favoritar ' + nome) + '" aria-pressed="' + favorito + '" class="absolute right-2 top-2 rounded-full bg-background p-2 shadow-card transition-transform hover:scale-110">' +
        icone('heart', 'h-4 w-4' + (favorito ? ' fill-primary text-primary' : '')) + '</button>' +
    '</div>' +
    '<h3 class="mt-3 line-clamp-3 min-h-[3.75rem] text-sm font-medium"><a ' + link + ' class="hover:text-primary">' + nome + '</a></h3>' +
    '<div class="mb-3 mt-2">' +
      (p.precoAntigo ? '<p class="text-xs text-muted-foreground line-through">' + dinheiro(p.precoAntigo) + '</p>' : '') +
      '<p class="text-xl font-bold text-price">' + dinheiro(p.preco) + '</p>' +
      '<p class="text-xs text-muted-foreground">ou 3x de ' + dinheiro(p.preco / 3) + ' sem juros</p>' +
    '</div>';

  // Botões para escolher a variação (só aparece em produtos com variações)
  if (variacao) html += botoesVariacao(p, 'variacoes');

  if (gogos) {
    html += '<button type="button" data-acao="adicionar" data-id="' + p.id + '" class="mt-auto flex items-center justify-center gap-2 rounded-md bg-secondary py-2.5 font-display text-sm font-bold uppercase text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">' + icone('shopping-cart', 'h-4 w-4') + ' Adicionar</button>';
  } else {
    html += '<a ' + link + ' class="mt-auto flex items-center justify-center gap-2 rounded-md bg-secondary py-2.5 text-center font-display text-sm font-bold uppercase text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">Ver na Panini ' + icone('external-link', 'h-4 w-4') + '</a>';
  }
  return html + '</article>';
}

// Botões de escolha da variação.
// estilo "variacoes" = botõezinhos com o nome (cartão)
// estilo "variacoes-grandes" = miniaturas com foto (página do produto)
function botoesVariacao(p, estilo) {
  var atual = variacaoAtual(p);
  var comFoto = estilo === 'variacoes-grandes';
  return '<div class="' + estilo + '" role="group" aria-label="Escolha o Gogo’s">' +
    p.variacoes.map(function (v) {
      var ativo = v.id === atual.id;
      return '<button type="button" data-acao="variacao" data-id="' + p.id + '" data-var="' + v.id + '" aria-pressed="' + ativo + '" class="variacao' + (ativo ? ' ativa' : '') + '">' +
        (comFoto ? '<img src="' + esc(v.imagem) + '" alt="">' : '') + '<span>' + esc(v.nome) + '</span></button>';
    }).join('') + '</div>';
}

// Grade com vários cartões
function gradeProdutos(lista) {
  return '<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">' + lista.map(cartaoProduto).join('') + '</div>';
}
