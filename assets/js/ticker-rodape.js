// ==========================================================================
// assets/js/ticker-rodape.js - TICKER OFICIAL DA LIBERTADORES (MATA-MATA)
// ==========================================================================

const ESCUDOS_LIBERTA_MAPA = {
    "Flamengo": "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
    "Estudiantes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Escudo_del_Club_Estudiantes_de_La_Plata.svg/1280px-Escudo_del_Club_Estudiantes_de_La_Plata.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Atlético Nacional": "https://logodetimes.com/times/atletico-nacional/logo-atletico-nacional-256.png",
    "Junior Barranquilla": "https://logodetimes.com/times/junior-barranquilla/logo-junior-barranquilla-256.png",
    "Racing Club": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Escudo_de_Racing_Club_%282014%29.svg/1920px-Escudo_de_Racing_Club_%282014%29.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Atlético Mineiro": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
    "Atlético-MG": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
    "Fluminense": "https://logodetimes.com/times/fluminense/logo-fluminense-256.png",
    "Universitario": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Escudo_del_Club_Universitario_de_Deportes.svg/3840px-Escudo_del_Club_Universitario_de_Deportes.svg.png",
    "CRB": "https://logodetimes.com/times/crb/logo-crb-256.png",
    "Colo-Colo": "https://upload.wikimedia.org/wikipedia/pt/e/e8/Colo-Colo_Futbol_Club.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Red Bull Bragantino": "https://logodetimes.com/times/red-bull-bragantino/logo-red-bull-bragantino-256.png",
    "Bahia": "https://logodetimes.com/times/bahia/logo-bahia-256.png",
    "Corinthians": "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
    "Barcelona SC": "https://logodetimes.com/times/barcelona-de-guayaquil/logo-barcelona-de-guayaquil-256.png",
    "Olimpia": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_de_Olimpia_2022_PNG_HD.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "LDU Quito": "https://upload.wikimedia.org/wikipedia/commons/7/72/LDU_Escudo_Actualizado_2023.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original"
};

function obterEscudoLiberta(nome) {
    return ESCUDOS_LIBERTA_MAPA[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
}

async function carregarTickerLibertadoresMataMata() {
    const container = document.getElementById('trilha-ticker-topo');
    if (!container) return;

    try {
        const resp = await fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now());
        if (!resp.ok) return;
        const dados = await resp.json();

        const jogos = dados.partidasMataMata || [];
        if (jogos.length === 0) return;

        container.innerHTML = '';
        const loopDuplicado = [...jogos, ...jogos];

        loopDuplicado.forEach(jogo => {
            const card = document.createElement('div');
            card.className = 'item-jogo-rodape';

            const temPlacar = (jogo.gm !== null && jogo.gm !== undefined && jogo.gv !== null && jogo.gv !== undefined);
            const gmTxt = temPlacar ? jogo.gm : '-';
            const gvTxt = temPlacar ? jogo.gv : '-';
            const statusTxt = temPlacar ? 'ENCERRADO' : 'A JOGAR';
            const statusClass = temPlacar ? 'encerrado' : 'a-jogar';

            const info = formatarDataHoraEstadioLiberta(jogo.data);

            card.innerHTML = `
                <div class="info-meta-rodape" style="color: var(--gold-main);">
                    <span>CHAVE ${jogo.chave}</span>
                    <span style="font-size:0.55rem; color:#fff;">${info.dataHora}</span>
                </div>

                <div class="bloco-confronto-rodape">
                    <div class="linha-time-rodape">
                        <img src="${obterEscudoLiberta(jogo.m)}" class="escudo-min" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                        <span class="nome-min">${jogo.m}</span>
                        <span class="gols-min">${gmTxt}</span>
                    </div>
                    <div class="linha-time-rodape">
                        <img src="${obterEscudoLiberta(jogo.v)}" class="escudo-min" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
                        <span class="nome-min">${jogo.v}</span>
                        <span class="gols-min">${gvTxt}</span>
                    </div>
                </div>

                <div class="status-meta-rodape">
                    <span class="estadio-min" title="${info.estadio}">${info.estadio}</span>
                    <span class="tag-status-rodape ${statusClass}">${statusTxt}</span>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (e) {
        console.warn('Erro ao carregar ticker do mata-mata da Libertadores:', e);
    }
}

function formatarDataHoraEstadioLiberta(texto) {
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
    document.addEventListener('DOMContentLoaded', carregarTickerLibertadoresMataMata);
} else {
    carregarTickerLibertadoresMataMata();
}