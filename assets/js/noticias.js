// ==========================================================================
// assets/js/noticias.js - CARREGAMENTO DE NOTÍCIAS DINÂMICAS DO PORTAL
// ==========================================================================

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
            renderizarUltimasNoticias(data.ultimas_noticias);
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

// 2. Hero Principal (Com 1 botão para Tabela de Grupos)
function renderizarHeroPrincipal(hero) {
    if (!hero) return;
    const container = document.getElementById('hero-destaque-principal');
    if (!container) return;

    const tagClasse = hero.tipo_tag ? hero.tipo_tag : 'ouro';

    container.innerHTML = `
        <div class="imagem-hero-bg" style="background-image: linear-gradient(to top, rgba(5,7,10,0.95) 15%, rgba(5,7,10,0.3) 70%), url('${hero.imagem}');">
            <div class="conteudo-hero">
                <span class="badge-categoria-hero ${tagClasse}">${hero.categoria}</span>
                <h2>${hero.titulo}</h2>
                <p>${hero.resumo}</p>
                <div class="botoes-hero-links">
                    <a href="${hero.botao_primario_link}" class="btn-hero primario">${hero.botao_primario_texto}</a>
                </div>
            </div>
        </div>
    `;
}

// 3. Hero Secundários (Suporte a imagem de fundo ou card sólido)
function renderizarHeroSecundarios(cards) {
    if (!cards || !cards.length) return;
    const container = document.getElementById('hero-destaques-secundarios');
    if (!container) return;

    container.innerHTML = cards.map(item => {
        const temImagem = item.imagem ? true : false;
        const estiloBg = temImagem 
            ? `style="background-image: linear-gradient(to top, rgba(5,7,10,0.95) 30%, rgba(5,7,10,0.45) 100%), url('${item.imagem}');"` 
            : '';
        const classeExtra = temImagem ? 'com-imagem' : '';

        return `
            <article class="card-hero-menor ${classeExtra}" ${estiloBg}>
                <div class="conteudo-card-menor">
                    <span class="badge-categoria-hero ${item.tipo_tag || 'neutro'}">${item.categoria}</span>
                    <h3>${item.titulo}</h3>
                    <p>${item.resumo}</p>
                </div>
            </article>
        `;
    }).join('');
}

// 4. Grid de Últimas Notícias (Renderiza todas as notícias do JSON dinamicamente)
function renderizarUltimasNoticias(noticias) {
    if (!noticias || !noticias.length) return;
    const container = document.getElementById('grid-ultimas-noticias');
    if (!container) return;

    container.innerHTML = noticias.map(item => `
        <article class="card-noticia-conmebol">
            <div class="thumb-noticia" style="background-image: url('${item.imagem}');"></div>
            <div class="corpo-noticia-conmebol">
                <span class="tag-noticia ${item.tipo_tag || 'ouro'}">${item.categoria}</span>
                <h4>${item.titulo}</h4>
                <p>${item.resumo}</p>
            </div>
        </article>
    `).join('');
}