/* =========================================================
   APP (o "motor" do site)
   Decide qual página mostrar de acordo com o endereço e
   faz os botões funcionarem. Normalmente não precisa mexer aqui.

   Endereços das páginas (tudo depois do #):
     #/                     página inicial
     #/gogos                área Gogo's
     #/categoria/mangas     uma categoria
     #/produto/gogos-caixa-6  página de um kit
     #/carrinho  #/favoritos  #/qrcode
     #/busca?q=batman       busca
   ========================================================= */

var rotaAnterior = null;

function rotaAtual() {
  var r = location.hash.replace(/^#/, '') || '/';
  return r.charAt(0) === '/' ? r : '/' + r;
}

function escolherPagina(rota) {
  var partes = rota.split('?');
  var caminho = partes[0].replace(/\/+$/, '') || '/';
  var params = new URLSearchParams(partes[1] || '');
  var pedacos = caminho.split('/').filter(Boolean).map(decodeURIComponent);

  if (caminho === '/') return paginaInicial();
  if (caminho === '/gogos') return paginaGogos();
  if (caminho === '/carrinho') return paginaCarrinho();
  if (caminho === '/favoritos') return paginaFavoritos();
  if (caminho === '/qrcode') return paginaQrcode();
  if (caminho === '/busca') return paginaBusca(params.get('q') || '');
  if (pedacos[0] === 'categoria' && pedacos.length === 2) return paginaCategoria(pedacos[1]);
  if (pedacos[0] === 'produto' && pedacos.length === 2) return paginaProduto(pedacos[1]);
  return paginaNaoEncontrada();
}

function desenharPagina() {
  var rota = rotaAtual();
  var mudouDePagina = rota !== rotaAnterior;
  if (mudouDePagina) {
    // Ao trocar de página, volta tudo ao estado inicial
    menuCelularAberto = false;
    newsletterEnviada = false;
    reservaSimulada = false;
    linkCopiado = false;
    // Link de produto com variação (ex.: #/produto/gogos-peca-unica?v=zeus) já abre na variação certa
    var m = rota.match(/^\/produto\/([^?\/]+)\?(.*)$/);
    if (m) {
      var v = new URLSearchParams(m[2]).get('v');
      if (v) VARIACAO_ESCOLHIDA[decodeURIComponent(m[1])] = v;
    }
  }
  var pagina = escolherPagina(rota);
  var caminho = rota.split('?')[0];

  document.title = pagina.titulo;
  document.getElementById('app').innerHTML = pagina.semCabecalho
    ? pagina.html
    : '<div class="min-h-screen bg-background">' + cabecalho(caminho) + pagina.html + rodape() + '</div>';

  if (mudouDePagina) {
    window.scrollTo(0, 0);
    rotaAnterior = rota;
  }
}

/* ---------- Cliques nos botões ---------- */
document.addEventListener('click', function (e) {
  var alvo = e.target.closest('[data-acao]');
  if (!alvo || alvo.tagName === 'FORM') return;
  var id = alvo.getAttribute('data-id');
  var acao = alvo.getAttribute('data-acao');

  if (acao === 'menu') { menuCelularAberto = !menuCelularAberto; desenharPagina(); }
  if (acao === 'variacao') { VARIACAO_ESCOLHIDA[id] = alvo.getAttribute('data-var'); desenharPagina(); }
  if (acao === 'favoritar') alternarFavorito(id);
  if (acao === 'adicionar') adicionarAoCarrinho(id);
  if (acao === 'remover') removerDoCarrinho(id);
  if (acao === 'mais' || acao === 'menos') {
    var item = LOJA.carrinho.find(function (i) { return i.id === id; });
    if (item) mudarQuantidade(id, item.quantity + (acao === 'mais' ? 1 : -1));
  }
  if (acao === 'copiar-link') {
    var copiar = navigator.clipboard ? navigator.clipboard.writeText(LINK_DO_SITE) : Promise.reject();
    copiar.catch(function () {}).then(function () {
      linkCopiado = true; desenharPagina();
      setTimeout(function () { linkCopiado = false; desenharPagina(); }, 2000);
    });
  }
});

/* ---------- Envio de formulários ---------- */
document.addEventListener('submit', function (e) {
  var form = e.target;
  var acao = form.getAttribute('data-acao');
  if (!acao) return;
  e.preventDefault();

  if (acao === 'buscar') {
    var termo = form.querySelector('input').value.trim();
    if (termo) location.hash = '#/busca?q=' + encodeURIComponent(termo);
  }
  if (acao === 'newsletter') { newsletterEnviada = true; desenharPagina(); }
  if (acao === 'reservar') { reservaSimulada = true; desenharPagina(); }
});

// Quando o endereço muda (clique num link), desenha a nova página
window.addEventListener('hashchange', desenharPagina);

// Desenha a primeira página
desenharPagina();
