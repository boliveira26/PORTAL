// ==========================================================================
// assets/js/ticker-rodape.js - TICKER OFICIAL DA LIBERTADORES (MATA-MATA)
// Lê diretamente jogos.infoJogos e dados.sorteio do mata-mata
// ==========================================================================

const ESCUDOS_LIBERTA_MAPA = {
    "Atlético Mineiro": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
    "Atlético-MG": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
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
    "Ind. del Valle": "https://logodetimes.com/times/independiente-del-valle/logo-independiente-del-valle-256.png",
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

let diaRegistradoLiberta = null;

function obterEscudoLiberta(nome) {
    return ESCUDOS_LIBERTA_MAPA[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
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

function converterParaDataObj(dataStr) {
    if (!dataStr) return null;
    const partes = dataStr.split('/').map(Number);
    if (partes.length < 3) return null;
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

function extrairHoraEEstadio(textoData) {
    if (!textoData) return { hora: '--:--', estadio: 'ESTÁDIO OFICIAL' };
    const partes = textoData.trim().split(/\s+/);
    if (partes.length < 3) return { hora: '--:--', estadio: 'ESTÁDIO OFICIAL' };

    const hora = partes[partes.length - 1];
    const estadio = partes.slice(2, partes.length - 1).join(' ');
    return { hora: hora || '--:--', estadio: estadio || 'ESTÁDIO OFICIAL' };
}

async function carregarTickerJogosDoDiaLiberta() {
    diaRegistradoLiberta = new Date().getDate();
    const container = document.getElementById('trilha-ticker-topo');
    const labelData = document.getElementById('label-data-ticker-topo');
    if (!container) return;

    let todasPartidas = [];

    // 1. CARREGA DIRETAMENTE OS CONFRONTOS DO MATA-MATA DA LIBERTADORES
    try {
        const resp = await fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now());
        if (resp.ok) {
            const dados = await resp.json();
            const placaresOficiais = (dados.jogos && dados.jogos.placares) ? dados.jogos.placares : {};
            const infoJogos = (dados.jogos && dados.jogos.infoJogos) ? dados.jogos.infoJogos : {};

            // Constrói as partidas a partir do sorteio e do infoJogos
            if (dados.sorteio && Array.isArray(dados.sorteio)) {
                dados.sorteio.forEach(c => {
                    const letra = c.chave;
                    const p2 = c.pote2;
                    const p1 = c.pote1;

                    // Jogo de Ida
                    const idIda = `oitavas-${letra}-ida`;
                    const dataIda = infoJogos[idIda] || '';
                    const placarIda = placaresOficiais[idIda] || { m: null, v: null };

                    if (dataIda && !dataIda.includes('A DEFINIR')) {
                        todasPartidas.push({
                            chave: letra,
                            fase: 'OITAVAS • IDA',
                            dataTexto: dataIda,
                            dataApenas: extrairDataRaw(dataIda),
                            m: p2,
                            v: p1,
                            gm: placarIda.m,
                            gv: placarIda.v
                        });
                    }

                    // Jogo de Volta
                    const idVolta = `oitavas-${letra}-volta`;
                    const dataVolta = infoJogos[idVolta] || '';
                    const placarVolta = placaresOficiais[idVolta] || { m: null, v: null };

                    if (dataVolta && !dataVolta.includes('A DEFINIR')) {
                        todasPartidas.push({
                            chave: letra,
                            fase: 'OITAVAS • VOLTA',
                            dataTexto: dataVolta,
                            dataApenas: extrairDataRaw(dataVolta),
                            m: p1,
                            v: p2,
                            gm: placarVolta.m,
                            gv: placarVolta.v
                        });
                    }
                });
            }
        }
    } catch (e) {
        console.warn('Erro ao carregar dados do mata-mata da Libertadores:', e);
    }

    if (todasPartidas.length === 0) return;

    // 2. FILTRA RIGOROSAMENTE PELA DATA DE HOJE DO SEU COMPUTADOR (ex: 10/10/2026)
    const hojeReal = formatarDataHoje();
    let jogosExibir = todasPartidas.filter(p => p.dataApenas === hojeReal);

    // 3. Se hoje não houver jogo, calcula a menor distância de dias
    if (jogosExibir.length === 0) {
        const hojeObj = new Date();
        hojeObj.setHours(0, 0, 0, 0);

        const datasUnicas = [...new Set(todasPartidas.map(p => p.dataApenas).filter(Boolean))];
        const datasComDiff = datasUnicas.map(str => {
            const obj = converterParaDataObj(str);
            const diffDias = obj ? Math.abs((obj.getTime() - hojeObj.getTime()) / (1000 * 60 * 60 * 24)) : Infinity;
            const ehFuturo = obj ? obj >= hojeObj : false;
            return { str, obj, diffDias, ehFuturo };
        }).filter(d => d.obj !== null);

        datasComDiff.sort((a, b) => a.diffDias - b.diffDias);

        if (datasComDiff.length > 0) {
            const maisProxima = datasComDiff[0];
            jogosExibir = todasPartidas.filter(p => p.dataApenas === maisProxima.str);
            const prefixo = maisProxima.ehFuturo ? 'PRÓXIMOS JOGOS' : 'ÚLTIMOS RESULTADOS';
            if (labelData) labelData.textContent = `${prefixo} • ${maisProxima.str}`;
        }
    } else {
        if (labelData) labelData.textContent = `JOGOS DE HOJE • ${hojeReal}`;
    }

    if (jogosExibir.length === 0) return;

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

        let gmVenc = '', gvVenc = '';
        if (temPlacar) {
            if (jogo.gm > jogo.gv) gmVenc = 'vencedor';
            else if (jogo.gv > jogo.gm) gvVenc = 'vencedor';
        }

        const info = extrairHoraEEstadio(jogo.dataTexto);

        card.innerHTML = `
            <div class="info-meta-rodape" style="color: var(--gold-main);">
                <span>CHAVE ${jogo.chave}</span>
                <span style="font-size:0.55rem; color:#fff;">${info.hora}</span>
            </div>

            <div class="bloco-confronto-rodape">
                <div class="linha-time-rodape">
                    <img src="${obterEscudoLiberta(jogo.m)}" class="escudo-min" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                    <span class="nome-min">${jogo.m}</span>
                    <span class="gols-min ${gmVenc}">${gmTxt}</span>
                </div>
                <div class="linha-time-rodape">
                    <img src="${obterEscudoLiberta(jogo.v)}" class="escudo-min" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
                    <span class="nome-min">${jogo.v}</span>
                    <span class="gols-min ${gvVenc}">${gvTxt}</span>
                </div>
            </div>

            <div class="status-meta-rodape">
                <span class="estadio-min" title="${info.estadio}">${info.estadio}</span>
                <span class="tag-status-rodape ${statusClass}">${statusTxt}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

// Monitor de virada às 00:00
setInterval(() => {
    const diaAgora = new Date().getDate();
    if (diaRegistradoLiberta !== null && diaAgora !== diaRegistradoLiberta) {
        carregarTickerJogosDoDiaLiberta();
    }
}, 30000);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTickerJogosDoDiaLiberta);
} else {
    carregarTickerJogosDoDiaLiberta();
}