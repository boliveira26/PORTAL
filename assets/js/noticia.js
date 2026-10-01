// ==========================================================================
// assets/js/noticia.js - MOTOR DINÂMICO DE LEITURA DE MATÉRIAS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    carregarMateriaCompleta();
});

function carregarMateriaCompleta() {
    // 1. Pega o ID da notícia na URL (ex: noticia.html?id=river-humilhado-crb)
    const urlParams = new URLSearchParams(window.location.search);
    const idNoticia = urlParams.get('id');

    fetch('assets/data/noticias.json?v=' + Date.now())
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível carregar noticias.json');
            return response.json();
        })
        .then(data => {
            let noticiaSelecionada = null;

            // Procura a notícia correspondente na lista
            if (idNoticia && data.ultimas_noticias) {
                noticiaSelecionada = data.ultimas_noticias.find(n => n.id === idNoticia);
            }

            // Fallback: se não achar pelo ID ou não tiver ID na URL, pega a manchete principal ou a primeira
            if (!noticiaSelecionada) {
                if (idNoticia === 'manchete-principal' && data.manchete_hero) {
                    noticiaSelecionada = data.manchete_hero;
                } else if (data.ultimas_noticias && data.ultimas_noticias.length > 0) {
                    noticiaSelecionada = data.ultimas_noticias[0];
                }
            }

            if (noticiaSelecionada) {
                renderizarArtigo(noticiaSelecionada);
                renderizarSidebarRelacionadas(data.ultimas_noticias, noticiaSelecionada.id);
            }
        })
        .catch(error => {
            console.error('Erro ao renderizar matéria:', error);
            const tituloEl = document.getElementById('artigo-titulo');
            if (tituloEl) tituloEl.textContent = 'Matéria não encontrada.';
        });
}

function renderizarArtigo(noticia) {
    // 1. Título da Aba
    document.title = `${noticia.titulo} | CONMEBOL PES`;
    
    // 2. Elementos da Matéria
    const tagEl = document.getElementById('artigo-tag');
    const tituloEl = document.getElementById('artigo-titulo');
    const subtituloEl = document.getElementById('artigo-subtitulo');
    const autorEl = document.getElementById('artigo-autor');
    const dataEl = document.getElementById('artigo-data-publicacao');
    const imagemEl = document.getElementById('artigo-imagem-capa');
    const legendaEl = document.getElementById('artigo-legenda-foto');
    const corpoEl = document.getElementById('artigo-corpo-texto');

    if (tagEl) {
        tagEl.textContent = noticia.categoria || 'CONMEBOL LIBERTADORES';
        tagEl.className = `tag-categoria-badge ${noticia.tipo_tag || 'ouro'}`;
    }

    if (tituloEl) tituloEl.textContent = noticia.titulo;
    if (subtituloEl) subtituloEl.textContent = noticia.resumo || '';
    if (autorEl) autorEl.textContent = noticia.autor || 'Por Redação PES Media Hub';
    if (dataEl) dataEl.textContent = noticia.data_publicacao || '30/09/2026';

    if (imagemEl) {
        imagemEl.src = noticia.imagem;
        imagemEl.alt = noticia.titulo;
    }

    if (legendaEl && noticia.legenda_foto) {
        legendaEl.textContent = noticia.legenda_foto;
    }

    // 3. Parágrafos do Texto Desenvolvido
    if (corpoEl) {
        if (noticia.corpo_materia && Array.isArray(noticia.corpo_materia)) {
            corpoEl.innerHTML = noticia.corpo_materia.map(p => {
                if (p.startsWith('>')) {
                    // Renderiza como citação (Quote)
                    return `<blockquote>${p.replace('>', '').trim()}</blockquote>`;
                }
                return `<p>${p}</p>`;
            }).join('');
        } else {
            // Se não houver parágrafos cadastrados ainda, usa o resumo como primeiro parágrafo
            corpoEl.innerHTML = `
                <p>${noticia.resumo}</p>
                <p>A partida movimentou a rodada continental do eFootball PES, trazendo grandes jogadas, tensão tática e mudanças decisivas na tabela de classificação geral da competição.</p>
                <blockquote>"Foi uma partida decidida nos detalhes. A equipe manteve o foco tático e garantiu o resultado fundamental nesta etapa decisiva da Copa."</blockquote>
                <p>Com esse resultado, os clubes agora voltam suas atenções para os próximos desafios na corrida pela Glória Eterna e pela Grande Conquista.</p>
            `;
        }
    }

    // 4. Ficha Técnica (Opcional)
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

// Renderiza a barra lateral com outras notícias
function renderizarSidebarRelacionadas(todasNoticias, idAtual) {
    const container = document.getElementById('lista-noticias-relacionadas');
    if (!container || !todasNoticias) return;

    // Filtra para não repetir a notícia que já está sendo lida
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