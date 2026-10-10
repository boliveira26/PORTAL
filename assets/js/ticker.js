// ==========================================================================
// assets/js/ticker.js - MOTOR HOME UNIFICADO (LÊ INFOJOGOS DIRETO DO JSON)
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

let diaRegistradoHome = null;

function obterEscudoTicker(nome) {
    return ESCUDOS_TICKER[nome] || `assets/img/escudos/${nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
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

async function carregarTickerHome() {
    diaRegistradoHome = new Date().getDate();
    const container = document.getElementById('ticker-lista');
    if (!container) return;

    let todosJogos = [];

    // Carrega dados de ambas as copas
    try {
        const [resSula, resLiberta] = await Promise.all([
            fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now()),
            fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now())
        ]);

        // 1. Processa Sul-Americana
        if (resSula.ok) {
            const dSula = await resSula.json();
            const placaresSula = (dSula.jogos && dSula.jogos.placares) ? dSula.jogos.placares : {};
            const infoSula = (dSula.jogos && dSula.jogos.infoJogos) ? dSula.jogos.infoJogos : {};

            if (dSula.sorteio && Array.isArray(dSula.sorteio)) {
                dSula.sorteio.forEach(c => {
                    const l = c.chave;
                    const idIda = `sula-oitavas-${l}-ida`;
                    const idVolta = `sula-oitavas-${l}-volta`;

                    if (infoSula[idIda] && !infoSula[idIda].includes('A DEFINIR')) {
                        const pl = placaresSula[idIda] || { m: null, v: null };
                        todosJogos.push({
                            torneio: 'sulamericana',
                            chave: l,
                            dataTexto: infoSula[idIda],
                            dataApenas: extrairDataRaw(infoSula[idIda]),
                            m: c.pote4 || c.time4,
                            v: c.pote3 || c.time3,
                            gm: pl.m,
                            gv: pl.v
                        });
                    }

                    if (infoSula[idVolta] && !infoSula[idVolta].includes('A DEFINIR')) {
                        const pl = placaresSula[idVolta] || { m: null, v: null };
                        todosJogos.push({
                            torneio: 'sulamericana',
                            chave: l,
                            dataTexto: infoSula[idVolta],
                            dataApenas: extrairDataRaw(infoSula[idVolta]),
                            m: c.pote3 || c.time3,
                            v: c.pote4 || c.time4,
                            gm: pl.m,
                            gv: pl.v
                        });
                    }
                });
            }
        }

        // 2. Processa Libertadores
        if (resLiberta.ok) {
            const dLib = await resLiberta.json();
            const placaresLib = (dLib.jogos && dLib.jogos.placares) ? dLib.jogos.placares : {};
            const infoLib = (dLib.jogos && dLib.jogos.infoJogos) ? dLib.jogos.infoJogos : {};

            if (dLib.sorteio && Array.isArray(dLib.sorteio)) {
                dLib.sorteio.forEach(c => {
                    const l = c.chave;
                    const idIda = `oitavas-${l}-ida`;
                    const idVolta = `oitavas-${l}-volta`;

                    if (infoLib[idIda] && !infoLib[idIda].includes('A DEFINIR')) {
                        const pl = placaresLib[idIda] || { m: null, v: null };
                        todosJogos.push({
                            torneio: 'libertadores',
                            chave: l,
                            dataTexto: infoLib[idIda],
                            dataApenas: extrairDataRaw(infoLib[idIda]),
                            m: c.pote2,
                            v: c.pote1,
                            gm: pl.m,
                            gv: pl.v
                        });
                    }

                    if (infoLib[idVolta] && !infoLib[idVolta].includes('A DEFINIR')) {
                        const pl = placaresLib[idVolta] || { m: null, v: null };
                        todosJogos.push({
                            torneio: 'libertadores',
                            chave: l,
                            dataTexto: infoLib[idVolta],
                            dataApenas: extrairDataRaw(infoLib[idVolta]),
                            m: c.pote1,
                            v: c.pote2,
                            gm: pl.m,
                            gv: pl.v
                        });
                    }
                });
            }
        }
    } catch (e) {}

    if (todosJogos.length === 0) return;

    // Filtra pela data de hoje do PC (ex: 10/10/2026)
    const hojeReal = formatarDataHoje();
    let jogosExibir = todosJogos.filter(j => j.dataApenas === hojeReal);

    // Se não houver jogo hoje, busca a data mais próxima
    if (jogosExibir.length === 0) {
        const hojeObj = new Date();
        hojeObj.setHours(0, 0, 0, 0);

        const datasUnicas = [...new Set(todosJogos.map(j => j.dataApenas).filter(Boolean))];
        const datasComDiff = datasUnicas.map(str => {
            const obj = converterParaDataObj(str);
            const diffDias = obj ? Math.abs((obj.getTime() - hojeObj.getTime()) / (1000 * 60 * 60 * 24)) : Infinity;
            return { str, obj, diffDias };
        }).filter(d => d.obj !== null);

        datasComDiff.sort((a, b) => a.diffDias - b.diffDias);

        if (datasComDiff.length > 0) {
            jogosExibir = todosJogos.filter(j => j.dataApenas === datasComDiff[0].str);
        }
    }

    if (jogosExibir.length === 0) return;

    container.innerHTML = '';
    const loopDuplicado = [...jogosExibir, ...jogosExibir];

    loopDuplicado.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card-jogo-ticker';

        const ehLiberta = (jogo.torneio === 'libertadores');
        const badgeCor = ehLiberta ? 'color: var(--gold-main);' : 'color: var(--sula-solar);';
        const badgeTexto = ehLiberta ? `LIBERTADORES • CHAVE ${jogo.chave}` : `SUDAMERICANA • CHAVE ${jogo.chave}`;

        const temPlacar = (jogo.gm !== null && jogo.gm !== undefined && jogo.gv !== null && jogo.gv !== undefined);
        const gmTxt = temPlacar ? jogo.gm : '-';
        const gvTxt = temPlacar ? jogo.gv : '-';
        const statusTxt = temPlacar ? 'ENCERRADO' : 'A JOGAR';
        const statusClasse = temPlacar ? 'encerrado' : 'proximo';

        let gmVenc = '', gvVenc = '';
        if (temPlacar) {
            if (jogo.gm > jogo.gv) gmVenc = 'vencedor';
            else if (jogo.gv > jogo.gm) gvVenc = 'vencedor';
        }

        const info = formatarInfoJogo(jogo.dataTexto);

        card.innerHTML = `
            <div class="card-jogo-header">
                <span class="badge-copa-ticker" style="${badgeCor}">${badgeTexto}</span>
                <span style="font-size:0.6rem; color:#ffffff; font-weight:700;">${info.dataHora}</span>
            </div>

            <div class="card-jogo-corpo">
                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudoTicker(jogo.m)}" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.m}">${jogo.m}</span>
                    </div>
                    <span class="gols-time-ticker ${gmVenc}">${gmTxt}</span>
                </div>

                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudoTicker(jogo.v)}" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.v}">${jogo.v}</span>
                    </div>
                    <span class="gols-time-ticker ${gvVenc}">${gvTxt}</span>
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

setInterval(() => {
    const diaAgora = new Date().getDate();
    if (diaRegistradoHome !== null && diaAgora !== diaRegistradoHome) {
        carregarTickerHome();
    }
}, 30000);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTickerHome);
} else {
    carregarTickerHome();
}