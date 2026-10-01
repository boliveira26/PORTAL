// ==========================================================================
// assets/js/libertadores-oficial.js - MODO VIEWER COM SUPORTE A JSON & LOCAL
// ==========================================================================

const CHAVE_SORTEIO = 'resultado_sorteio_libertadores';
const CHAVE_JOGOS = 'jogos_oficial_libertadores';

let estadoLibertadores = {
    placares: {},
    infoJogos: {}
};

async function inicializarTabelaLibertadores() {
    // 1. Tenta carregar dados do arquivo JSON publicado
    try {
        const resposta = await fetch('dados-libertadores.json');
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson.sorteio) localStorage.setItem(CHAVE_SORTEIO, dadosJson.sorteio);
            if (dadosJson.jogos) localStorage.setItem(CHAVE_JOGOS, dadosJson.jogos);
        }
    } catch (e) {
        // Se estiver rodando local sem o JSON, usa o localStorage existente
    }

    // 2. Renderiza a tabela e calcula o mata-mata
    carregarEstruturaOitavas();
    carregarJogosSalvos();
    calcularClassificadosEAvanço();
}

function carregarEstruturaOitavas() {
    const sorteioSalvo = localStorage.getItem(CHAVE_SORTEIO);
    if (!sorteioSalvo) return;

    try {
        const confrontos = JSON.parse(sorteioSalvo);

        confrontos.forEach(confronto => {
            const letra = confronto.chave;
            const timeP2 = confronto.pote2;
            const timeP1 = confronto.pote1;

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
        console.error('Erro ao ler sorteio salvo:', e);
    }
}

function carregarJogosSalvos() {
    const salvos = localStorage.getItem(CHAVE_JOGOS);
    if (!salvos) return;

    try {
        const dados = JSON.parse(salvos);
        estadoLibertadores = { ...estadoLibertadores, ...dados };

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
        console.error('Erro ao carregar dados dos jogos:', e);
    }
}

function calcularClassificadosEAvanço() {
    const chaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const vencedoresOitavas = {};

    chaves.forEach(letra => {
        const placarIda = estadoLibertadores.placares ? estadoLibertadores.placares[`oitavas-${letra}-ida`] : null;
        const placarVolta = estadoLibertadores.placares ? estadoLibertadores.placares[`oitavas-${letra}-volta`] : null;

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

    atualizarConfrontoMataMata('quartas-1', vencedoresOitavas['A'] || 'Venc. A', vencedoresOitavas['C'] || 'Venc. C');
    atualizarConfrontoMataMata('quartas-2', vencedoresOitavas['E'] || 'Venc. E', vencedoresOitavas['G'] || 'Venc. G');
    atualizarConfrontoMataMata('quartas-3', vencedoresOitavas['B'] || 'Venc. B', vencedoresOitavas['D'] || 'Venc. D');
    atualizarConfrontoMataMata('quartas-4', vencedoresOitavas['F'] || 'Venc. F', vencedoresOitavas['H'] || 'Venc. H');

    const vQ1 = calcularVencedorMataMata('quartas-1');
    const vQ2 = calcularVencedorMataMata('quartas-2');
    const vQ3 = calcularVencedorMataMata('quartas-3');
    const vQ4 = calcularVencedorMataMata('quartas-4');

    atualizarConfrontoMataMata('semi-1', vQ1 || 'Venc. Q1', vQ2 || 'Venc. Q2');
    atualizarConfrontoMataMata('semi-2', vQ3 || 'Venc. Q3', vQ4 || 'Venc. Q4');

    const vS1 = calcularVencedorMataMata('semi-1');
    const vS2 = calcularVencedorMataMata('semi-2');

    const cardFinal = document.getElementById('final-jogo');
    if (cardFinal) {
        if (vS1) cardFinal.querySelector('.time.mandante').textContent = vS1;
        if (vS2) cardFinal.querySelector('.time.visitante').textContent = vS2;
    }
}

function atualizarConfrontoMataMata(prefixo, t1, t2) {
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

function calcularVencedorMataMata(prefixo) {
    const placarIda = estadoLibertadores.placares ? estadoLibertadores.placares[`${prefixo}-ida`] : null;
    const placarVolta = estadoLibertadores.placares ? estadoLibertadores.placares[`${prefixo}-volta`] : null;

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
    document.addEventListener('DOMContentLoaded', inicializarTabelaLibertadores);
} else {
    inicializarTabelaLibertadores();
}