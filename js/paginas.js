/* =========================================================
   PÁGINAS
   Cada função abaixo monta uma página do site.
   Os textos estão escritos direto aqui: é só procurar
   (Ctrl+F) o texto que você quer mudar e trocar.
   ========================================================= */

/* ---------------- PÁGINA INICIAL ---------------- */

// Os 4 benefícios da faixa cinza logo abaixo do banner
var BENEFICIOS = [
  { icone: 'truck', titulo: 'Frete grátis', texto: 'Em compras acima de R$ 199' },
  { icone: 'credit-card', titulo: 'Até 6x sem juros', texto: 'Consulte as condições oficiais' },
  { icone: 'package-check', titulo: 'Pré-venda Gogo’s', texto: 'Coleção conceitual' },
  { icone: 'shield-check', titulo: 'Compra na oficial', texto: 'Links diretos para a Panini' },
];

var newsletterEnviada = false;

function paginaInicial() {
  var html = '';

  // Banner grande
  html += '<section class="relative bg-ink" aria-label="Coleção Gogo’s">' +
    '<a class="block" aria-label="Conhecer a coleção Gogo’s" href="#/gogos"><img src="imagens/banner-gogos.jpg" alt="O poder dos deuses em suas mãos — Gogo’s. Panini" width="1920" height="600" class="mx-auto block aspect-[1920/600] w-full max-w-[1920px] object-cover"></a>' +
    '<a class="botao-banner absolute bottom-5 hidden rounded-full bg-secondary px-6 py-2 font-display text-sm font-bold uppercase text-secondary-foreground shadow-card hover:bg-primary hover:text-primary-foreground md:block" href="#/gogos">Conhecer a coleção</a>' +
    '</section>';

  // Faixa de benefícios
  html += '<section class="border-b bg-surface"><div class="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-4 py-5 md:grid-cols-4">';
  BENEFICIOS.forEach(function (b) {
    html += '<div class="flex items-center gap-3">' + icone(b.icone, 'h-8 w-8 shrink-0 text-primary') +
      '<div class="leading-tight"><p class="font-display text-base font-bold uppercase">' + b.titulo + '</p><p class="text-xs text-muted-foreground">' + b.texto + '</p></div></div>';
  });
  html += '</div></section>';

  // Bolinhas de categorias
  html += '<section class="mx-auto max-w-[1440px] px-4 py-12" aria-labelledby="categorias">' +
    '<div class="mb-6 flex items-end justify-between"><h2 id="categorias" class="font-display text-3xl font-extrabold uppercase">Navegue por categoria</h2><a class="text-sm font-bold text-primary hover:underline" href="#/gogos">Ver Gogo’s</a></div>' +
    '<div class="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-10">';
  CATEGORIAS.forEach(function (c) {
    html += '<a class="mx-auto flex aspect-square w-full max-w-[130px] items-center justify-center rounded-full bg-secondary text-center font-display text-base font-extrabold uppercase text-secondary-foreground transition-transform hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground" href="#/categoria/' + c.slug + '">' + esc(c.nome) + '</a>';
  });
  html += '</div></section>';

  // Seção escura Gogo's
  html += '<section class="bg-ink py-12 text-ink-foreground"><div class="mx-auto max-w-[1440px] px-4">' +
    '<div class="mb-6 flex items-end justify-between"><div><p class="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">Coleção exclusiva</p><h2 class="font-display text-4xl font-extrabold uppercase text-brand-yellow">Gogo’s Deuses e Mitos</h2></div>' +
    '<a class="text-sm font-bold text-brand-yellow hover:underline" href="#/gogos">Abrir área Gogo’s</a></div>' +
    gradeProdutos(PRODUTOS_GOGOS) + '</div></section>';

  // Produtos reais (os 10 primeiros)
  html += '<section class="mx-auto max-w-[1440px] px-4 py-14" aria-labelledby="oficiais">' +
    '<div class="mb-2 flex items-end justify-between"><h2 id="oficiais" class="font-display text-3xl font-extrabold uppercase">Produtos reais da Panini</h2><a class="text-sm font-bold text-primary hover:underline" href="#/categoria/ofertas">Ver ofertas</a></div>' +
    '<p class="mb-7 text-sm text-muted-foreground">Seleção consultada na loja oficial em 14/11/2026. Clique em um produto para abrir a página oficial de compra.</p>' +
    gradeProdutos(PRODUTOS_OFICIAIS.slice(0, 10)) + '</section>';

  // Cadastro de e-mail (simulação)
  html += '<section class="bg-secondary"><div class="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">' +
    '<div><p class="font-display text-2xl font-extrabold uppercase">Receba as novidades da Panini</p><p class="text-sm">Simulação de cadastro para este mockup.</p></div>' +
    (newsletterEnviada
      ? '<p role="status" class="rounded-md bg-background px-6 py-3 font-bold text-primary">E-mail registrado nesta demonstração.</p>'
      : '<form class="flex w-full max-w-md gap-2" data-acao="newsletter"><input type="email" required aria-label="Seu e-mail" placeholder="Seu e-mail" class="h-11 flex-1 rounded-md border bg-background px-4 text-sm outline-none"><button class="rounded-md bg-primary px-6 font-display font-bold uppercase text-primary-foreground">Cadastrar</button></form>') +
    '</div></section>';

  // Chamada do QR Code
  html += '<section class="mx-auto max-w-[1440px] px-4 py-10"><a class="flex flex-col items-center justify-between gap-5 rounded-xl border bg-surface p-6 text-center transition-shadow hover:shadow-card md:flex-row md:text-left" href="#/qrcode">' +
    '<div class="flex items-center gap-4">' + icone('qr-code', 'h-12 w-12 text-primary') + '<div><h2 class="font-display text-2xl font-extrabold uppercase">Leve esta loja com você</h2><p class="text-sm text-muted-foreground">Abra o QR Code, aponte a câmera do celular e compartilhe.</p></div></div>' +
    '<span class="rounded-md bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground">Ver QR Code</span></a></section>';

  return { titulo: 'Panini + Gogo’s Deuses e Mitos — Loja conceito 2026', html: '<main>' + html + '</main>' };
}

/* ---------------- ÁREA GOGO'S ---------------- */

var DESTAQUES_GOGOS = [
  'Artes originais enviadas pelo criador',
  'Detalhes e conteúdo de cada kit',
  'Carrinho de demonstração funcional',
];

function paginaGogos() {
  var html = '<main><section class="bg-ink"><img src="imagens/banner-gogos.jpg" alt="O poder dos deuses em suas mãos — Gogo’s" width="1920" height="600" class="mx-auto aspect-[1920/600] w-full max-w-[1920px] object-cover"></section>' +
    '<section class="mx-auto max-w-[1440px] px-4 py-12">' +
    '<div class="mb-10 grid items-center gap-8 md:grid-cols-[1fr_1.4fr]"><img src="imagens/gogos-titulo.png" alt="Gogo’s" class="mx-auto w-full max-w-md">' +
    '<div><p class="mb-2 font-display font-bold uppercase tracking-[0.2em] text-primary">Coleção Deuses e Mitos</p>' +
    '<h1 class="font-display text-4xl font-extrabold uppercase md:text-5xl">O poder dos deuses em suas mãos</h1>' +
    '<p class="mt-4 max-w-2xl text-muted-foreground">Sete personagens, três mitologias e uma coleção autoral. Escolha uma mitologia, pegue seu deus favorito no blister de peça única ou reúna Zeus, Poseidon, Thor, Rá, Anúbis, Bastet e Hela na edição completa!</p>' +
    '<p class="mt-3 text-sm font-semibold text-primary">Produtos conceituais deste mockup — não há cobrança real.</p></div></div>' +
    gradeProdutos(PRODUTOS_GOGOS) +
    '<div class="mt-12 grid gap-4 md:grid-cols-3">';
  DESTAQUES_GOGOS.forEach(function (t) {
    html += '<div class="flex items-center gap-3 rounded-lg bg-surface p-5">' + icone('check', 'h-6 w-6 text-primary') + '<span class="font-semibold">' + t + '</span></div>';
  });
  html += '</div><div class="mt-8 text-center"><a class="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-display font-bold uppercase text-secondary-foreground" href="#/qrcode">' + icone('qr-code', 'h-5 w-5') + ' Compartilhar com QR Code</a></div></section></main>';
  return { titulo: 'Gogo’s Deuses e Mitos — Kits da coleção | Panini Mockup', html: html };
}

/* ---------------- CATEGORIA ---------------- */

function paginaCategoria(slug) {
  var categoria = CATEGORIAS.find(function (c) { return c.slug === slug; });
  if (!categoria) return paginaNaoEncontrada();
  var lista = TODOS_PRODUTOS.filter(function (p) { return p.categorias.indexOf(slug) !== -1; });
  var html = '<main class="mx-auto max-w-[1440px] px-4 py-10">' +
    '<p class="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Loja Panini</p>' +
    '<h1 class="font-display text-4xl font-extrabold uppercase">' + esc(categoria.nome) + '</h1>' +
    '<p class="mb-8 mt-2 text-muted-foreground">' + lista.length + ' ' + (lista.length === 1 ? 'produto selecionado' : 'produtos selecionados') + '. Os itens oficiais abrem na loja Panini.</p>' +
    gradeProdutos(lista) + '</main>';
  return { titulo: categoria.nome + ' — Produtos Panini | Mockup', html: html };
}

/* ---------------- PRODUTO (só kits Gogo's) ---------------- */

function paginaProduto(id) {
  var p = acharProduto(id);
  if (!p || !ehGogos(p)) return paginaNaoEncontrada();
  var favorito = LOJA.favoritos.indexOf(p.id) !== -1;
  var variacao = variacaoAtual(p);
  var imagem = variacao ? variacao.imagem : p.imagem;

  // Produto com variações mostra os botões de escolha; os outros mostram os personagens incluídos
  var caixa = variacao
    ? '<div class="mt-6 rounded-lg bg-surface p-5"><h2 class="mb-3 font-display text-xl font-bold uppercase">Escolha seu Gogo’s: <span class="text-primary">' + esc(variacao.nome) + '</span></h2>' + botoesVariacao(p, 'variacoes-grandes') + '</div>'
    : '<div class="mt-6 rounded-lg bg-surface p-5"><h2 class="mb-3 font-display text-xl font-bold uppercase">Personagens incluídos</h2><ul class="grid grid-cols-2 gap-2">' +
      (p.personagens || []).map(function (n) { return '<li class="flex items-center gap-2">' + icone('check', 'h-4 w-4 text-primary') + esc(n) + '</li>'; }).join('') +
      '</ul></div>';

  var html = '<main class="mx-auto max-w-[1240px] px-4 py-8">' +
    '<a class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="#/gogos">' + icone('arrow-left', 'h-4 w-4') + ' Voltar para Gogo’s</a>' +
    '<div class="grid gap-10 md:grid-cols-2">' +
    '<div class="rounded-xl border bg-surface p-4"><img src="' + esc(imagem) + '" alt="' + esc(p.nome) + (variacao ? ' — ' + esc(variacao.nome) : '') + '" width="1024" height="1024" class="aspect-square w-full rounded-lg object-contain"></div>' +
    '<div class="flex flex-col justify-center">' +
    '<p class="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">' + esc(p.etiqueta) + '</p>' +
    '<h1 class="mt-2 font-display text-4xl font-extrabold uppercase">' + esc(p.nome) + '</h1>' +
    '<p class="mt-5 text-muted-foreground">' + esc(p.descricao || '') + '</p>' +
    caixa +
    '<div class="mt-7">' +
    (p.precoAntigo ? '<p class="text-sm text-muted-foreground line-through">' + dinheiro(p.precoAntigo) + '</p>' : '') +
    '<p class="text-4xl font-bold text-price">' + dinheiro(p.preco) + '</p>' +
    '<p class="text-sm text-muted-foreground">ou 3x de ' + dinheiro(p.preco / 3) + ' sem juros — valor ilustrativo</p></div>' +
    '<div class="mt-7 flex gap-3">' +
    '<button type="button" data-acao="adicionar" data-id="' + p.id + '" class="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-display text-lg font-bold uppercase text-primary-foreground hover:opacity-90">' + icone('shopping-cart', 'h-5 w-5') + ' Adicionar ao carrinho</button>' +
    '<button type="button" data-acao="favoritar" data-id="' + p.id + '" aria-label="Alternar favorito" aria-pressed="' + favorito + '" class="rounded-md border px-4">' + icone('heart', 'h-6 w-6' + (favorito ? ' fill-primary text-primary' : '')) + '</button></div>' +
    '<a class="mt-4 text-center text-sm font-bold text-primary hover:underline" href="#/carrinho">Ir para o carrinho de demonstração</a>' +
    '</div></div></main>';
  return { titulo: p.nome + ' | Panini Mockup', html: html };
}

/* ---------------- CARRINHO ---------------- */

var reservaSimulada = false;

function paginaCarrinho() {
  var html = '<main class="mx-auto min-h-[55vh] max-w-[1100px] px-4 py-10">' +
    '<h1 class="font-display text-4xl font-extrabold uppercase">Carrinho de kits Gogo’s</h1>' +
    '<p class="mb-8 mt-2 text-muted-foreground">Demonstração sem cobrança ou reserva real.</p>';

  if (!LOJA.carrinho.length) {
    html += '<div class="rounded-xl bg-surface px-6 py-16 text-center">' + icone('shopping-cart', 'mx-auto h-12 w-12 text-primary') +
      '<h2 class="mt-4 font-display text-2xl font-bold uppercase">Seu carrinho está vazio</h2>' +
      '<a class="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground" href="#/gogos">Conhecer os kits</a></div>';
  } else {
    html += '<div class="grid gap-8 md:grid-cols-[1.5fr_1fr]"><div class="space-y-4">';
    LOJA.carrinho.forEach(function (item) {
      var info = infoDoItem(item.id); // nome e foto já com a variação (ex.: "... — Zeus")
      var n = esc(info.nome);
      var chave = esc(item.id);
      html += '<article class="flex gap-4 rounded-lg border p-4"><img src="' + esc(info.imagem) + '" alt="' + n + '" class="h-28 w-28 rounded-md bg-surface object-contain">' +
        '<div class="flex flex-1 flex-col"><a class="font-bold hover:text-primary" href="' + info.link + '">' + n + '</a>' +
        '<p class="mt-1 font-bold text-price">' + dinheiro(info.produto.preco) + '</p>' +
        '<div class="mt-auto flex items-center justify-between"><div class="flex items-center rounded-md border">' +
        '<button type="button" data-acao="menos" data-id="' + chave + '" aria-label="Diminuir quantidade de ' + n + '"' + (item.quantity <= 1 ? ' disabled' : '') + ' class="p-2 disabled:opacity-30">' + icone('minus', 'h-4 w-4') + '</button>' +
        '<span class="w-8 text-center font-bold" aria-label="Quantidade ' + item.quantity + '">' + item.quantity + '</span>' +
        '<button type="button" data-acao="mais" data-id="' + chave + '" aria-label="Aumentar quantidade de ' + n + '" class="p-2">' + icone('plus', 'h-4 w-4') + '</button></div>' +
        '<button type="button" data-acao="remover" data-id="' + chave + '" aria-label="Remover ' + n + '" class="p-2 text-primary">' + icone('trash-2', 'h-5 w-5') + '</button></div></div></article>';
    });
    html += '</div><aside class="h-fit rounded-xl bg-surface p-6"><h2 class="font-display text-2xl font-bold uppercase">Resumo</h2>' +
      '<div class="my-5 flex justify-between border-b pb-5"><span>Total ilustrativo</span><strong class="text-xl text-price">' + dinheiro(totalDoCarrinho()) + '</strong></div>' +
      (reservaSimulada
        ? '<div role="status" class="rounded-md bg-background p-4 text-sm"><strong class="block text-primary">Simulação concluída.</strong><p class="mt-2">Nenhum dado foi enviado e nenhuma reserva ou cobrança foi realizada.</p></div>'
        : '<form class="space-y-3" data-acao="reservar"><label for="reserve-email" class="text-sm font-bold">E-mail para simular a reserva</label>' +
          '<input id="reserve-email" type="email" required placeholder="voce@exemplo.com" class="h-11 w-full rounded-md border bg-background px-3 text-sm">' +
          '<button class="w-full rounded-md bg-primary py-3 font-display font-bold uppercase text-primary-foreground">Simular reserva</button>' +
          '<p class="text-xs text-muted-foreground">O e-mail não será enviado nem armazenado.</p></form>') +
      '</aside></div>';
  }
  return { titulo: 'Carrinho de kits Gogo’s | Panini Mockup', html: html + '</main>' };
}

/* ---------------- FAVORITOS ---------------- */

function paginaFavoritos() {
  var lista = TODOS_PRODUTOS.filter(function (p) { return LOJA.favoritos.indexOf(p.id) !== -1; });
  var html = '<main class="mx-auto min-h-[55vh] max-w-[1440px] px-4 py-10">' +
    '<h1 class="font-display text-4xl font-extrabold uppercase">Meus favoritos</h1>' +
    '<p class="mb-8 mt-2 text-muted-foreground">Sua seleção fica salva neste navegador.</p>';
  if (lista.length) html += gradeProdutos(lista);
  else html += '<div class="rounded-xl bg-surface px-6 py-16 text-center">' + icone('heart', 'mx-auto h-12 w-12 text-primary') +
    '<h2 class="mt-4 font-display text-2xl font-bold uppercase">Nenhum favorito ainda</h2>' +
    '<p class="mt-2 text-muted-foreground">Toque no coração de qualquer produto para guardá-lo aqui.</p>' +
    '<a class="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-display font-bold uppercase text-primary-foreground" href="#/">Explorar produtos</a></div>';
  return { titulo: 'Meus favoritos | Panini + Gogo’s', html: html + '</main>' };
}

/* ---------------- BUSCA ---------------- */

// Tira acentos e deixa minúsculo, para "manga" achar "Mangá"
function normalizar(t) {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function paginaBusca(termo) {
  // Procura no nome do produto e também no nome das variações (ex.: "zeus")
  var lista = TODOS_PRODUTOS.filter(function (p) {
    var texto = p.nome + ' ' + (p.variacoes || []).map(function (v) { return v.nome; }).join(' ');
    return normalizar(texto).indexOf(normalizar(termo)) !== -1;
  });
  var html = '<main class="mx-auto max-w-[1440px] px-4 py-10"><div class="mb-8 flex items-center gap-3">' + icone('search', 'h-8 w-8 text-primary') +
    '<div><h1 class="font-display text-4xl font-extrabold uppercase">Resultados para “' + esc(termo) + '”</h1>' +
    '<p class="text-muted-foreground">' + lista.length + ' ' + (lista.length === 1 ? 'produto encontrado' : 'produtos encontrados') + '</p></div></div>';
  if (lista.length) html += gradeProdutos(lista);
  else html += '<div class="rounded-lg bg-surface p-10 text-center"><p class="font-bold">Nenhum produto encontrado.</p><p class="mt-2 text-muted-foreground">Tente “Batman”, “One Piece”, “figurinhas” ou “Gogo’s”.</p></div>';
  return { titulo: 'Busca de produtos | Panini + Gogo’s', html: html + '</main>' };
}

/* ---------------- QR CODE ---------------- */

// Link que aparece na página do QR Code (troque pelo endereço do seu site, se publicar)
var LINK_DO_SITE = 'https://id-preview--fa25eab2-55eb-4ffe-867d-1d9757a8706e.lovable.app/';
var linkCopiado = false;

function paginaQrcode() {
  var html = '<main class="mx-auto max-w-[1000px] px-4 py-12"><div class="grid items-center gap-10 rounded-2xl border bg-surface p-6 md:grid-cols-2 md:p-10">' +
    '<div class="rounded-xl bg-background p-5 shadow-card"><img src="imagens/qrcode.png" alt="QR Code que abre esta loja conceito Panini e Gogo’s" width="912" height="912" class="mx-auto w-full max-w-[420px]"></div>' +
    '<div><p class="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">Compartilhe a coleção</p>' +
    '<h1 class="mt-2 font-display text-4xl font-extrabold uppercase">Abra a loja no seu celular</h1>' +
    '<p class="mt-4 text-muted-foreground">Aponte a câmera para o código ou use os botões abaixo. Este QR aponta para a prévia atual do projeto.</p>' +
    '<div class="mt-6 break-all rounded-md bg-background p-3 text-xs text-muted-foreground">' + esc(LINK_DO_SITE) + '</div>' +
    '<div class="mt-6 flex flex-wrap gap-3">' +
    '<a href="imagens/qrcode.png" download="qrcode-site-panini-gogos.png" class="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display font-bold uppercase text-primary-foreground">' + icone('download', 'h-5 w-5') + ' Baixar QR Code</a>' +
    '<button type="button" data-acao="copiar-link" class="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 font-display font-bold uppercase text-secondary-foreground">' + (linkCopiado ? icone('check', 'h-5 w-5') + 'Link copiado' : icone('copy', 'h-5 w-5') + 'Copiar link') + '</button>' +
    '<a href="' + esc(LINK_DO_SITE) + '" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-3 font-bold text-primary hover:underline">Testar link ' + icone('external-link', 'h-4 w-4') + '</a>' +
    '</div></div></div></main>';
  return { titulo: 'QR Code da loja | Panini + Gogo’s', html: html };
}

/* ---------------- PÁGINA NÃO ENCONTRADA (404) ---------------- */

function paginaNaoEncontrada() {
  return {
    semCabecalho: true,
    titulo: 'Panini Brasil — Loja oficial',
    html: '<div class="flex min-h-screen items-center justify-center bg-background px-4"><div class="max-w-md text-center">' +
      '<h1 class="text-7xl font-bold text-foreground">404</h1>' +
      '<h2 class="mt-4 text-xl font-semibold text-foreground">Page not found</h2>' +
      '<p class="mt-2 text-sm text-muted-foreground">The page you\'re looking for doesn\'t exist or has been moved.</p>' +
      '<div class="mt-6"><a class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90" href="#/">Go home</a></div>' +
      '</div></div>',
  };
}
