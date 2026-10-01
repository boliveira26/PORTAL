// ==========================================================================
// assets/js/sulamericana-oficial.js - MODO VIEWER COM SUPORTE A JSON & LOCAL
// ==========================================================================

const CHAVE_SORTEIO_SULA = 'resultado_sorteio_sulamericana';
const CHAVE_JOGOS_SULA = 'jogos_oficial_sulamericana';

let estadoSulamericana = {
    placares: {},
    infoJogos: {}
};

// 1. INICIALIZAÇÃO HÍBRIDA (JSON REMOTO OU LOCALSTORAGE)
async function inicializarTabelaSulamericana() {
    try {
        const resposta = await fetch('dados-sulamericana.json');
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson.sorteio) localStorage.setItem(CHAVE_SORTEIO_SULA, dadosJson.sorteio);
            if (dadosJson.jogos) localStorage.setItem(CHAVE_JOGOS_SULA, dadosJson.jogos);
        }
    } catch (e) {
        // Fallback para localStorage local
    }

    carregarEstruturaOitavasSula();
    carregarJogosSalvosSula();
    calcularClassificadosEAvançoSula();
}

// 2. CARREGA OS TIMES SORTEADOS
function carregarEstruturaOitavasSula() {
    const sorteioSalvo = localStorage.getItem(CHAVE_SORTEIO_SULA);
    if (!sorteioSalvo) return;

    try {
        const confrontos = JSON.parse(sorteioSalvo);

        confrontos.forEach(confronto => {
            const letra = confronto.chave;
            const timeP2 = confronto.pote2; // Mandante na Ida
            const timeP1 = confronto.pote1; // Mandante na Volta

            const cardIda = document.getElementById(`oitavas-${letra}-ida`);
            if (cardIda) {
                cardIda.querySelector('.time.mandante').textContent = timeP2;
                cardIda.querySelector('.time.visitante').textContent = timeP1;
            }

            const cardVolta = document.getElementById(`oitavas-${letra}-volta`);
            if (cardVolta) {
                cardVolta.querySelector('.time.mandante').textContent = timeP1;
                cardVolta.querySelector('.time.visitante').textContent = timeP2;
            }
        });
    } catch (e) {
        console.error('Erro ao ler sorteio da Sul-Americana:', e);
    }
}

// 3. CARREGA PLACARES E DATAS SALVAS (SOMENTE LEITURA)
function carregarJogosSalvosSula() {
    const salvos = localStorage.getItem(CHAVE_JOGOS_SULA);
    if (!salvos) return;

    try {
        const dados = JSON.parse(salvos);
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
        console.error('Erro ao ler jogos da Sul-Americana:', e);
    }
}

// 4. CÁLCULO DE AGREGADOS E AVANÇO AUTOMÁTICO
function calcularClassificadosEAvançoSula() {
    const chaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const vencedoresOitavas = {};

    chaves.forEach(letra => {
        const placarIda = estadoSulamericana.placares ? estadoSulamericana.placares[`oitavas-${letra}-ida`] : null;
        const placarVolta = estadoSulamericana.placares ? estadoSulamericana.placares[`oitavas-${letra}-volta`] : null;

        const cardIda = document.getElementById(`oitavas-${letra}-ida`);
        if (!cardIda) return;

        const timeP2 = cardIda.querySelector('.time.mandante').textContent;
        const timeP1 = cardIda.querySelector('.time.visitante').textContent;

        if (placarIda && placarVolta && 
            placarIda.m !== null && placarIda.m !== undefined && 
            placarIda.v !== null && placarIda.v !== undefined && 
            placarVolta.m !== null && placarVolta.m !== undefined && 
            placarVolta.v !== null && placarVolta.v !== undefined) {
            
            const golsP2 = placarIda.m + placarVolta.v;
            const golsP1 = placarIda.v + placarVolta.m;

            if (golsP1 > golsP2) {
                vencedoresOitavas[letra] = timeP1;
            } else if (golsP2 > golsP1) {
                vencedoresOitavas[letra] = timeP2;
            } else {
                vencedoresOitavas[letra] = timeP1;
            }
        }
    });

    // Atualiza Quartas de Final
    atualizarConfrontoMataMataSula('quartas-1', vencedoresOitavas['A'] || 'Venc. A', vencedoresOitavas['C'] || 'Venc. C');
    atualizarConfrontoMataMataSula('quartas-2', vencedoresOitavas['E'] || 'Venc. E', vencedoresOitavas['G'] || 'Venc. G');
    atualizarConfrontoMataMataSula('quartas-3', vencedoresOitavas['B'] || 'Venc. B', vencedoresOitavas['D'] || 'Venc. D');
    atualizarConfrontoMataMataSula('quartas-4', vencedoresOitavas['F'] || 'Venc. F', vencedoresOitavas['H'] || 'Venc. H');

    // Calcula Semifinais
    const vQ1 = calcularVencedorMataMataSula('quartas-1');
    const vQ2 = calcularVencedorMataMataSula('quartas-2');
    const vQ3 = calcularVencedorMataMataSula('quartas-3');
    const vQ4 = calcularVencedorMataMataSula('quartas-4');

    atualizarConfrontoMataMataSula('semi-1', vQ1 || 'Venc. Q1', vQ2 || 'Venc. Q2');
    atualizarConfrontoMataMataSula('semi-2', vQ3 || 'Venc. Q3', vQ4 || 'Venc. Q4');

    // Calcula Final Única
    const vS1 = calcularVencedorMataMataSula('semi-1');
    const vS2 = calcularVencedorMataMataSula('semi-2');

    const cardFinal = document.getElementById('final-jogo');
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

    if (t1.startsWith('Venc.') || t2.startsWith('Venc.')) return null;

    if (placarIda && placarVolta && 
        placarIda.m !== null && placarIda.m !== undefined && 
        placarIda.v !== null && placarIda.v !== undefined && 
        placarVolta.m !== null && placarVolta.m !== undefined && 
        placarVolta.v !== null && placarVolta.v !== undefined) {
        
        const golsT1 = placarIda.m + placarVolta.v;
        const golsT2 = placarIda.v + placarVolta.m;

        if (golsT1 > golsT2) return t1;
        if (golsT2 > golsT1) return t2;
        return t1;
    }
    return null;
}

// Inicialização automática
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTabelaSulamericana);
} else {
    inicializarTabelaSulamericana();
}