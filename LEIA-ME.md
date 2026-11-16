# Site Panini + Gogo's (versão editável)

## Como abrir
Dê **dois cliques no arquivo `index.html`**. Ele abre no navegador.
Não precisa instalar nada.

Depois de mudar qualquer arquivo, salve e aperte **F5** no navegador para ver a mudança.

## Que programa usar para editar
Recomendado: **VS Code** (grátis, https://code.visualstudio.com).
Abra a pasta `panini-editavel` inteira nele: menu Arquivo → Abrir Pasta.
O Bloco de Notas também funciona.

## Onde fica cada coisa

| Quero mudar...                                  | Arquivo                |
|-------------------------------------------------|------------------------|
| Preço, nome, foto ou etiqueta de um produto      | `js/dados.js`          |
| Adicionar ou remover produtos                    | `js/dados.js`          |
| Categorias do menu amarelo                       | `js/dados.js`          |
| Cores do site (vermelho, amarelo, fundo...)      | `css/tema.css`         |
| Textos das páginas (títulos, frases, botões)     | `js/paginas.js`        |
| Cabeçalho (topo) e rodapé                        | `js/componentes.js`    |
| Fotos e logo                                     | pasta `imagens/`       |

**Não precisa mexer em:** `css/tailwind.css` e `js/app.js`.

## Exemplos rápidos

**Mudar o preço da caixa Gogo's.** Em `js/dados.js`, procure `gogos-caixa-6` e troque:

    preco: 649.9,

por

    preco: 599.9,

**Trocar o banner.** Coloque a sua imagem na pasta `imagens/` com o nome
`banner-gogos.jpg`, substituindo a antiga. O tamanho ideal é 1920×600.

**Mudar o vermelho do site.** Em `css/tema.css`, troque `#e3121e` pelo código da cor
que você quiser, nas linhas `--primary`, `--brand-red` e `--price`.

**Adicionar um produto.** Em `js/dados.js`, copie um bloco inteiro, do `{` até o `},`,
cole logo abaixo e mude os valores. O `id` precisa ser diferente de todos os outros.

## Páginas do site
- `index.html#/` → página inicial
- `index.html#/gogos` → área Gogo's
- `index.html#/categoria/mangas` → categorias
- `index.html#/produto/gogos-caixa-6` → página de um kit
- `index.html#/carrinho`, `#/favoritos`, `#/qrcode`, `#/busca?q=batman`

## Observações
- As fontes e as fotos dos "Produtos reais da Panini" vêm da internet. Sem internet,
  essas fotos não aparecem e as letras mudam de estilo.
- O carrinho e os favoritos ficam salvos no próprio navegador.
- As classes como `text-primary` e `rounded-md` são do Tailwind CSS. O arquivo
  `tailwind.css` só traz as classes que o site já usa. Se você escrever uma classe
  nova e ela não fizer efeito, é por isso: use uma classe que já aparece no código
  ou escreva o estilo no `css/tema.css`.
