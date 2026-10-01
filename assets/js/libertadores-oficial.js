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
    // 1. Tenta carregar dados do arquivo JSON publicado caso exista
    try {
        const resposta = await fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now());
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson.sorteio) localStorage.setItem(CHAVE_SORTEIO, JSON.stringify(dadosJson.sorteio));
            if (dadosJson.jogos) localStorage.setItem(CHAVE_JOGOS, JSON.stringify(dadosJson.jogos));
        }
    } catch (e) {}

    // 2. Renderiza a tabela e calcula o mata-mata
    carregarEstruturaOitavas();
    carregarJogosSalvos();
    calcularClassificadosEAvanço();
}

function carregarEstruturaOitavas() {
    const sorteioSalvo = localStorage.getItem(CHAVE_SORTEIO);
    if (!sorteioSalvo) return;

    try {
        const confrontos = typeof sorteioSalvo === 'string' ? JSON.parse(sorteioSalvo) : sorteioSalvo;

        confrontos.forEach(confronto => {
            const letra = confronto.chave;
            const timeP2 = confronto.pote2;
            const timeP1 = confronto.pote1;

            const cardIda = document.getElementById(`oitavas-${letra}-ida`);
            if (cardIda && timeP2 && timeP1) {
                cardIda.querySelector('.time.mandante').textContent = timeP2;
                cardIda.querySelector('.time.visitante').textContent = timeP1;
            }

            const cardVolta = document.getElementById(`oitavas-${letra}-volta`);
            if (cardVolta && timeP2 && timeP1) {
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
        const dados = typeof salvos === 'string' ? JSON.parse(salvos) : salvos;
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
            
            const golsP2 = parseInt(placarIda.m, 10) + parseInt(placarVolta.v, 10);
            const golsP1 = parseInt(placarIda.v, 10) + parseInt(placarVolta.m, 10);

            if (golsP1 > golsP2) {
                vencedoresOitavas[letra] = timeP1;
            } else if (golsP2 > golsP1) {
                vencedoresOitavas[letra] = timeP2;
            } else {
                vencedoresOitavas[letra] = timeP1;
            }
        }
    });

    atualizarConfrontoMataMata('quartas-1', vencedoresOitavas['A'] || 'Vencedor A', vencedoresOitavas['C'] || 'Vencedor C');
    atualizarConfrontoMataMata('quartas-2', vencedoresOitavas['E'] || 'Vencedor E', vencedoresOitavas['G'] || 'Vencedor G');
    atualizarConfrontoMataMata('quartas-3', vencedoresOitavas['B'] || 'Vencedor B', vencedoresOitavas['D'] || 'Vencedor D');
    atualizarConfrontoMataMata('quartas-4', vencedoresOitavas['F'] || 'Vencedor F', vencedoresOitavas['H'] || 'Vencedor H');

    const vQ1 = calcularVencedorMataMata('quartas-1');
    const vQ2 = calcularVencedorMataMata('quartas-2');
    const vQ3 = calcularVencedorMataMata('quartas-3');
    const vQ4 = calcularVencedorMataMata('quartas-4');

    atualizarConfrontoMataMata('semi-1', vQ1 || 'Vencedor Q1', vQ2 || 'Vencedor Q2');
    atualizarConfrontoMataMata('semi-2', vQ3 || 'Vencedor Q3', vQ4 || 'Vencedor Q4');

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
    document.addEventListener('DOMContentLoaded', inicializarTabelaLibertadores);
} else {
    inicializarTabelaLibertadores();
}