/* =========================================================
   DADOS DO SITE
   Aqui ficam TODOS os produtos e categorias.
   Para mudar um preço, nome ou foto, é só editar abaixo e
   recarregar a página no navegador (F5).

   Preços: use ponto no lugar da vírgula (29.9 = R$ 29,90).
   precoAntigo: é o preço riscado. Apague a linha se não quiser.
   imagem: caminho de uma foto na pasta "imagens" OU um link da internet.
   ========================================================= */

/* ----- Categorias (aparecem no menu amarelo e nas bolinhas) -----
   slug = como aparece no endereço (sem acento e sem espaço)
   nome = como aparece na tela */
var CATEGORIAS = [
  { slug: "mangas", nome: "Mangás" },
  { slug: "marvel", nome: "Marvel" },
  { slug: "dc", nome: "DC" },
  { slug: "figurinhas", nome: "Figurinhas" },
  { slug: "livros", nome: "Livros" },
  { slug: "revistas", nome: "Revistas" },
  { slug: "colecionaveis", nome: "Colecionáveis" },
  { slug: "pre-venda", nome: "Pré-venda" },
  { slug: "ofertas", nome: "Ofertas" },
];

/* ----- Kits Gogo's (produtos que podem ir para o carrinho) -----
   IMPORTANTE: o id precisa começar com "gogos-" */
var PRODUTOS_GOGOS = [
  {
    id: "gogos-caixa-6",
    nome: "Gogo's Deuses e Mitos — Caixa edição completa",
    imagem: "imagens/gogos-colecao-completa.webp",
    preco: 79.9,
    etiqueta: "Edição completa",
    categorias: ["colecionaveis", "pre-venda"],
    descricao: "A apresentação completa da coleção conceitual com os sete deuses reunidos. Produto ilustrativo, sem venda ou cobrança real.",
    personagens: ["Zeus", "Poseidon", "Thor", "Rá", "Anúbis", "Bastet", "Hela"],
  },
  /* Produto COM VARIAÇÕES: o cliente escolhe qual Gogo's quer.
     Cada variação tem seu próprio nome e imagem.
     Para adicionar outra variação, copie uma linha de "variacoes"
     e mude o id (sem acento/espaço), o nome e a imagem. */
  {
    id: "gogos-peca-unica",
    nome: "Gogo's Deuses e Mitos — Blister com 1 peça",
    imagem: "imagens/gogos-unica-ra.webp",
    preco: 12.9,
    etiqueta: "Peça única",
    categorias: ["colecionaveis", "pre-venda"],
    descricao: "Escolha o seu deus favorito em um blister individual da coleção Deuses e Mitos. Produto conceitual criado para este mockup, sem venda ou cobrança real.",
    variacoes: [
      { id: "ra", nome: "Rá", imagem: "imagens/gogos-unica-ra.webp" },
      { id: "poseidon", nome: "Poseidon", imagem: "imagens/gogos-unica-poseidon.webp" },
      { id: "bastet", nome: "Bastet", imagem: "imagens/gogos-unica-bastet.webp" },
      { id: "zeus", nome: "Zeus", imagem: "imagens/gogos-unica-zeus.webp" },
      { id: "thor", nome: "Thor", imagem: "imagens/gogos-unica-thor.webp" },
      { id: "anubis", nome: "Anúbis", imagem: "imagens/gogos-unica-anubis.webp" },
      { id: "hela", nome: "Hela", imagem: "imagens/gogos-unica-hela.webp" },
    ],
  },
  {
    id: "gogos-blister-egipcia",
    nome: "Gogo's Deuses e Mitos — Blister Mitologia Egípcia com 3 peças",
    imagem: "imagens/gogos-blister-egipcia.webp",
    preco: 34.9,
    etiqueta: "Mitologia egípcia",
    categorias: ["colecionaveis", "pre-venda"],
    descricao: "Os três deuses do Egito reunidos em um blister especial da coleção Deuses e Mitos. Produto conceitual criado para este mockup, sem venda ou cobrança real.",
    personagens: ["Rá", "Bastet", "Anúbis"],
  },
  {
    id: "gogos-blister-grega",
    nome: "Gogo's Deuses e Mitos — Blister Mitologia Grega com 2 peças",
    imagem: "imagens/gogos-blister-grega.webp",
    preco: 22.9,
    etiqueta: "Mitologia grega",
    categorias: ["colecionaveis", "pre-venda"],
    descricao: "Os irmãos que dominam o céu e os mares reunidos em um blister especial da coleção Deuses e Mitos. Produto conceitual criado para este mockup, sem venda ou cobrança real.",
    personagens: ["Zeus", "Poseidon"],
  },
  {
    id: "gogos-blister-nordica",
    nome: "Gogo's Deuses e Mitos — Blister Mitologia Nórdica com 2 peças",
    imagem: "imagens/gogos-blister-nordica.webp",
    preco: 22.9,
    etiqueta: "Mitologia nórdica",
    categorias: ["colecionaveis", "pre-venda"],
    descricao: "O deus do trovão e a rainha do submundo reunidos em um blister especial da coleção Deuses e Mitos. Produto conceitual criado para este mockup, sem venda ou cobrança real.",
    personagens: ["Thor", "Hela"],
  },
];

/* ----- Produtos reais da Panini (abrem a loja oficial ao clicar) -----
   Os 10 primeiros desta lista aparecem na página inicial. */
var PRODUTOS_OFICIAIS = [
  {
    id: "oficial-2",
    nome: "Copa do Mundo 2026 — Kit com 12 envelopes",
    imagem: "https://panini.com.br/media/catalog/product/1/2/12_evelopes.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 33.6,
    precoAntigo: 84,
    etiqueta: "Oferta",
    categorias: ["figurinhas", "ofertas"],
    linkOficial: "https://panini.com.br/copa-do-mundo-2026-kit-com-12-envelopes-fifa-world-cup-2026tm",
  },
  {
    id: "oficial-5",
    nome: "FIFA WORLD CUP 2026™ ADRENALYN XL™ — Starter Pack",
    imagem: "https://panini.com.br/media/catalog/product/1/_/1_binder.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 59.96,
    precoAntigo: 149.9,
    etiqueta: "Oferta",
    categorias: ["figurinhas", "colecionaveis", "ofertas"],
    linkOficial: "https://panini.com.br/fifa-world-cup-2026tm-adrenalyn-xltm-starter-pack",
  },
  {
    id: "oficial-10",
    nome: "Os Fabulosos X-Men (2025) 19",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_0euvlva6bt0kj059qfia9g2h34/-S170-FWEBP",
    preco: 21.9,
    etiqueta: "Marvel",
    categorias: ["marvel", "revistas"],
    linkOficial: "https://panini.com.br/os-fabulosos-x-men-2025-19",
  },
  {
    id: "oficial-14",
    nome: "O Espetacular Homem-Aranha (2025) 17",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_h3k1cglgn97spfh1ku0natm754/-S170-FWEBP",
    preco: 21.9,
    etiqueta: "Marvel",
    categorias: ["marvel", "revistas"],
    linkOficial: "https://panini.com.br/o-espetacular-homem-aranha-2025-17",
  },
  {
    id: "oficial-24",
    nome: "Vingadores Vs X-Men",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_1j5sggud4967t3t0v7sgvohd02/-S170-FWEBP",
    preco: 194.9,
    etiqueta: "Marvel",
    categorias: ["marvel", "livros"],
    linkOficial: "https://panini.com.br/vingadores-vs-x-men-avvsx001",
  },
  {
    id: "oficial-30",
    nome: "Absolute Batman 09 — Capa Variante",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_m8ii8na4g91nl1ufdqp7v98932/-S170-FWEBP",
    preco: 24.9,
    etiqueta: "DC",
    categorias: ["dc", "revistas", "pre-venda"],
    linkOficial: "https://panini.com.br/absolute-batman-09-capa-variante",
  },
  {
    id: "oficial-34",
    nome: "Absolute Batman 09",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_7vefeg283p2pt5vpb6h2aq7s5k/-S170-FWEBP",
    preco: 24.9,
    etiqueta: "DC",
    categorias: ["dc", "revistas"],
    linkOficial: "https://panini.com.br/absolute-batman-09",
  },
  {
    id: "oficial-36",
    nome: "Superman (2025) 17",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_28dirrk1m95jv3oavfsgfj1g1l/-S170-FWEBP",
    preco: 21.9,
    etiqueta: "DC",
    categorias: ["dc", "revistas"],
    linkOficial: "https://panini.com.br/superman-2025-17",
  },
  {
    id: "oficial-40",
    nome: "Chico Bento — 19",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_98cteql26t1uh254p6f0423t7i/-S170-FWEBP",
    preco: 9.9,
    etiqueta: "Revista",
    categorias: ["revistas"],
    linkOficial: "https://panini.com.br/chico-bento-19-achci019",
  },
  {
    id: "oficial-50",
    nome: "Jujutsu Kaisen: Batalha de Feiticeiros Vol. 6",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_a6c5ffd2n95q78oobleq41vj2v/-S170-FWEBP",
    preco: 47.5,
    etiqueta: "Mangá",
    categorias: ["mangas", "livros"],
    linkOficial: "https://panini.com.br/jujutsu-kaisen-batalha-de-feiticeiros-vol-6-amjuk006r6",
  },
  {
    id: "oficial-55",
    nome: "Solo Leveling 09",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_to6nanpu2t19ldhdcnmtjule04/-S170-FWEBP",
    preco: 78.9,
    etiqueta: "Mangá",
    categorias: ["mangas", "livros"],
    linkOficial: "https://panini.com.br/solo-leveling-09-asolo009r",
  },
  {
    id: "oficial-57",
    nome: "One Piece 3 em 1 Vol. 37",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_q1mg8mvpot1695o4t123nfrb6j/-S170-FWEBP",
    preco: 99.9,
    etiqueta: "Mangá",
    categorias: ["mangas", "livros"],
    linkOficial: "https://panini.com.br/one-piece-3-em-1-vol-37-aoptr037r",
  },
  {
    id: "oficial-59",
    nome: "Adeus, Eri",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_a1766o20q51p7cfkm59j6it60i/-S170-FWEBP",
    preco: 43.9,
    etiqueta: "Mangá",
    categorias: ["mangas", "livros"],
    linkOficial: "https://panini.com.br/adeus-eri-asayo001r2",
  },
  {
    id: "oficial-63",
    nome: "Mickey Apresenta: A Estrada da Vida",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_5btdh09tbh4ul6q1g63bvjes09/-S170-FWEBP",
    preco: 89.9,
    etiqueta: "Livro",
    categorias: ["livros", "colecionaveis"],
    linkOficial: "https://panini.com.br/mickey-apresenta-a-estrada-da-vida-graphic-disney",
  },
  {
    id: "oficial-68",
    nome: "Tio Patinhas: Na Rota dos Estranhos Náufragos",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_orglgni5cl15t2sp8qigjkvd0p/-S170-FWEBP",
    preco: 129.9,
    etiqueta: "Livro",
    categorias: ["livros", "colecionaveis"],
    linkOficial: "https://panini.com.br/tio-patinhas-na-rota-dos-estranhos-naufragos-colecao-carl-barks",
  },
  {
    id: "oficial-72",
    nome: "Stranger Things e Dungeons & Dragons",
    imagem: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_2s7kvkdpid09l0mttsr6au9a09/-S170-FWEBP",
    preco: 32.94,
    precoAntigo: 54.9,
    etiqueta: "Oferta",
    categorias: ["livros", "ofertas"],
    linkOficial: "https://panini.com.br/stranger-things-e-dungeons-dragons",
  },
  {
    id: "oficial-73",
    nome: "O Reinado do Destino",
    imagem: "https://panini.com.br/media/catalog/product/5/_/5._vitrine_-_reinado_de_destino.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 54.94,
    precoAntigo: 99.5,
    etiqueta: "Oferta",
    categorias: ["livros", "ofertas"],
    linkOficial: "https://panini.com.br/o-reinado-do-destino",
  },
  {
    id: "oficial-80",
    nome: "Snoopy — Álbum capa dura + 36 envelopes",
    imagem: "https://panini.com.br/media/catalog/product/p/e/peanuts_mockup_capa_brochura_envelopes_36_dura.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 199.92,
    precoAntigo: 249.9,
    etiqueta: "Figurinhas",
    categorias: ["figurinhas", "colecionaveis", "ofertas"],
    linkOficial: "https://panini.com.br/snoopy-um-ano-para-recordar-album-capa-dura-36-envelopes",
  },
  {
    id: "oficial-88",
    nome: "CONMEBOL Libertadores 2026 — Álbum + 36 envelopes",
    imagem: "https://panini.com.br/media/catalog/product/c/a/capa_brochura_6envelopes_libertadores_2026_copy_36_dura.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 204.9,
    precoAntigo: 249.9,
    etiqueta: "Figurinhas",
    categorias: ["figurinhas", "colecionaveis", "ofertas"],
    linkOficial: "https://panini.com.br/conmebol-libertadores-2026-album-capa-dura-36-envelopes",
  },
  {
    id: "oficial-115",
    nome: "LALIGA Stars 2026/27 — Coleção completa",
    imagem: "https://panini.com.br/media/catalog/product/m/o/mockup_capa_brochura__laliga_2026_27.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 249.9,
    etiqueta: "Coleção",
    categorias: ["figurinhas", "colecionaveis"],
    linkOficial: "https://panini.com.br/laliga-stars-2026-27-panini-colecao-completa",
  },
  {
    id: "oficial-121",
    nome: "Todas as Copas — Fascículo 17: Rússia 2018",
    imagem: "https://panini.com.br/media/catalog/product/c/a/capa_dura_tripla_1__1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    preco: 69.9,
    etiqueta: "Revista",
    categorias: ["revistas", "livros"],
    linkOficial: "https://panini.com.br/todas-as-copas-fasciculo-17-russia-2018",
  },
];

/* Junta todos os produtos numa lista só (não precisa mexer) */
var TODOS_PRODUTOS = PRODUTOS_GOGOS.concat(PRODUTOS_OFICIAIS);
