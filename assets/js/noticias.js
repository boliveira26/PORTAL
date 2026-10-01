// ==========================================================================
// assets/js/noticias.js - CARREGAMENTO DINÂMICO COM ACERVO E "CARREGAR MAIS"
// ==========================================================================

let todasNoticiasAcervo = [];
let quantidadeExibida = 8; // Exibe as 8 primeiras por padrão

document.addEventListener('DOMContentLoaded', () => {
    carregarNoticiasPortal();
});

function carregarNoticiasPortal() {
    fetch('assets/data/noticias.json?v=' + Date.now())
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo noticias.json');
            }
            return response.json();
        })
        .then(data => {
            renderizarTickerTopo(data.ticker_topo);
            renderizarHeroPrincipal(data.manchete_hero);
            renderizarHeroSecundarios(data.destaques_secundarios);

            if (data.ultimas_noticias && Array.isArray(data.ultimas_noticias)) {
                todasNoticiasAcervo = data.ultimas_noticias;
                renderizarGradeNoticiasPaginada();
            }
        })
        .catch(error => {
            console.warn('Aviso ao carregar notícias dinâmicas:', error);
        });
}

// 1. Ticker Topo
function renderizarTickerTopo(ticker) {
    if (!ticker) return;
    const tagEl = document.getElementById('ticker-top-tag');
    const textoEl = document.getElementById('ticker-top-texto');
    if (tagEl) tagEl.textContent = ticker.tag || 'NOTÍCIA DESTACADA';
    if (textoEl) textoEl.textContent = ticker.texto || '';
}

// 2. Hero Principal (Link para matéria completa ou tabela)
function renderizarHeroPrincipal(hero) {
    if (!hero) return;
    const container = document.getElementById('hero-destaque-principal');
    if (!container) return;

    const tagClasse = hero.tipo_tag ? hero.tipo_tag : 'ouro';
    const linkMateria = hero.id ? `noticia.html?id=${hero.id}` : hero.botao_primario_link;

    container.innerHTML = `
        <div class="imagem-hero-bg" style="background-image: linear-gradient(to top, rgba(5,7,10,0.95) 15%, rgba(5,7,10,0.3) 70%), url('${hero.imagem}'); cursor:pointer;" onclick="location.href='${linkMateria}'">
            <div class="conteudo-hero">
                <span class="badge-categoria-hero ${tagClasse}">${hero.categoria}</span>
                <h2>${hero.titulo}</h2>
                <p>${hero.resumo}</p>
                <div class="botoes-hero-links">
                    <a href="${hero.botao_primario_link}" class="btn-hero primario" onclick="event.stopPropagation();">${hero.botao_primario_texto}</a>
                </div>
            </div>
        </div>
    `;
}

// 3. Hero Secundários (Clicáveis para notícia completa)
function renderizarHeroSecundarios(cards) {
    if (!cards || !cards.length) return;
    const container = document.getElementById('hero-destaques-secundarios');
    if (!container) return;

    container.innerHTML = cards.map(item => {
        const temImagem = item.imagem ? true : false;
        const estiloBg = temImagem 
            ? `style="background-image: linear-gradient(to top, rgba(5,7,10,0.95) 30%, rgba(5,7,10,0.45) 100%), url('${item.imagem}'); cursor:pointer;"` 
            : 'style="cursor:pointer;"';
        const classeExtra = temImagem ? 'com-imagem' : '';
        const link = item.id ? `noticia.html?id=${item.id}` : '#';

        return `
            <article class="card-hero-menor ${classeExtra}" ${estiloBg} onclick="location.href='${link}'">
                <div class="conteudo-card-menor">
                    <span class="badge-categoria-hero ${item.tipo_tag || 'neutro'}">${item.categoria}</span>
                    <h3>${item.titulo}</h3>
                    <p>${item.resumo}</p>
                </div>
            </article>
        `;
    }).join('');
}

// 4. Grid de Últimas Notícias com Paginação / Acervo
function renderizarGradeNoticiasPaginada() {
    const container = document.getElementById('grid-ultimas-noticias');
    const areaBotao = document.getElementById('area-carregar-mais');
    if (!container) return;

    // Pega apenas as notícias até o limite atual (ex: 8)
    const noticiasParaExibir = todasNoticiasAcervo.slice(0, quantidadeExibida);

    container.innerHTML = noticiasParaExibir.map(item => `
        <article class="card-noticia-conmebol" style="cursor:pointer;" onclick="location.href='noticia.html?id=${item.id}'">
            <div class="thumb-noticia" style="background-image: url('${item.imagem}');"></div>
            <div class="corpo-noticia-conmebol">
                <span class="tag-noticia ${item.tipo_tag || 'ouro'}">${item.categoria}</span>
                <h4>${item.titulo}</h4>
                <p>${item.resumo}</p>
            </div>
        </article>
    `).join('');

    // Controla o botão "Carregar Mais"
    if (areaBotao) {
        if (quantidadeExibida < todasNoticiasAcervo.length) {
            areaBotao.style.display = 'flex';
        } else {
            areaBotao.style.display = 'none';
        }
    }
}

// Função acionada ao clicar no botão "Carregar Mais"
window.carregarMaisNoticias = function() {
    quantidadeExibida += 4; // Adiciona mais 4 notícias à tela
    renderizarGradeNoticiasPaginada();
};