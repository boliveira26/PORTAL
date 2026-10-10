// ==========================================================================
// assets/js/ticker.js - MOTOR UNIFICADO DO CARROSSEL DE JOGOS (HOME)
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

    // Carrega jogos do mata-mata da Sul-Americana e da Libertadores
    try {
        const [resSula, resLiberta] = await Promise.all([
            fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now()),
            fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now())
        ]);

        if (resSula.ok) {
            const dSula = await resSula.json();
            const placaresSula = (dSula.jogos && dSula.jogos.placares) ? dSula.jogos.placares : {};
            
            (dSula.partidasMataMata || []).forEach(p => {
                const ehIda = !p.fase || p.fase.includes('IDA');
                const cardId = `sula-oitavas-${p.chave}-${ehIda ? 'ida' : 'volta'}`;
                let gm = p.gm, gv = p.gv;

                // Conexão direta com jogos.placares
                if (placaresSula[cardId]) {
                    if (placaresSula[cardId].m !== null) gm = placaresSula[cardId].m;
                    if (placaresSula[cardId].v !== null) gv = placaresSula[cardId].v;
                }

                todosJogos.push({ ...p, gm, gv });
            });
        }

        if (resLiberta.ok) {
            const dLib = await resLiberta.json();
            const placaresLib = (dLib.jogos && dLib.jogos.placares) ? dLib.jogos.placares : {};

            (dLib.partidasMataMata || []).forEach(p => {
                const ehIda = !p.fase || p.fase.includes('IDA');
                const cardId = `oitavas-${p.chave}-${ehIda ? 'ida' : 'volta'}`;
                let gm = p.gm, gv = p.gv;

                if (placaresLib[cardId]) {
                    if (placaresLib[cardId].m !== null) gm = placaresLib[cardId].m;
                    if (placaresLib[cardId].v !== null) gv = placaresLib[cardId].v;
                }

                todosJogos.push({ ...p, gm, gv });
            });
        }
    } catch (e) {}

    // Fallback fase de grupos caso o mata-mata ainda não tenha começado
    if (todosJogos.length === 0) {
        try {
            const resp = await fetch('assets/data/dados-fase-de-grupos.json?v=' + Date.now());
            if (resp.ok) {
                const dadosGrupos = await resp.json();
                ['A','B','C','D','E','F','G','H'].forEach(l => {
                    const g = dadosGrupos[l];
                    if (g && g.rodadas) {
                        const r = g.rodadaExibida || 6;
                        (g.rodadas[r] || []).forEach(p => {
                            todosJogos.push({
                                torneio: 'libertadores',
                                badgeNome: `GRUPO ${l} • R${r}`,
                                data: p.data,
                                m: p.m,
                                v: p.v,
                                gm: p.gm,
                                gv: p.gv
                            });
                        });
                    }
                });
            }
        } catch (e) {}
    }

    if (todosJogos.length === 0) return;

    todosJogos = todosJogos.map(j => ({
        ...j,
        dataApenas: extrairDataRaw(j.data)
    }));

    // Filtra rigorosamente pela data de hoje do seu computador
    const hojeReal = formatarDataHoje();
    let jogosExibir = todosJogos.filter(j => j.dataApenas === hojeReal);

    // Se hoje não houver jogo marcado, busca a data mais recente com partidas
    if (jogosExibir.length === 0) {
        const datasUnicas = [...new Set(todosJogos.map(j => j.dataApenas).filter(Boolean))];
        if (datasUnicas.length > 0) {
            const ultimaData = datasUnicas[datasUnicas.length - 1];
            jogosExibir = todosJogos.filter(j => j.dataApenas === ultimaData);
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
        const badgeTexto = jogo.badgeNome || (ehLiberta ? `LIBERTADORES • CHAVE ${jogo.chave || 'OITAVAS'}` : `SUDAMERICANA • CHAVE ${jogo.chave || 'OITAVAS'}`);

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

        const info = formatarInfoJogo(jogo.data);

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

// Monitor de virada 00:00
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