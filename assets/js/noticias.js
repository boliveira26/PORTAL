// ==========================================================================
// assets/js/noticias.js - MOTOR CRONOLÓGICO AUTOMÁTICO DO PORTAL
// ==========================================================================

let todasNoticiasCombinadas = [];
let quantidadeExibida = 8; // Começa exibindo 8 notícias na grade (duas fileiras de 4)

document.addEventListener('DOMContentLoaded', () => {
    carregarPortalNoticias();
});

async function carregarPortalNoticias() {
    try {
        const [resLiberta, resSula] = await Promise.all([
            fetch('assets/data/noticias.json?v=' + Date.now()).then(r => r.ok ? r.json() : null),
            fetch('assets/data/noticias-sulamericana.json?v=' + Date.now()).then(r => r.ok ? r.json() : null)
        ]);

        const dataLiberta = resLiberta || { ultimas_noticias: [] };
        const dataSula = resSula || { ultimas_noticias: [] };

        // 1. Ticker Institucional
        const tickerAtivo = dataSula.ticker_topo || dataLiberta.ticker_topo;
        if (tickerAtivo) {
            const tagEl = document.getElementById('ticker-top-tag');
            const txtEl = document.getElementById('ticker-top-texto');
            if (tagEl) tagEl.textContent = tickerAtivo.tag || 'OFICIAL';
            if (txtEl) txtEl.textContent = tickerAtivo.texto || '';
        }

        // 2. Agrupa TODAS as matérias existentes (incluindo heroes) em uma lista única
        const listaBruta = [];

        if (dataLiberta.manchete_hero) listaBruta.push(dataLiberta.manchete_hero);
        if (dataLiberta.ultimas_noticias) listaBruta.push(...dataLiberta.ultimas_noticias);
        if (dataSula.manchete_hero) listaBruta.push(dataSula.manchete_hero);
        if (dataSula.ultimas_noticias) listaBruta.push(...dataSula.ultimas_noticias);

        // Remove duplicidades de ID se houver
        const mapaUnico = new Map();
        listaBruta.forEach(item => {
            if (item && item.id && !mapaUnico.has(item.id)) {
                mapaUnico.set(item.id, item);
            }
        });

        todasNoticiasCombinadas = Array.from(mapaUnico.values());

        // 3. Ordenação rigorosa por data (mais recente para a mais antiga)
        todasNoticiasCombinadas.sort((a, b) => {
            return converterDataParaTimestamp(b.data_publicacao) - converterDataParaTimestamp(a.data_publicacao);
        });

        if (todasNoticiasCombinadas.length === 0) return;

        // 4. DISTRIBUIÇÃO DINÂMICA:
        // Top 1: Manchete Principal da Esquerda
        const top1 = todasNoticiasCombinadas[0];
        // Top 2 e Top 3: Cards Secundários da Direita
        const top2 = todasNoticiasCombinadas[1];
        const top3 = todasNoticiasCombinadas[2];

        // Restante (Top 4 em diante): Vai para a grade com paginação
        const noticiasGrade = todasNoticiasCombinadas.slice(3);

        renderizarHeroDestaques(top1, top2, top3);
        renderizarGridNoticias(noticiasGrade);

    } catch (erro) {
        console.error('Erro ao carregar e ordenar o portal de notícias:', erro);
    }
}

// --------------------------------------------------------------------------
// RENDERIZAÇÃO DA SEÇÃO HERO (Top 1, Top 2 e Top 3)
// --------------------------------------------------------------------------
function renderizarHeroDestaques(n1, n2, n3) {
    const elHero = document.getElementById('hero-destaque-principal');
    const elSecundarios = document.getElementById('hero-destaques-secundarios');

    // Manchete Principal (Top 1)
    if (elHero && n1) {
        elHero.style.cursor = 'pointer';
        elHero.onclick = () => irParaNoticia(n1.id);
        elHero.title = 'Clique para ler a matéria completa';

        elHero.innerHTML = `
            <div class="imagem-hero-bg" style="background-image: linear-gradient(to top, rgba(4,6,10,0.96) 20%, rgba(4,6,10,0.35) 75%), url('${n1.imagem}');">
                <div class="conteudo-hero">
                    <span class="badge-categoria-hero ${obterCorBadge(n1)}">${n1.categoria}</span>
                    <h2>${n1.titulo}</h2>
                    <p>${n1.resumo || ''}</p>
                    <div class="botoes-hero-links">
                        <span class="btn-hero primario">Ler Matéria Completa &rarr;</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Coluna Secundária (Top 2 e Top 3)
    if (elSecundarios && n2) {
        let htmlSecundarios = `
            <article class="card-hero-menor com-imagem" style="cursor: pointer; background-image: linear-gradient(to top, rgba(3,7,17,0.96) 30%, rgba(3,7,17,0.4) 100%), url('${n2.imagem}');" onclick="irParaNoticia('${n2.id}')" title="Clique para ler">
                <div class="conteudo-card-menor">
                    <span class="badge-categoria-hero ${obterCorBadge(n2)}">${n2.categoria}</span>
                    <h3>${n2.titulo}</h3>
                    <p>${n2.resumo || ''}</p>
                </div>
            </article>
        `;

        if (n3) {
            htmlSecundarios += `
                <article class="card-hero-menor com-imagem" style="cursor: pointer; background-image: linear-gradient(to top, rgba(4,6,10,0.96) 30%, rgba(4,6,10,0.4) 100%), url('${n3.imagem}');" onclick="irParaNoticia('${n3.id}')" title="Clique para ler">
                    <div class="conteudo-card-menor">
                        <span class="badge-categoria-hero ${obterCorBadge(n3)}">${n3.categoria}</span>
                        <h3>${n3.titulo}</h3>
                        <p>${n3.resumo || ''}</p>
                    </div>
                </article>
            `;
        }

        elSecundarios.innerHTML = htmlSecundarios;
    }
}

// --------------------------------------------------------------------------
// RENDERIZAÇÃO DA GRADE (Do Top 4 em diante)
// --------------------------------------------------------------------------
let poolNoticiasGrade = [];

function renderizarGridNoticias(noticias) {
    if (noticias) poolNoticiasGrade = noticias;

    const gridEl = document.getElementById('grid-ultimas-noticias');
    const areaCarregarMais = document.getElementById('area-carregar-mais');
    if (!gridEl) return;

    const listaAtual = poolNoticiasGrade.slice(0, quantidadeExibida);

    gridEl.innerHTML = listaAtual.map(item => `
        <article class="card-noticia-conmebol" onclick="irParaNoticia('${item.id}')" title="Clique para ler a matéria">
            <div class="thumb-noticia" style="background-image: url('${item.imagem}');"></div>
            <div class="corpo-noticia-conmebol">
                <div>
                    <span class="tag-noticia ${obterCorTag(item)}">${item.categoria}</span>
                    <h4>${item.titulo}</h4>
                </div>
                <p>${item.resumo || ''}</p>
            </div>
        </article>
    `).join('');

    if (areaCarregarMais) {
        if (quantidadeExibida < poolNoticiasGrade.length) {
            areaCarregarMais.style.display = 'flex';
        } else {
            areaCarregarMais.style.display = 'none';
        }
    }
}

function carregarMaisNoticias() {
    quantidadeExibida += 4;
    renderizarGridNoticias();
}

// --------------------------------------------------------------------------
// REDIRECIONAMENTO LIMPO E HELPERS
// --------------------------------------------------------------------------
function irParaNoticia(id) {
    if (id) {
        window.location.href = `noticia.html?id=${encodeURIComponent(id)}`;
    }
}

function obterCorBadge(noticia) {
    if (noticia.tipo_tag === 'azul') return 'azul';
    if (noticia.tipo_tag === 'neutro') return 'neutro';
    return 'ouro';
}

function obterCorTag(noticia) {
    if (noticia.tipo_tag === 'azul') return 'azul';
    if (noticia.tipo_tag === 'neutro') return 'cinza';
    return 'ouro';
}

function converterDataParaTimestamp(dataStr) {
    if (!dataStr) return 0;
    try {
        const partes = dataStr.trim().split(' ');
        const [dia, mes, ano] = partes[0].split('/').map(Number);
        let hora = 0, minuto = 0;
        if (partes[1]) {
            [hora, minuto] = partes[1].split(':').map(Number);
        }
        return new Date(ano, mes - 1, dia, hora || 0, minuto || 0).getTime();
    } catch {
        return 0;
    }
}