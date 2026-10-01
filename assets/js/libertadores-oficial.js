// ==========================================================================
// assets/js/libertadores-oficial.js - QUADRO OFICIAL MATA-MATA LIBERTADORES
// ==========================================================================

const CHAVE_SORTEIO = 'conmebol_libertadores_sorteio_oficial_2026';
const CHAVE_JOGOS = 'conmebol_libertadores_jogos_oficial_2026';

let estadoLibertadores = {
    sorteioAtivo: false,
    placares: {},
    infoJogos: {}
};

async function inicializarTabelaLibertadores() {
    let dadosJson = null;

    // 1. Tenta carregar dados oficiais publicados via JSON
    try {
        const resposta = await fetch('assets/data/dados-mata-mata-libertadores.json?v=' + Date.now());
        if (resposta.ok) {
            dadosJson = await resposta.json();
        }
    } catch (e) {}

    // 2. Se houver dados oficiais no JSON e o sorteio estiver marcado como realizado
    if (dadosJson && dadosJson.sorteioRealizado === true && dadosJson.sorteio) {
        estadoLibertadores.sorteioAtivo = true;
        carregarEstruturaOitavas(dadosJson.sorteio);
        if (dadosJson.jogos) {
            carregarJogosPublicados(dadosJson.jogos);
            calcularClassificadosEAvanço();
        }
        return;
    }

    // 3. Fallback controlado via localStorage apenas se estiver explicitamente ativo
    const sorteioLocal = localStorage.getItem(CHAVE_SORTEIO);
    if (sorteioLocal) {
        try {
            const dadosSorteio = JSON.parse(sorteioLocal);
            if (Array.isArray(dadosSorteio) && dadosSorteio.length > 0) {
                estadoLibertadores.sorteioAtivo = true;
                carregarEstruturaOitavas(dadosSorteio);
                carregarJogosSalvosLocal();
                calcularClassificadosEAvanço();
            }
        } catch (e) {
            console.error('Erro ao ler sorteio local:', e);
        }
    }
}

function carregarEstruturaOitavas(confrontos) {
    if (!Array.isArray(confrontos)) return;

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
}

function carregarJogosPublicados(dadosJogos) {
    estadoLibertadores.placares = dadosJogos.placares || {};
    estadoLibertadores.infoJogos = dadosJogos.infoJogos || {};
    aplicarPlacaresNaTela();
}

function carregarJogosSalvosLocal() {
    const salvos = localStorage.getItem(CHAVE_JOGOS);
    if (!salvos) return;

    try {
        const dados = JSON.parse(salvos);
        estadoLibertadores.placares = dados.placares || {};
        estadoLibertadores.infoJogos = dados.infoJogos || {};
        aplicarPlacaresNaTela();
    } catch (e) {}
}

function aplicarPlacaresNaTela() {
    document.querySelectorAll('.card-jogo').forEach(card => {
        const id = card.id;
        const elM = card.querySelector('.gols-mandante');
        const elV = card.querySelector('.gols-visitante');
        const infoEl = card.querySelector('.info-jogo');

        if (estadoLibertadores.placares && estadoLibertadores.placares[id]) {
            const p = estadoLibertadores.placares[id];
            if (elM && p.m !== null && p.m !== undefined) elM.textContent = p.m;
            if (elV && p.v !== null && p.v !== undefined) elV.textContent = p.v;
        }

        if (estadoLibertadores.infoJogos && estadoLibertadores.infoJogos[id] && infoEl) {
            infoEl.textContent = estadoLibertadores.infoJogos[id];
        }
    });
}

function calcularClassificadosEAvanço() {
    if (!estadoLibertadores.sorteioAtivo) return;

    const chaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const vencedoresOitavas = {};

    chaves.forEach(letra => {
        const placarIda = estadoLibertadores.placares ? estadoLibertadores.placares[`oitavas-${letra}-ida`] : null;
        const placarVolta = estadoLibertadores.placares ? estadoLibertadores.placares[`oitavas-${letra}-volta`] : null;

        const cardIda = document.getElementById(`oitavas-${letra}-ida`);
        if (!cardIda) return;

        const timeP2 = cardIda.querySelector('.time.mandante').textContent;
        const timeP1 = cardIda.querySelector('.time.visitante').textContent;

        if (timeP2.includes('Pote') || timeP1.includes('Pote')) return;

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
                vencedoresOitavas[letra] = timeP1; // Fallback desempate
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