// ==========================================================================
// assets/js/ticker.js - MOTOR DINÂMICO MATCH TICKER OFICIAL CONMEBOL
// ==========================================================================

// Mapeamento de escudos dos clubes da competição
const ESCUDOS_CLUBES = {
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

function obterEscudo(nomeTime) {
    if (ESCUDOS_CLUBES[nomeTime]) {
        return ESCUDOS_CLUBES[nomeTime];
    }
    // Fallback genérico para imagem local caso exista
    const slug = nomeTime.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");
    return `assets/img/escudos/${slug}.png`;
}

async function carregarTickerJogosDoDia() {
    const container = document.getElementById('ticker-lista');
    if (!container) return;

    let dadosGrupos = null;

    // 1. Tenta buscar os dados da fase de grupos exportados
    try {
        const resposta = await fetch('assets/data/dados-fase-de-grupos.json?v=' + Date.now());
        if (resposta.ok) {
            dadosGrupos = await resposta.json();
        }
    } catch (e) {
        console.warn('Erro ao carregar dados-fase-de-grupos.json:', e);
    }

    // Fallback para localStorage
    if (!dadosGrupos) {
        const salvo = localStorage.getItem('conmebol_fase_grupos_admin_v4');
        if (salvo) {
            try { dadosGrupos = JSON.parse(salvo); } catch (e) {}
        }
    }

    const listaJogosFiltrados = coletarJogosDataAtiva(dadosGrupos);
    if (!listaJogosFiltrados || listaJogosFiltrados.length === 0) return;

    container.innerHTML = '';

    // Duplicamos a lista para criar o loop contínuo infinito sem cortes
    const listaDuplicada = [...listaJogosFiltrados, ...listaJogosFiltrados];

    listaDuplicada.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card-jogo-ticker';

        const temPlacar = (jogo.gm !== null && jogo.gm !== undefined && 
                           jogo.gv !== null && jogo.gv !== undefined);

        const gmTexto = temPlacar ? jogo.gm : '-';
        const gvTexto = temPlacar ? jogo.gv : '-';
        
        const statusTexto = temPlacar ? 'ENCERRADO' : 'A JOGAR';
        const statusClasse = temPlacar ? 'encerrado' : 'proximo';

        // Destaque de vencedor
        let gmVencedor = '';
        let gvVencedor = '';
        if (temPlacar) {
            if (jogo.gm > jogo.gv) gmVencedor = 'vencedor';
            else if (jogo.gv > jogo.gm) gvVencedor = 'vencedor';
        }

        // Separa Data/Hora do Estádio de forma limpa
        const info = formatarInfoJogo(jogo.data);

        card.innerHTML = `
            <div class="card-jogo-header">
                <span class="badge-copa-ticker">${jogo.grupo} &bull; R${jogo.rodada}</span>
                <span style="font-size:0.62rem; color:var(--gold-bright); font-weight:800;">${info.dataHora}</span>
            </div>

            <div class="card-jogo-corpo">
                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudo(jogo.m)}" alt="${jogo.m}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.m}">${jogo.m}</span>
                    </div>
                    <span class="gols-time-ticker ${gmVencedor}">${gmTexto}</span>
                </div>

                <div class="linha-time-ticker">
                    <div class="time-info-ticker">
                        <img class="escudo-time-ticker" src="${obterEscudo(jogo.v)}" alt="${jogo.v}" onerror="this.style.opacity='0.2'">
                        <span class="nome-time-ticker" title="${jogo.v}">${jogo.v}</span>
                    </div>
                    <span class="gols-time-ticker ${gvVencedor}">${gvTexto}</span>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px; padding-top:3px; border-top:1px solid rgba(255,255,255,0.04);">
                <span style="font-size:0.56rem; color:#8fa0b5; font-weight:700; max-width:130px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-transform:uppercase;">
                    ${info.estadio}
                </span>
                <span class="status-ticker ${statusClasse}">${statusTexto}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

// 2. SEPARADOR INTELIGENTE DE DATA/HORA E ESTÁDIO
function formatarInfoJogo(texto) {
    if (!texto) return { dataHora: '', estadio: 'ESTÁDIO OFICIAL' };

    // Exemplo: "QUA 30/09/2026 HERNANDO SILES 21:00"
    const partes = texto.trim().split(/\s+/);
    if (partes.length < 3) {
        return { dataHora: texto, estadio: 'ESTÁDIO OFICIAL' };
    }

    const diaSemana = partes[0]; // "QUA"
    const dataDia = partes[1].replace('/2026', ''); // "30/09"
    const horario = partes[partes.length - 1]; // "21:00"
    const estadio = partes.slice(2, partes.length - 1).join(' '); // "HERNANDO SILES"

    return {
        dataHora: `${diaSemana} ${dataDia} &bull; ${horario}`,
        estadio: estadio || 'ESTÁDIO OFICIAL'
    };
}

// 3. COLETA OS JOGOS DA RODADA ATIVA
function coletarJogosDataAtiva(dados) {
    const jogosColetados = [];
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    if (dados) {
        letras.forEach(letra => {
            const grupo = dados[letra];
            if (grupo && grupo.rodadas) {
                const rodadaAtual = grupo.rodadaExibida || 6;
                const jogos = grupo.rodadas[rodadaAtual] || [];
                jogos.forEach(j => {
                    jogosColetados.push({
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
    }

    return jogosColetados;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarTickerJogosDoDia);
} else {
    carregarTickerJogosDoDia();
}