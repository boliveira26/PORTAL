// ==========================================================================
// assets/js/ticker-sula.js - TICKER OFICIAL DE JOGOS DA CONMEBOL SUDAMERICANA
// ==========================================================================

const ESCUDOS_SULA_MAPA = {
    "River Plate": "https://upload.wikimedia.org/wikipedia/commons/f/f1/River_Plate.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Nacional": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Club_Nacional_de_Football%27s_logo.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "The Strongest": "https://assets.footylogos.com/logos/the-strongest/the-strongest-logo-footylogos.png",
    "Peñarol": "https://logodetimes.com/times/penarol/logo-penarol-256.png",
    "Palmeiras": "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
    "Jorge Wilstermann": "https://logodetimes.com/times/jorge-wilstermann/logo-jorge-wilstermann-256.png",
    "Sporting Cristal": "https://logodetimes.com/times/sporting-cristal/logo-sporting-cristal-256.png",
    "Mirassol": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mirassol_FC_logo.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Independiente del Valle": "https://logodetimes.com/times/independiente-del-valle/logo-independiente-del-valle-256.png",
    "Caracas": "https://upload.wikimedia.org/wikipedia/pt/f/f4/Caracas_FC.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Universidad Católica": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg/1280px-Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Libertad": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Club_Libertad.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Cerro Porteño": "https://logodetimes.com/times/cerro-porteno/logo-cerro-porteno-256.png",
    "Bolívar": "https://logodetimes.com/times/bolivar/logo-bolivar-256.png",
    "Deportivo Táchira": "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4818.png",
    "Boca Juniors": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Boca_Juniors_-_Novo_Escudo.svg/1920px-Boca_Juniors_-_Novo_Escudo.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
};

function obterEscudoSula(nome) {
    return ESCUDOS_SULA_MAPA[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
}

async function carregarTickerSulamericana() {
    const container = document.getElementById('trilha-ticker-topo');
    if (!container) return;

    try {
        const resp = await fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now());
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

            const info = formatarDataHoraEstadioSula(jogo.data);

            card.innerHTML = `
                <div class="info-meta-rodape" style="color: var(--sula-solar);">
                    <span>CHAVE ${jogo.chave}</span>
                    <span style="font-size:0.55rem; color:#fff;">${info.dataHora}</span>
                </div>

                <div class="bloco-confronto-rodape">
                    <div class="linha-time-rodape">
                        <img src="${obterEscudoSula(jogo.m)}" class="escudo-min" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                        <span class="nome-min">${jogo.m}</span>
                        <span class="gols-min">${gmTxt}</span>
                    </div>
                    <div class="linha-time-rodape">
                        <img src="${obterEscudoSula(jogo.v)}" class="escudo-min" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
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
        console.warn('Erro ao carregar ticker da Sul-Americana:', e);
    }
}

function formatarDataHoraEstadioSula(texto) {
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
    document.addEventListener('DOMContentLoaded', carregarTickerSulamericana);
} else {
    carregarTickerSulamericana();
}