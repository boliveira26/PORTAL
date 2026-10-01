// ==========================================================================
// assets/js/ticker.js - MOTOR DINÂMICO COM DATA/HORA E ESTÁDIO SEPARADOS
// ==========================================================================

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
    } catch (e) {}

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
        const divisorTexto = temPlacar ? 'x' : 'vs';
        
        const statusTexto = temPlacar ? 'ENCERRADO' : 'A JOGAR';
        const statusClasse = temPlacar ? 'encerrado' : 'proximo';

        // Separa Data/Hora do Estádio de forma limpa
        const info = formatarInfoJogo(jogo.data);

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge-copa-ticker">${jogo.grupo} &bull; R${jogo.rodada}</span>
                <span style="font-size:0.58rem; color:#ffd700; font-weight:800; letter-spacing:0.5px;">${info.dataHora}</span>
            </div>
            <div class="linha-placar-ticker">
                <span class="time-ticker" title="${jogo.m}">${jogo.m}</span>
                <span class="gols-ticker">${gmTexto}</span>
                <span class="vs-ticker">${divisorTexto}</span>
                <span class="gols-ticker">${gvTexto}</span>
                <span class="time-ticker" title="${jogo.v}">${jogo.v}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.56rem; color:#8fa0b5; font-weight:800; max-width:145px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-transform:uppercase;">
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