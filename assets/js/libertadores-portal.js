// ==========================================================================
// assets/js/libertadores-portal.js - MOTOR DINÂMICO DO HUB DA LIBERTADORES
// ==========================================================================

const ESCUDOS_OFICIAIS = {
    "Atlético Mineiro": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
    "Flamengo": "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
    "Bolívar": "https://logodetimes.com/times/bolivar/logo-bolivar-256.png",
    "Sporting Cristal": "https://logodetimes.com/times/sporting-cristal/logo-sporting-cristal-256.png",
    "Universitario": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Escudo_del_Club_Universitario_de_Deportes.svg/3840px-Escudo_del_Club_Universitario_de_Deportes.svg.png",
    "CRB": "https://logodetimes.com/times/crb/logo-crb-256.png",
    "River Plate": "https://upload.wikimedia.org/wikipedia/commons/f/f1/River_Plate.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Libertad": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Club_Libertad.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Junior Barranquilla": "https://logodetimes.com/times/junior-barranquilla/logo-junior-barranquilla-256.png",
    "Olimpia": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_de_Olimpia_2022_PNG_HD.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Jorge Wilstermann": "https://logodetimes.com/times/jorge-wilstermann/logo-jorge-wilstermann-256.png",
    "Palmeiras": "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
    "Barcelona SC": "https://logodetimes.com/times/barcelona-de-guayaquil/logo-barcelona-de-guayaquil-256.png",
    "Boca Juniors": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Boca_Juniors_-_Novo_Escudo.svg/1920px-Boca_Juniors_-_Novo_Escudo.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Corinthians": "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
    "Universidad Católica": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg/1280px-Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Bahia": "https://logodetimes.com/times/bahia/logo-bahia-256.png",
    "Atlético Nacional": "https://logodetimes.com/times/atletico-nacional/logo-atletico-nacional-256.png",
    "Independiente del Valle": "https://logodetimes.com/times/independiente-del-valle/logo-independiente-del-valle-256.png",
    "Nacional": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Club_Nacional_de_Football%27s_logo.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Estudiantes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Escudo_del_Club_Estudiantes_de_La_Plata.svg/1280px-Escudo_del_Club_Estudiantes_de_La_Plata.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Red Bull Bragantino": "https://logodetimes.com/times/red-bull-bragantino/logo-red-bull-bragantino-256.png",
    "Peñarol": "https://logodetimes.com/times/penarol/logo-penarol-256.png",
    "Cerro Porteño": "https://logodetimes.com/times/cerro-porteno/logo-cerro-porteno-256.png",
    "Colo-Colo": "https://upload.wikimedia.org/wikipedia/pt/e/e8/Colo-Colo_Futbol_Club.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Racing Club": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Escudo_de_Racing_Club_%282014%29.svg/1920px-Escudo_de_Racing_Club_%282014%29.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Mirassol": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mirassol_FC_logo.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Deportivo Táchira": "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4818.png",
    "LDU Quito": "https://upload.wikimedia.org/wikipedia/commons/7/72/LDU_Escudo_Actualizado_2023.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Caracas": "https://upload.wikimedia.org/wikipedia/pt/f/f4/Caracas_FC.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Fluminense": "https://logodetimes.com/times/fluminense/logo-fluminense-256.png",
    "The Strongest": "https://assets.footylogos.com/logos/the-strongest/the-strongest-logo-footylogos.png"
};

function obterEscudoClube(nome) {
    return ESCUDOS_OFICIAIS[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
}

document.addEventListener('DOMContentLoaded', () => {
    carregarNoticiasLibertadores();
    carregarGruposDinamicos();
});

// 1. CARREGAMENTO DINÂMICO DE NOTÍCIAS (DO NOTICIAS.JSON)
async function carregarNoticiasLibertadores() {
    try {
        const resp = await fetch('assets/data/noticias.json?v=' + Date.now());
        if (!resp.ok) return;
        const data = await resp.json();

        // Hero Principal da Esquerda
        const heroContainer = document.getElementById('hero-libertadores-destaque');
        if (heroContainer && data.manchete_hero) {
            const h = data.manchete_hero;
            heroContainer.onclick = () => location.href = `noticia.html?id=${h.id || 'manchete-principal'}`;
            heroContainer.innerHTML = `
                <div class="imagem-hero-bg" style="background-image: url('${h.imagem}');">
                    <div class="mascara-protecao-conmebol"></div>
                    <div class="painel-conteudo-hero">
                        <span class="tag-secao-ouro">${h.categoria || 'CONMEBOL LIBERTADORES'}</span>
                        <h2>${h.titulo}</h2>
                        <p class="resumo-hero-txt">${h.resumo}</p>
                    </div>
                </div>
            `;
        }

        // 4 Notícias Laterais
        const lateralContainer = document.getElementById('grid-noticias-libertadores');
        if (lateralContainer && data.ultimas_noticias) {
            const noticias4 = data.ultimas_noticias.slice(0, 4);
            lateralContainer.innerHTML = noticias4.map(n => `
                <article class="card-noticia-item" onclick="location.href='noticia.html?id=${n.id}'" title="Clique para ler">
                    <div class="thumb-quadrada" style="background-image: url('${n.imagem}');"></div>
                    <div class="info-noticia-conteudo">
                        <span class="categoria-amarela">${n.categoria}</span>
                        <h4>${n.titulo}</h4>
                        <span class="data-noticia-txt">${n.data_publicacao || 'Hoje'}</span>
                    </div>
                </article>
            `).join('');
        }
    } catch (e) {
        console.warn('Erro ao carregar notícias no hub da Libertadores:', e);
    }
}

// 2. CARREGAMENTO DINÂMICO DOS 8 GRUPOS (DO DADOS-FASE-DE-GRUPOS.JSON)
async function carregarGruposDinamicos() {
    const container = document.getElementById('trilha-grupos-dinamica');
    if (!container) return;

    try {
        const resp = await fetch('assets/data/dados-fase-de-grupos.json?v=' + Date.now());
        if (!resp.ok) return;
        const dados = await resp.json();

        container.innerHTML = '';
        const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        letras.forEach(letra => {
            const grupo = dados[letra];
            if (!grupo) return;

            const tabelaCalculada = calcularClassificacaoGrupo(grupo);
            const statusTxt = grupo.rodadaExibida === 6 ? 'ENCERRADO' : `RODADA ${grupo.rodadaExibida || 6}`;

            let linhasHtml = '';
            tabelaCalculada.forEach((t, i) => {
                const pos = i + 1;
                const classeZona = pos <= 2 ? 'qualificado' : 'sula';
                const formas = t.forma || ['v', 'e', 'd'];

                linhasHtml += `
                    <div class="linha-tabela-mini ${classeZona}">
                        <span class="pos-mini">${pos}</span>
                        <img src="${obterEscudoClube(t.nome)}" class="escudo-tabela" alt="${t.nome}" onerror="this.style.opacity='0.2'">
                        <span class="nome-clube-mini">${t.nome}</span>
                        <div class="forma-jogos">
                            ${formas.map(f => `<span class="forma-badge ${f}">${f.toUpperCase()}</span>`).join('')}
                        </div>
                        <span class="pts-mini">${t.pts}</span>
                    </div>
                `;
            });

            const cardGrupo = document.createElement('div');
            cardGrupo.className = 'card-mini-grupo';
            cardGrupo.innerHTML = `
                <div class="topo-mini-grupo">
                    <span>GRUPO ${letra}</span>
                    <span class="status-grupo-txt">${statusTxt}</span>
                </div>
                ${linhasHtml}
            `;

            container.appendChild(cardGrupo);
        });
    } catch (e) {
        console.warn('Erro ao carregar dados dinâmicos dos grupos:', e);
    }
}

function calcularClassificacaoGrupo(grupo) {
    const stats = {};
    (grupo.times || []).forEach(t => {
        stats[t] = { nome: t, pts: 0, gp: 0, gs: 0, sg: 0, forma: [] };
    });

    if (grupo.rodadas) {
        Object.keys(grupo.rodadas).forEach(r => {
            const partidas = grupo.rodadas[r] || [];
            partidas.forEach(j => {
                if (j.gm !== null && j.gm !== undefined && j.gv !== null && j.gv !== undefined) {
                    const tm = stats[j.m];
                    const tv = stats[j.v];
                    if (tm && tv) {
                        tm.gp += j.gm; tm.gs += j.gv;
                        tv.gp += j.gv; tv.gs += j.gm;

                        if (j.gm > j.gv) {
                            tm.pts += 3;
                            tm.forma.push('v');
                            tv.forma.push('d');
                        } else if (j.gm < j.gv) {
                            tv.pts += 3;
                            tv.forma.push('v');
                            tm.forma.push('d');
                        } else {
                            tm.pts += 1; tv.pts += 1;
                            tm.forma.push('e'); tv.forma.push('e');
                        }
                    }
                }
            });
        });
    }

    const lista = Object.values(stats);
    lista.forEach(t => {
        t.sg = t.gp - t.gs;
        t.forma = t.forma.slice(-3);
        while (t.forma.length < 3) t.forma.unshift('e');
    });

    lista.sort((a, b) => b.pts - a.pts || b.sg - a.sg || b.gp - a.gp);
    return lista;
}

window.deslizarGrupos = function(direcao) {
    const trilha = document.getElementById('trilha-grupos-dinamica');
    if (!trilha) return;
    trilha.scrollBy({ left: direcao * 315, behavior: 'smooth' });
};