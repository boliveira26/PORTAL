// ==========================================================================
// assets/js/sulamericana-oficial.js - MODO VIEWER MATA-MATA SUL-AMERICANA
// ==========================================================================

const CHAVE_SORTEIO_SULA = 'resultado_sorteio_sulamericana';
const CHAVE_JOGOS_SULA = 'jogos_oficial_sulamericana';

let estadoSulamericana = {
    placares: {},
    infoJogos: {}
};

async function inicializarTabelaSulamericana() {
    // 1. Tenta carregar dados do arquivo JSON publicado caso exista
    try {
        const resposta = await fetch('assets/data/dados-mata-mata-sulamericana.json?v=' + Date.now());
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson.sorteio) localStorage.setItem(CHAVE_SORTEIO_SULA, JSON.stringify(dadosJson.sorteio));
            if (dadosJson.jogos) localStorage.setItem(CHAVE_JOGOS_SULA, JSON.stringify(dadosJson.jogos));
        }
    } catch (e) {}

    // 2. Renderiza a tabela e calcula o mata-mata
    carregarEstruturaOitavasSula();
    carregarJogosSalvosSula();
    calcularClassificadosEAvançoSula();
}

function carregarEstruturaOitavasSula() {
    const sorteioSalvo = localStorage.getItem(CHAVE_SORTEIO_SULA);
    if (!sorteioSalvo) return;

    try {
        const confrontos = typeof sorteioSalvo === 'string' ? JSON.parse(sorteioSalvo) : sorteioSalvo;

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
    } catch (e) {
        console.error('Erro ao ler sorteio da Sul-Americana salvo:', e);
    }
}

function carregarJogosSalvosSula() {
    const salvos = localStorage.getItem(CHAVE_JOGOS_SULA);
    if (!salvos) return;

    try {
        const dados = typeof salvos === 'string' ? JSON.parse(salvos) : salvos;
        estadoSulamericana = { ...estadoSulamericana, ...dados };

        document.querySelectorAll('.card-jogo').forEach(card => {
            const id = card.id;
            const elM = card.querySelector('.gols-mandante');
            const elV = card.querySelector('.gols-visitante');
            const infoEl = card.querySelector('.info-jogo');

            if (dados.placares && dados.placares[id]) {
                if (elM && dados.placares[id].m !== null && dados.placares[id].m !== undefined) {
                    elM.textContent = dados.placares[id].m;
                }
                if (elV && dados.placares[id].v !== null && dados.placares[id].v !== undefined) {
                    elV.textContent = dados.placares[id].v;
                }
            }

            if (dados.infoJogos && dados.infoJogos[id] && infoEl) {
                infoEl.textContent = dados.infoJogos[id];
            }
        });
    } catch (e) {
        console.error('Erro ao carregar jogos da Sul-Americana:', e);
    }
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