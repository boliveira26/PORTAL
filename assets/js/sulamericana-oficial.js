// ==========================================================================
// assets/js/sulamericana-oficial.js - MODO VIEWER MATA-MATA SULA
// Leitor inteligente com suporte tanto a partidasMataMata quanto a jogos.placares
// ==========================================================================

const CHAVE_SORTEIO_SULA = 'conmebol_sulamericana_sorteio_oficial_2026';
const CHAVE_JOGOS_SULA = 'conmebol_sulamericana_jogos_oficial_2026';

let estadoSulamericana = {
    sorteioAtivo: true,
    placares: {},
    infoJogos: {}
};

async function inicializarTabelaSulamericana() {
    let dadosJson = null;

    try {
        const resposta = await fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now());
        if (resposta.ok) {
            dadosJson = await resposta.json();
        }
    } catch (e) {}

    if (dadosJson) {
        if (dadosJson.sorteio) {
            carregarEstruturaOitavasSula(dadosJson.sorteio);
        }

        // Lê placares tanto da lista partidasMataMata quanto do bloco jogos.placares
        carregarPlacaresHibridosSula(dadosJson);
        calcularClassificadosEAvançoSula();
        return;
    }

    const sorteioLocal = localStorage.getItem(CHAVE_SORTEIO_SULA) || localStorage.getItem('resultado_sorteio_sulamericana');
    if (sorteioLocal) {
        try {
            const dadosSorteio = JSON.parse(sorteioLocal);
            carregarEstruturaOitavasSula(dadosSorteio);
            carregarJogosSalvosLocalSula();
            calcularClassificadosEAvançoSula();
        } catch (e) {}
    }
}

function carregarEstruturaOitavasSula(confrontos) {
    if (!Array.isArray(confrontos)) return;

    confrontos.forEach(confronto => {
        const letra = confronto.chave;
        const timeP4 = confronto.pote4 || confronto.time4;
        const timeP3 = confronto.pote3 || confronto.time3;

        const cardIda = document.getElementById(`sula-oitavas-${letra}-ida`);
        if (cardIda && timeP4 && timeP3) {
            cardIda.querySelector('.time.mandante').textContent = timeP4;
            cardIda.querySelector('.time.visitante').textContent = timeP3;
        }

        const cardVolta = document.getElementById(`sula-oitavas-${letra}-volta`);
        if (cardVolta && timeP4 && timeP3) {
            cardVolta.querySelector('.time.mandante').textContent = timeP3;
            cardVolta.querySelector('.time.visitante').textContent = timeP4;
        }
    });
}

// LÊ PLACARES TANTO DE partidasMataMata QUANTO DE jogos.placares
function carregarPlacaresHibridosSula(dadosJson) {
    estadoSulamericana.placares = {};
    estadoSulamericana.infoJogos = {};

    // 1. Lê do bloco jogos se existir
    if (dadosJson.jogos) {
        estadoSulamericana.placares = { ...dadosJson.jogos.placares };
        estadoSulamericana.infoJogos = { ...dadosJson.jogos.infoJogos };
    }

    // 2. Lê da lista de partidasMataMata se você colocou gm/gv lá
    if (dadosJson.partidasMataMata && Array.isArray(dadosJson.partidasMataMata)) {
        dadosJson.partidasMataMata.forEach(partida => {
            const chave = partida.chave;
            const ehIda = partida.fase && partida.fase.includes('IDA');
            const cardId = ehIda ? `sula-oitavas-${chave}-ida` : `sula-oitavas-${chave}-volta`;

            if (partida.gm !== null && partida.gm !== undefined && partida.gv !== null && partida.gv !== undefined) {
                estadoSulamericana.placares[cardId] = {
                    m: parseInt(partida.gm, 10),
                    v: parseInt(partida.gv, 10)
                };
            }

            if (partida.data) {
                estadoSulamericana.infoJogos[cardId] = partida.data;
            }
        });
    }

    aplicarPlacaresNaTelaSula();
}

function carregarJogosSalvosLocalSula() {
    const salvos = localStorage.getItem(CHAVE_JOGOS_SULA) || localStorage.getItem('jogos_oficial_sulamericana');
    if (!salvos) return;

    try {
        const dados = JSON.parse(salvos);
        estadoSulamericana.placares = dados.placares || {};
        estadoSulamericana.infoJogos = dados.infoJogos || {};
        aplicarPlacaresNaTelaSula();
    } catch (e) {}
}

function aplicarPlacaresNaTelaSula() {
    document.querySelectorAll('.card-jogo').forEach(card => {
        const id = card.id;
        const elM = card.querySelector('.gols-mandante');
        const elV = card.querySelector('.gols-visitante');
        const infoEl = card.querySelector('.info-jogo');

        if (estadoSulamericana.placares && estadoSulamericana.placares[id]) {
            const p = estadoSulamericana.placares[id];
            if (elM && p.m !== null && p.m !== undefined) elM.textContent = p.m;
            if (elV && p.v !== null && p.v !== undefined) elV.textContent = p.v;
        }

        if (estadoSulamericana.infoJogos && estadoSulamericana.infoJogos[id] && infoEl) {
            infoEl.textContent = estadoSulamericana.infoJogos[id];
        }
    });
}

function calcularClassificadosEAvançoSula() {
    const chaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const vencedoresOitavas = {};

    chaves.forEach(letra => {
        const placarIda = estadoSulamericana.placares ? estadoSulamericana.placares[`sula-oitavas-${letra}-ida`] : null;
        const placarVolta = estadoSulamericana.placares ? estadoSulamericana.placares[`sula-oitavas-${letra}-volta`] : null;

        const cardIda = document.getElementById(`sula-oitavas-${letra}-ida`);
        if (!cardIda) return;

        const timeP4 = cardIda.querySelector('.time.mandante').textContent;
        const timeP3 = cardIda.querySelector('.time.visitante').textContent;

        if (timeP4.includes('Lugar') || timeP3.includes('Lugar')) return;

        if (placarIda && placarVolta && 
            placarIda.m !== null && placarIda.m !== undefined && 
            placarIda.v !== null && placarIda.v !== undefined && 
            placarVolta.m !== null && placarVolta.m !== undefined && 
            placarVolta.v !== null && placarVolta.v !== undefined) {
            
            const golsP4 = parseInt(placarIda.m, 10) + parseInt(placarVolta.v, 10);
            const golsP3 = parseInt(placarIda.v, 10) + parseInt(placarVolta.m, 10);

            if (golsP3 > golsP4) {
                vencedoresOitavas[letra] = timeP3;
            } else if (golsP4 > golsP3) {
                vencedoresOitavas[letra] = timeP4;
            } else {
                vencedoresOitavas[letra] = timeP3;
            }
        }
    });

    atualizarConfrontoMataMataSula('sula-quartas-1', vencedoresOitavas['A'] || 'Vencedor A', vencedoresOitavas['C'] || 'Vencedor C');
    atualizarConfrontoMataMataSula('sula-quartas-2', vencedoresOitavas['E'] || 'Vencedor E', vencedoresOitavas['G'] || 'Vencedor G');
    atualizarConfrontoMataMataSula('sula-quartas-3', vencedoresOitavas['B'] || 'Vencedor B', vencedoresOitavas['D'] || 'Vencedor D');
    atualizarConfrontoMataMataSula('sula-quartas-4', vencedoresOitavas['F'] || 'Vencedor F', vencedoresOitavas['H'] || 'Vencedor H');

    const vQ1 = calcularVencedorMataMataSula('sula-quartas-1');
    const vQ2 = calcularVencedorMataMataSula('sula-quartas-2');
    const vQ3 = calcularVencedorMataMataSula('sula-quartas-3');
    const vQ4 = calcularVencedorMataMataSula('sula-quartas-4');

    atualizarConfrontoMataMataSula('sula-semi-1', vQ1 || 'Vencedor Q1', vQ2 || 'Vencedor Q2');
    atualizarConfrontoMataMataSula('sula-semi-2', vQ3 || 'Vencedor Q3', vQ4 || 'Vencedor Q4');

    const vS1 = calcularVencedorMataMataSula('sula-semi-1');
    const vS2 = calcularVencedorMataMataSula('sula-semi-2');

    const cardFinal = document.getElementById('sula-final-jogo');
    if (cardFinal) {
        if (vS1) cardFinal.querySelector('.time.mandante').textContent = vS1;
        if (vS2) cardFinal.querySelector('.time.visitante').textContent = vS2;
    }
}

function atualizarConfrontoMataMataSula(prefixo, t1, t2) {
    const cardIda = document.getElementById(`${prefixo}-ida`);
    const cardVolta = document.getElementById(`${prefixo}-volta`);

    if (cardIda) {
        cardIda.querySelector('.time.mandante').textContent = t1;
        cardIda.querySelector('.time.visitante').textContent = t2;
    }
    if (cardVolta) {
        cardVolta.querySelector('.time.mandante').textContent = t2;
        cardVolta.querySelector('.time.visitante').textContent = t1;
    }
}

function calcularVencedorMataMataSula(prefixo) {
    const placarIda = estadoSulamericana.placares ? estadoSulamericana.placares[`${prefixo}-ida`] : null;
    const placarVolta = estadoSulamericana.placares ? estadoSulamericana.placares[`${prefixo}-volta`] : null;

    const cardIda = document.getElementById(`${prefixo}-ida`);
    if (!cardIda) return null;

    const t1 = cardIda.querySelector('.time.mandante').textContent;
    const t2 = cardIda.querySelector('.time.visitante').textContent;

    if (t1.startsWith('Vencedor') || t2.startsWith('Vencedor')) return null;

    if (placarIda && placarVolta && 
        placarIda.m !== null && placarIda.m !== undefined && 
        placarIda.v !== null && placarIda.v !== undefined && 
        placarVolta.m !== null && placarVolta.m !== undefined && 
        placarVolta.v !== null && placarVolta.v !== undefined) {
        
        const golsT1 = parseInt(placarIda.m, 10) + parseInt(placarVolta.v, 10);
        const golsT2 = parseInt(placarIda.v, 10) + parseInt(placarVolta.m, 10);

        if (golsT1 > golsT2) return t1;
        if (golsT2 > golsT1) return t2;
        return t1;
    }
    return null;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTabelaSulamericana);
} else {
    inicializarTabelaSulamericana();
}