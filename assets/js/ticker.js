// ==========================================================================
// assets/js/ticker.js - MOTOR DE JOGOS DO DIA (FASE DE GRUPOS)
// ==========================================================================

const ESCUDOS_TICKER = {
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

function obterEscudoTicker(nome) {
    return ESCUDOS_TICKER[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
}

async function carregarTickerJogosFaseDeGrupos() {
    const container = document.getElementById('ticker-lista');
    if (!container) return;

    let dados = null;
    try {
        const resp = await fetch('assets/data/dados-fase-de-grupos.json?v=' + Date.now());
        if (resp.ok) dados = await resp.json();
    } catch (e) {}

    if (!dados) return;

    // Coleta todos os jogos da 6ª rodada (ou rodada ativa)
    const todosJogos = [];
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    letras.forEach(letra => {
        const grupo = dados[letra];
        if (grupo && grupo.rodadas) {
            const rodadaAtual = grupo.rodadaExibida || 6;
            const jogos = grupo.rodadas[rodadaAtual] || [];
            jogos.forEach(j => {
                todosJogos.push({
                    grupo: `GRUPO ${letra}`,
                    rodada: rodadaAtual,
                    data: j.data,
                    m: j.m,
                    v: j.v,
                    gm: j.gm,
                    gv: j.gv
                });
            });
        }
    });

    if (todosJogos.length === 0) return;

    container.innerHTML = '';
    const loopDuplicado = [...todosJogos, ...todosJogos];

    loopDuplicado.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card-jogo-ticker';

        const temPlacar = (jogo.gm !== null && jogo.gm !== undefined && jogo.gv !== null && jogo.gv !== undefined);
        const gmTxt = temPlacar ? jogo.gm : '-';
        const gvTxt = temPlacar ? jogo.gv : '-';
        const statusTxt = temPlacar ? 'ENCERRADO' : 'A JOGAR';
        const statusClasse = temPlacar ? 'encerrado' : 'proximo';

        let gmVencedor = '';
        let gvVencedor = '';
        if (temPlacar) {
            if (jogo.gm > jogo.gv) gmVencedor = 'vencedor';
            else if (jogo.gv > jogo.gm) gvVencedor = 'vencedor';
        }

        const info = formatarInfoJogo(jogo.data);

        card.innerHTML = `
            <div class="card-jogo-header">
                <span class="badge-copa-ticker">${jogo.grupo} • R${jogo.rodada}</span>
                <span style="font-size:0.6rem; color:#ffffff; font-weight:700;">${info.dataHora}</span>
            </div>

            <div class="card-jogo-corpo">
                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudoTicker(jogo.m)}" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.m}">${jogo.m}</span>
                    </div>
                    <span class="gols-time-ticker ${gmVencedor}">${gmTxt}</span>
                </div>

                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudoTicker(jogo.v)}" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.v}">${jogo.v}</span>
                    </div>
                    <span class="gols-time-ticker ${gvVencedor}">${gvTxt}</span>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px; padding-top:3px; border-top:1px solid rgba(255,255,255,0.04);">
                <span style="font-size:0.54rem; color:#8fa0b5; font-weight:700; max-width:125px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-transform:uppercase;">
                    ${info.estadio}
                </span>
                <span class="status-ticker ${statusClasse}">${statusTxt}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

function formatarInfoJogo(texto) {
    if (!texto) return { dataHora: '', estadio: 'ESTÁDIO OFICIAL' };
    const partes = texto.trim().split(/\s+/);
    if (partes.length < 3) return { dataHora: texto, estadio: 'ESTÁDIO OFICIAL' };

    const diaSemana = partes[0];
    const dataDia = partes[1].replace('/2026', '');
    const horario = partes[partes.length - 1];
    const estadio = partes.slice(2, partes.length - 1).join(' ');

    return {
        dataHora: `${diaSemana} ${dataDia} • ${horario}`,
        estadio: estadio || 'ESTÁDIO OFICIAL'
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTickerJogosFaseDeGrupos);
} else {
    carregarTickerJogosFaseDeGrupos();
}