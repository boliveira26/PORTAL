// ==========================================================================
// assets/js/noticia.js - MOTOR DINÂMICO DE LEITURA DE MATÉRIAS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    carregarMateriaCompleta();
});

function carregarMateriaCompleta() {
    const urlParams = new URLSearchParams(window.location.search);
    const idNoticia = urlParams.get('id');

    // Carrega ambos os arquivos JSON (Libertadores e Sul-Americana)
    Promise.all([
        fetch('assets/data/noticias.json?v=' + Date.now()).then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('assets/data/noticias-sulamericana.json?v=' + Date.now()).then(r => r.ok ? r.json() : null).catch(() => null)
    ])
    .then(([dataLiberta, dataSula]) => {
        let noticiaSelecionada = null;
        let listaRelacionadas = [];

        // 1. Procura primeiro no noticias-sulamericana.json
        if (dataSula) {
            if (dataSula.manchete_hero && (dataSula.manchete_hero.id === idNoticia || idNoticia === 'manchete-principal-sula')) {
                noticiaSelecionada = dataSula.manchete_hero;
            } else if (dataSula.ultimas_noticias) {
                noticiaSelecionada = dataSula.ultimas_noticias.find(n => n.id === idNoticia);
            }
            if (noticiaSelecionada) {
                listaRelacionadas = dataSula.ultimas_noticias || [];
            }
        }

        // 2. Se não achou na Sula, procura no noticias.json (Libertadores)
        if (!noticiaSelecionada && dataLiberta) {
            if (dataLiberta.manchete_hero && (dataLiberta.manchete_hero.id === idNoticia || idNoticia === 'manchete-principal')) {
                noticiaSelecionada = dataLiberta.manchete_hero;
            } else if (dataLiberta.ultimas_noticias) {
                noticiaSelecionada = dataLiberta.ultimas_noticias.find(n => n.id === idNoticia);
            }
            if (noticiaSelecionada) {
                listaRelacionadas = dataLiberta.ultimas_noticias || [];
            }
        }

        // 3. Fallback se não encontrar por ID
        if (!noticiaSelecionada) {
            if (dataSula && dataSula.manchete_hero) {
                noticiaSelecionada = dataSula.manchete_hero;
                listaRelacionadas = dataSula.ultimas_noticias || [];
            } else if (dataLiberta && dataLiberta.manchete_hero) {
                noticiaSelecionada = dataLiberta.manchete_hero;
                listaRelacionadas = dataLiberta.ultimas_noticias || [];
            }
        }

        if (noticiaSelecionada) {
            renderizarArtigo(noticiaSelecionada);
            renderizarSidebarRelacionadas(listaRelacionadas, noticiaSelecionada.id);
        }
    })
    .catch(error => {
        console.error('Erro ao renderizar matéria:', error);
        const tituloEl = document.getElementById('artigo-titulo');
        if (tituloEl) tituloEl.textContent = 'Matéria não encontrada.';
    });
}

function renderizarArtigo(noticia) {
    document.title = `${noticia.titulo} | CONMEBOL PES`;
    
    const tagEl = document.getElementById('artigo-tag');
    const tituloEl = document.getElementById('artigo-titulo');
    const subtituloEl = document.getElementById('artigo-subtitulo');
    const autorEl = document.getElementById('artigo-autor');
    const dataEl = document.getElementById('artigo-data-publicacao');
    const imagemEl = document.getElementById('artigo-imagem-capa');
    const legendaEl = document.getElementById('artigo-legenda-foto');
    const corpoEl = document.getElementById('artigo-corpo-texto');

    if (tagEl) {
        tagEl.textContent = noticia.categoria || 'CONMEBOL SUDAMERICANA';
        tagEl.className = `tag-categoria-badge ${noticia.tipo_tag || 'azul'}`;
    }

    if (tituloEl) tituloEl.textContent = noticia.titulo;
    if (subtituloEl) subtituloEl.textContent = noticia.resumo || '';
    if (autorEl) autorEl.textContent = noticia.autor || 'Por Redação PES Media Hub';
    if (dataEl) dataEl.textContent = noticia.data_publicacao || '09/10/2026';

    if (imagemEl) {
        imagemEl.src = noticia.imagem;
        imagemEl.alt = noticia.titulo;
    }

    if (legendaEl && noticia.legenda_foto) {
        legendaEl.textContent = noticia.legenda_foto;
    }

    if (corpoEl) {
        if (noticia.corpo_materia && Array.isArray(noticia.corpo_materia)) {
            corpoEl.innerHTML = noticia.corpo_materia.map(p => {
                if (p.startsWith('>')) {
                    return `<blockquote>${p.replace('>', '').trim()}</blockquote>`;
                }
                return `<p>${p}</p>`;
            }).join('');
        } else {
            corpoEl.innerHTML = `<p>${noticia.resumo}</p>`;
        }
    }

    const fichaBox = document.getElementById('artigo-ficha-tecnica');
    const fichaConteudo = document.getElementById('artigo-ficha-conteudo');
    if (fichaBox && fichaConteudo) {
        if (noticia.ficha_tecnica) {
            fichaBox.style.display = 'block';
            fichaConteudo.innerHTML = `
                <p><strong>Competição:</strong> ${noticia.categoria}</p>
                <p><strong>Estádio:</strong> ${noticia.ficha_tecnica.estadio || 'Estádio Oficial'}</p>
                <p><strong>Placar / Gols:</strong> ${noticia.ficha_tecnica.gols || 'Não informado'}</p>
            `;
        } else {
            fichaBox.style.display = 'none';
        }
    }
}

function renderizarSidebarRelacionadas(todasNoticias, idAtual) {
    const container = document.getElementById('lista-noticias-relacionadas');
    if (!container || !todasNoticias) return;

    const outras = todasNoticias.filter(n => n.id !== idAtual).slice(0, 5);

    container.innerHTML = outras.map(item => `
        <a href="noticia.html?id=${item.id}" class="card-relacionada-mini">
            <div class="thumb-relacionada" style="background-image: url('${item.imagem}');"></div>
            <div class="info-relacionada">
                <h4>${item.titulo}</h4>
                <span class="tag-relacionada">${item.categoria}</span>
            </div>
        </a>
    `).join('');
}