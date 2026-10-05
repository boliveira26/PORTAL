// ==========================================================================
// assets/js/ticker-sula.js - TICKER DIÁRIO DA SUL-AMERICANA COM VIRADA 00:00
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
    "Ind. del Valle": "https://logodetimes.com/times/independiente-del-valle/logo-independiente-del-valle-256.png",
    "Caracas": "https://upload.wikimedia.org/wikipedia/pt/f/f4/Caracas_FC.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Universidad Católica": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg/1280px-Escudo_Club_Deportivo_Universidad_Cat%C3%B3lica.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
    "Libertad": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Club_Libertad.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
    "Cerro Porteño": "https://logodetimes.com/times/cerro-porteno/logo-cerro-porteno-256.png",
    "Bolívar": "https://logodetimes.com/times/bolivar/logo-bolivar-256.png",
    "Deportivo Táchira": "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/4818.png",
    "Boca Juniors": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Boca_Juniors_-_Novo_Escudo.svg/1920px-Boca_Juniors_-_Novo_Escudo.svg.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
};

let diaRegistradoSula = null;

function obterEscudoSula(nome) {
    return ESCUDOS_SULA_MAPA[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
}

function formatarDataHoje() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function extrairDataRaw(textoData) {
    if (!textoData) return '';
    const match = textoData.match(/(\d{2}\/\d{2}\/\d{4})/);
    return match ? match[1] : '';
}

function extrairHoraEEstadio(textoData) {
    if (!textoData) return { hora: '--:--', estadio: 'ESTÁDIO' };
    const partes = textoData.trim().split(/\s+/);
    const hora = partes[partes.length - 1];
    const estadio = partes.slice(2, partes.length - 1).join(' ');
    return { hora: hora || '--:--', estadio: estadio || 'ESTÁDIO' };
}

async function carregarTickerSulamericana() {
    diaRegistradoSula = new Date().getDate();
    const container = document.getElementById('trilha-ticker-topo');
    const labelData = document.getElementById('label-data-ticker-topo');
    if (!container) return;

    try {
        const resp = await fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now());
        if (!resp.ok) return;
        const dados = await resp.json();

        const todosJogos = (dados.partidasMataMata || []).map(j => ({
            ...j,
            dataApenas: extrairDataRaw(j.data)
        }));

        if (todosJogos.length === 0) return;

        // 1. Filtra pelos jogos da data de hoje
        const dataHojeStr = formatarDataHoje();
        let jogosExibir = todosJogos.filter(j => j.dataApenas === dataHojeStr);

        // 2. Se hoje não houver jogo, pega a próxima data disponível ou a mais recente
        if (jogosExibir.length === 0) {
            const datasDisponiveis = [...new Set(todosJogos.map(j => j.dataApenas).filter(Boolean))];
            if (datasDisponiveis.length > 0) {
                // Seleciona a primeira data válida dos confrontos (ex: 05/10/2026)
                const dataProxima = datasDisponiveis[0];
                jogosExibir = todosJogos.filter(j => j.dataApenas === dataProxima);
            }
        }

        if (jogosExibir.length === 0) return;

        if (labelData && jogosExibir[0].dataApenas) {
            labelData.textContent = `JOGOS DA SULA • ${jogosExibir[0].dataApenas}`;
        }

        container.innerHTML = '';
        const loopDuplicado = [...jogosExibir, ...jogosExibir];

        loopDuplicado.forEach(jogo => {
            const card = document.createElement('div');
            card.className = 'item-jogo-rodape';

            const temPlacar = (jogo.gm !== null && jogo.gm !== undefined && jogo.gv !== null && jogo.gv !== undefined);
            const gmTxt = temPlacar ? jogo.gm : '-';
            const gvTxt = temPlacar ? jogo.gv : '-';
            const statusTxt = temPlacar ? 'ENCERRADO' : 'A JOGAR';
            const statusClass = temPlacar ? 'encerrado' : 'a-jogar';

            const info = extrairHoraEEstadio(jogo.data);

            card.innerHTML = `
                <div class="info-meta-rodape" style="color: var(--sula-solar);">
                    <span>CHAVE ${jogo.chave}</span>
                    <span style="font-size:0.55rem; color:#fff;">${info.hora}</span>
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

// Monitor contínuo de virada de dia às 00:00
setInterval(() => {
    const diaAgora = new Date().getDate();
    if (diaRegistradoSula !== null && diaAgora !== diaRegistradoSula) {
        console.log('Virada de dia detectada no ticker da Sula. Atualizando jogos...');
        carregarTickerSulamericana();
    }
}, 30000);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTickerSulamericana);
} else {
    carregarTickerSulamericana();
}