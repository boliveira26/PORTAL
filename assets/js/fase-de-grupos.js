// ==========================================================================
// portal/assets/js/fase-de-grupos.js - PORTAL VIEWER COM DESEMPATE H2H
// ==========================================================================

const BANCO_PORTAL_COMPLETO = {
    "A": {
        times: ["Atlético Mineiro", "Flamengo", "Bolívar", "Sporting Cristal"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "DOM 06/09/2026 ALBERTO GALLARDO 19:30", m: "Sporting Cristal", v: "Bolívar", gm: 0, gv: 0 },
                { data: "DOM 06/09/2026 ARENA MRV 21:00", m: "Atlético Mineiro", v: "Flamengo", gm: 2, gv: 0 }
            ],
            2: [
                { data: "QUA 09/09/2026 MARACANÃ 21:30", m: "Flamengo", v: "Sporting Cristal", gm: 1, gv: 0 },
                { data: "QUI 10/09/2026 HERNANDO SILES 19:30", m: "Bolívar", v: "Atlético Mineiro", gm: 1, gv: 4 }
            ],
            3: [
                { data: "DOM 13/09/2026 ARENA MRV 16:00", m: "Atlético Mineiro", v: "Sporting Cristal", gm: 2, gv: 0 },
                { data: "DOM 13/09/2026 HERNANDO SILES 21:30", m: "Bolívar", v: "Flamengo", gm: 0, gv: 1 }
            ],
            4: [
                { data: "QUA 23/09/2026 ARENA MRV 18:30", m: "Atlético Mineiro", v: "Bolívar", gm: 1, gv: 2 },
                { data: "QUA 23/09/2026 ALBERTO GALLARDO 21:00", m: "Sporting Cristal", v: "Flamengo", gm: 1, gv: 2 }
            ],
            5: [
                { data: "DOM 27/09/2026 ALBERTO GALLARDO 18:30", m: "Sporting Cristal", v: "Atlético Mineiro", gm: 1, gv: 2 },
                { data: "DOM 27/09/2026 MARACANÃ 19:00", m: "Flamengo", v: "Bolívar", gm: 2, gv: 2 }
            ],
            6: [
                { data: "QUA 30/09/2026 HERNANDO SILES 21:00", m: "Bolívar", v: "Sporting Cristal", gm: null, gv: null },
                { data: "QUA 30/09/2026 MARACANÃ 21:00", m: "Flamengo", v: "Atlético Mineiro", gm: null, gv: null }
            ]
        }
    },
    "B": {
        times: ["Universitario", "CRB", "River Plate", "Libertad"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "SÁB 05/09/2026 MONUMENTAL U 17:00", m: "Universitario", v: "Libertad", gm: 0, gv: 0 },
                { data: "SÁB 05/09/2026 REI PELÉ 19:00", m: "CRB", v: "River Plate", gm: 2, gv: 2 }
            ],
            2: [
                { data: "TER 08/09/2026 DEFENSORES DEL CHACO 19:00", m: "Libertad", v: "CRB", gm: 1, gv: 2 },
                { data: "TER 08/09/2026 MONUMENTAL DE NÚÑEZ 20:00", m: "River Plate", v: "Universitario", gm: 0, gv: 2 }
            ],
            3: [
                { data: "SÁB 12/09/2026 REI PELÉ 17:00", m: "CRB", v: "Universitario", gm: 0, gv: 0 },
                { data: "SEG 14/09/2026 DEFENSORES DEL CHACO 19:30", m: "Libertad", v: "River Plate", gm: 1, gv: 1 }
            ],
            4: [
                { data: "TER 22/09/2026 MONUMENTAL U 19:30", m: "Universitario", v: "River Plate", gm: 1, gv: 3 },
                { data: "TER 22/09/2026 REI PELÉ 20:30", m: "CRB", v: "Libertad", gm: 4, gv: 1 }
            ],
            5: [
                { data: "DOM 27/09/2026 MONUMENTAL U 13:00", m: "Universitario", v: "CRB", gm: 4, gv: 1 },
                { data: "DOM 27/09/2026 MONUMENTAL DE NÚÑEZ 13:30", m: "River Plate", v: "Libertad", gm: 2, gv: 3 }
            ],
            6: [
                { data: "QUA 30/09/2026 DEFENSORES DEL CHACO 19:30", m: "Libertad", v: "Universitario", gm: null, gv: null },
                { data: "QUA 30/09/2026 MONUMENTAL DE NÚÑEZ 19:30", m: "River Plate", v: "CRB", gm: null, gv: null }
            ]
        }
    },
    "C": {
        times: ["Junior Barranquilla", "Olimpia", "Jorge Wilstermann", "Palmeiras"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "SÁB 05/09/2026 METROPOLITANO ROBERTO MELÉNDEZ 18:00", m: "Junior Barranquilla", v: "Olimpia", gm: 2, gv: 1 },
                { data: "SÁB 05/09/2026 FÉLIX CAPRILES 21:30", m: "Jorge Wilstermann", v: "Palmeiras", gm: 1, gv: 0 }
            ],
            2: [
                { data: "TER 08/09/2026 MANUEL FERREIRA 19:30", m: "Olimpia", v: "Jorge Wilstermann", gm: 1, gv: 1 },
                { data: "TER 08/09/2026 NUBANK PARQUE 21:00", m: "Palmeiras", v: "Junior Barranquilla", gm: 1, gv: 1 }
            ],
            3: [
                { data: "SÁB 12/09/2026 FÉLIX CAPRILES 18:00", m: "Jorge Wilstermann", v: "Junior Barranquilla", gm: 0, gv: 0 },
                { data: "SÁB 12/09/2026 MANUEL FERREIRA 21:00", m: "Olimpia", v: "Palmeiras", gm: 2, gv: 1 }
            ],
            4: [
                { data: "QUA 23/09/2026 METROPOLITANO ROBERTO MELÉNDEZ 19:00", m: "Junior Barranquilla", v: "Palmeiras", gm: 1, gv: 0 },
                { data: "QUA 23/09/2026 FÉLIX CAPRILES 20:00", m: "Jorge Wilstermann", v: "Olimpia", gm: 2, gv: 2 }
            ],
            5: [
                { data: "DOM 27/09/2026 METROPOLITANO ROBERTO MELÉNDEZ 15:30", m: "Junior Barranquilla", v: "Jorge Wilstermann", gm: 3, gv: 0 },
                { data: "DOM 27/09/2026 NUBANK PARQUE 16:00", m: "Palmeiras", v: "Olimpia", gm: 2, gv: 2 }
            ],
            6: [
                { data: "QUI 01/10/2026 MANUEL FERREIRA 21:00", m: "Olimpia", v: "Junior Barranquilla", gm: null, gv: null },
                { data: "QUI 01/10/2026 NUBANK PARQUE 21:00", m: "Palmeiras", v: "Jorge Wilstermann", gm: null, gv: null }
            ]
        }
    },
    "D": {
        times: ["Barcelona SC", "Boca Juniors", "Corinthians", "Universidad Católica"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "SÁB 05/09/2026 SAN CARLOS DE APOQUINDO 18:30", m: "Universidad Católica", v: "Corinthians", gm: 2, gv: 2 },
                { data: "SÁB 05/09/2026 MONUMENTAL ISIDRO ROMERO CARBO 20:00", m: "Barcelona SC", v: "Boca Juniors", gm: 3, gv: 2 }
            ],
            2: [
                { data: "QUA 09/09/2026 NEO QUÍMICA ARENA 21:00", m: "Corinthians", v: "Barcelona SC", gm: 1, gv: 0 },
                { data: "QUI 10/09/2026 LA BOMBONERA 19:00", m: "Boca Juniors", v: "Universidad Católica", gm: 1, gv: 0 }
            ],
            3: [
                { data: "DOM 13/09/2026 MONUMENTAL ISIDRO ROMERO CARBO 16:30", m: "Barcelona SC", v: "Universidad Católica", gm: 1, gv: 0 },
                { data: "DOM 13/09/2026 NEO QUÍMICA ARENA 20:00", m: "Corinthians", v: "Boca Juniors", gm: 0, gv: 0 }
            ],
            4: [
                { data: "QUA 23/09/2026 SAN CARLOS DE APOQUINDO 19:30", m: "Universidad Católica", v: "Boca Juniors", gm: 2, gv: 3 },
                { data: "QUA 23/09/2026 MONUMENTAL ISIDRO ROMERO CARBO 21:30", m: "Barcelona SC", v: "Corinthians", gm: 1, gv: 0 }
            ],
            5: [
                { data: "DOM 27/09/2026 SAN CARLOS DE APOQUINDO 18:00", m: "Universidad Católica", v: "Barcelona SC", gm: 4, gv: 3 },
                { data: "DOM 27/09/2026 LA BOMBONERA 21:00", m: "Boca Juniors", v: "Corinthians", gm: 2, gv: 2 }
            ],
            6: [
                { data: "QUA 30/09/2026 NEO QUÍMICA ARENA 21:30", m: "Corinthians", v: "Universidad Católica", gm: null, gv: null },
                { data: "QUA 30/09/2026 LA BOMBONERA 21:30", m: "Boca Juniors", v: "Barcelona SC", gm: null, gv: null }
            ]
        }
    },
    "E": {
        times: ["Bahia", "Atlético Nacional", "Independiente del Valle", "Nacional"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "DOM 06/09/2026 ATANASIO GIRARDOT 18:30", m: "Atlético Nacional", v: "Independiente del Valle", gm: 3, gv: 0 },
                { data: "DOM 06/09/2026 ARENA FONTE NOVA 19:00", m: "Bahia", v: "Nacional", gm: 2, gv: 0 }
            ],
            2: [
                { data: "QUA 09/09/2026 BANCO GUAYAQUIL 19:00", m: "Independiente del Valle", v: "Bahia", gm: 0, gv: 2 },
                { data: "QUA 09/09/2026 GRAN PARQUE CENTRAL 19:30", m: "Nacional", v: "Atlético Nacional", gm: 0, gv: 1 }
            ],
            3: [
                { data: "DOM 13/09/2026 ARENA FONTE NOVA 17:00", m: "Bahia", v: "Atlético Nacional", gm: 0, gv: 0 },
                { data: "DOM 13/09/2026 BANCO GUAYAQUIL 21:00", m: "Independiente del Valle", v: "Nacional", gm: 2, gv: 1 }
            ],
            4: [
                { data: "QUI 24/09/2026 ATANASIO GIRARDOT 21:00", m: "Atlético Nacional", v: "Nacional", gm: 0, gv: 5 },
                { data: "QUI 24/09/2026 ARENA FONTE NOVA 21:30", m: "Bahia", v: "Independiente del Valle", gm: 4, gv: 0 }
            ],
            5: [
                { data: "DOM 27/09/2026 ATANASIO GIRARDOT 20:30", m: "Atlético Nacional", v: "Bahia", gm: 1, gv: 1 },
                { data: "DOM 27/09/2026 GRAN PARQUE CENTRAL 21:30", m: "Nacional", v: "Independiente del Valle", gm: 1, gv: 2 }
            ],
            6: [
                { data: "QUA 30/09/2026 BANCO GUAYAQUIL 20:00", m: "Independiente del Valle", v: "Atlético Nacional", gm: null, gv: null },
                { data: "QUA 30/09/2026 GRAN PARQUE CENTRAL 20:00", m: "Nacional", v: "Bahia", gm: null, gv: null }
            ]
        }
    },
    "F": {
        times: ["Estudiantes", "Red Bull Bragantino", "Peñarol", "Cerro Porteño"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "DOM 06/09/2026 CÍCERO DE SOUZA MARQUES 20:00", m: "Red Bull Bragantino", v: "Estudiantes", gm: 0, gv: 3 },
                { data: "DOM 06/09/2026 LA NUEVA OLLA 20:30", m: "Cerro Porteño", v: "Peñarol", gm: 1, gv: 2 }
            ],
            2: [
                { data: "QUA 09/09/2026 LUIS HIRSCHI 20:00", m: "Estudiantes", v: "Cerro Porteño", gm: 3, gv: 0 },
                { data: "QUI 10/09/2026 CAMPEÓN DEL SIGLO 21:00", m: "Peñarol", v: "Red Bull Bragantino", gm: 0, gv: 1 }
            ],
            3: [
                { data: "SEG 14/09/2026 LUIS HIRSCHI 21:00", m: "Estudiantes", v: "Peñarol", gm: 2, gv: 1 },
                { data: "SEG 14/09/2026 LA NUEVA OLLA 20:00", m: "Cerro Porteño", v: "Red Bull Bragantino", gm: 1, gv: 1 }
            ],
            4: [
                { data: "TER 22/09/2026 CÍCERO DE SOUZA MARQUES 20:00", m: "Red Bull Bragantino", v: "Peñarol", gm: 2, gv: 2 },
                { data: "TER 22/09/2026 LA NUEVA OLLA 21:00", m: "Cerro Porteño", v: "Estudiantes", gm: 2, gv: 4 }
            ],
            5: [
                { data: "DOM 27/09/2026 CÍCERO DE SOUZA MARQUES 19:30", m: "Red Bull Bragantino", v: "Cerro Porteño", gm: 6, gv: 1 },
                { data: "DOM 27/09/2026 CAMPEÓN DEL SIGLO 20:00", m: "Peñarol", v: "Estudiantes", gm: 3, gv: 2 }
            ],
            6: [
                { data: "QUI 01/10/2026 LUIS HIRSCHI 21:30", m: "Estudiantes", v: "Red Bull Bragantino", gm: null, gv: null },
                { data: "QUI 01/10/2026 CAMPEÓN DEL SIGLO 21:30", m: "Peñarol", v: "Cerro Porteño", gm: null, gv: null }
            ]
        }
    },
    "G": {
        times: ["Colo-Colo", "Racing Club", "Mirassol", "Deportivo Táchira"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "DOM 06/09/2026 PUEBLO NUEVO 21:30", m: "Deportivo Táchira", v: "Colo-Colo", gm: 0, gv: 0 },
                { data: "DOM 06/09/2026 MAIÃO 22:00", m: "Mirassol", v: "Racing Club", gm: 1, gv: 1 }
            ],
            2: [
                { data: "QUI 10/09/2026 MONUMENTAL DAVID ARELLANO 20:00", m: "Colo-Colo", v: "Mirassol", gm: 3, gv: 0 },
                { data: "QUI 10/09/2026 PRESIDENTE PERÓN 20:30", m: "Racing Club", v: "Deportivo Táchira", gm: 3, gv: 2 }
            ],
            3: [
                { data: "DOM 13/09/2026 MAIÃO 20:30", m: "Mirassol", v: "Deportivo Táchira", gm: 3, gv: 0 },
                { data: "DOM 13/09/2026 MONUMENTAL DAVID ARELLANO 22:00", m: "Colo-Colo", v: "Racing Club", gm: 1, gv: 1 }
            ],
            4: [
                { data: "TER 22/09/2026 PUEBLO NUEVO 18:30", m: "Deportivo Táchira", v: "Racing Club", gm: 0, gv: 4 },
                { data: "QUI 24/09/2026 MAIÃO 20:30", m: "Mirassol", v: "Colo-Colo", gm: 2, gv: 0 }
            ],
            5: [
                { data: "DOM 27/09/2026 PUEBLO NUEVO 17:00", m: "Deportivo Táchira", v: "Mirassol", gm: 2, gv: 0 },
                { data: "DOM 27/09/2026 PRESIDENTE PERÓN 17:30", m: "Racing Club", v: "Colo-Colo", gm: 0, gv: 3 }
            ],
            6: [
                { data: "QUI 01/10/2026 MONUMENTAL DAVID ARELLANO 20:00", m: "Colo-Colo", v: "Deportivo Táchira", gm: null, gv: null },
                { data: "QUI 01/10/2026 PRESIDENTE PERÓN 20:00", m: "Racing Club", v: "Mirassol", gm: null, gv: null }
            ]
        }
    },
    "H": {
        times: ["LDU Quito", "Caracas", "Fluminense", "The Strongest"],
        rodadaExibida: 6,
        rodadas: {
            1: [
                { data: "SÁB 05/09/2026 HERNANDO SILES 21:00", m: "The Strongest", v: "Fluminense", gm: 1, gv: 2 },
                { data: "SÁB 05/09/2026 OLÍMPICO DE LA UCV 22:00", m: "Caracas", v: "LDU Quito", gm: 0, gv: 1 }
            ],
            2: [
                { data: "TER 08/09/2026 MARACANÃ 21:30", m: "Fluminense", v: "Caracas", gm: 1, gv: 2 },
                { data: "TER 08/09/2026 CASABLANCA 22:00", m: "LDU Quito", v: "The Strongest", gm: 3, gv: 0 }
            ],
            3: [
                { data: "SÁB 12/09/2026 OLÍMPICO DE LA UCV 20:30", m: "Caracas", v: "The Strongest", gm: 2, gv: 0 },
                { data: "SÁB 12/09/2026 MARACANÃ 21:30", m: "Fluminense", v: "LDU Quito", gm: 0, gv: 0 }
            ],
            4: [
                { data: "TER 22/09/2026 HERNANDO SILES 19:00", m: "The Strongest", v: "LDU Quito", gm: 2, gv: 5 },
                { data: "TER 22/09/2026 OLÍMPICO DE LA UCV 21:30", m: "Caracas", v: "Fluminense", gm: 1, gv: 1 }
            ],
            5: [
                { data: "DOM 27/09/2026 HERNANDO SILES 15:00", m: "The Strongest", v: "Caracas", gm: 2, gv: 0 },
                { data: "DOM 27/09/2026 CASABLANCA 16:30", m: "LDU Quito", v: "Fluminense", gm: 2, gv: 1 }
            ],
            6: [
                { data: "QUI 01/10/2026 MARACANÃ 19:30", m: "Fluminense", v: "The Strongest", gm: null, gv: null },
                { data: "QUI 01/10/2026 CASABLANCA 19:30", m: "LDU Quito", v: "Caracas", gm: null, gv: null }
            ]
        }
    }
};

let bancoDadosPortal = BANCO_PORTAL_COMPLETO;

async function inicializarFaseDeGruposPortal() {
    try {
        const resposta = await fetch('assets/data/dados-fase-de-grupos.json?v=' + Date.now());
        if (resposta.ok) {
            bancoDadosPortal = await resposta.json();
        }
    } catch (e) {}

    renderizarPainelPublico();
}

function renderizarPainelPublico() {
    const container = document.getElementById('grade-grupos-container');
    if (!container || !bancoDadosPortal) return;

    container.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    letras.forEach(letra => {
        const dadosGrupo = bancoDadosPortal[letra];
        if (!dadosGrupo) return;

        const rodadaAtiva = dadosGrupo.rodadaExibida || 6;
        const tabelaCalculada = calcularTabelaComDesempateOficialPortal(letra);

        const card = document.createElement('article');
        card.className = 'linha-grupo-tv';
        card.id = `card-grupo-${letra}`;

        // TABELA (LADO ESQUERDO)
        let linhasTabelaHtml = '';
        tabelaCalculada.forEach(t => {
            const corNumero = (t.pos <= 2) ? 'verde' : 'vermelho';
            linhasTabelaHtml += `
                <tr>
                    <td class="td-time-dupla">
                        <span class="num-pos-tv ${corNumero}">${t.pos}</span>
                        <span class="nome-time-txt">${t.nome}</span>
                    </td>
                    <td class="col-pontos-tv">${t.pts}</td>
                    <td>${t.j}</td>
                    <td>${t.v}</td>
                    <td>${t.e}</td>
                    <td>${t.d}</td>
                    <td>${t.gp}</td>
                    <td>${t.gs}</td>
                    <td>${t.sg > 0 ? '+' + t.sg : t.sg}</td>
                    <td>${t.perc}</td>
                </tr>
            `;
        });

        // JOGOS DA RODADA (LADO DIREITO)
        const jogosDaRodada = (dadosGrupo.rodadas && dadosGrupo.rodadas[rodadaAtiva]) ? dadosGrupo.rodadas[rodadaAtiva] : [];
        let jogosHtml = '';

        if (jogosDaRodada.length > 0) {
            jogosDaRodada.forEach(j => {
                const temPlacar = (j.gm !== null && j.gm !== undefined && j.gv !== null && j.gv !== undefined);
                const gmTexto = temPlacar ? j.gm : '-';
                const gvTexto = temPlacar ? j.gv : '-';

                jogosHtml += `
                    <div class="card-jogo-item">
                        <div class="data-estadio-linha">${j.data}</div>
                        <div class="confronto-linha-placar">
                            <span class="time-box-txt mandante">${j.m}</span>
                            <div class="bloco-gols-duelo">
                                <span class="badge-gol-unitario">${gmTexto}</span>
                                <span class="x-duelo">X</span>
                                <span class="badge-gol-unitario">${gvTexto}</span>
                            </div>
                            <span class="time-box-txt visitante">${j.v}</span>
                        </div>
                    </div>
                `;
            });
        }

        card.innerHTML = `
            <!-- TABELA -->
            <div class="painel-tabela-tv">
                <table class="tabela-tv">
                    <thead>
                        <tr>
                            <th class="th-time">GRUPO ${letra}</th>
                            <th>PTS</th>
                            <th>J</th>
                            <th>V</th>
                            <th>E</th>
                            <th>D</th>
                            <th>GP</th>
                            <th>GS</th>
                            <th>SG</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasTabelaHtml}
                    </tbody>
                </table>
            </div>

            <!-- JOGOS DA RODADA & SELETOR 100% ESTICADO -->
            <div class="painel-jogos-tv">
                <div class="header-jogos-tv">
                    <div class="controle-rodada-setas">
                        <button type="button" class="btn-seta-rodada" onclick="avancarVoltarRodadaPublico('${letra}', -1)" title="Rodada Anterior">&#8249;</button>
                        <span class="txt-rodada-centro">${rodadaAtiva}ª Rodada</span>
                        <button type="button" class="btn-seta-rodada" onclick="avancarVoltarRodadaPublico('${letra}', 1)" title="Próxima Rodada">&#8250;</button>
                    </div>
                </div>
                <div class="lista-jogos-confrontos">
                    ${jogosHtml}
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function calcularTabelaComDesempateOficialPortal(letra) {
    const dadosGrupo = bancoDadosPortal[letra];
    const stats = {};
    const todosJogos = [];

    dadosGrupo.times.forEach(time => {
        stats[time] = {
            nome: time,
            pts: 0, j: 0, v: 0, e: 0, d: 0,
            gp: 0, gs: 0, sg: 0,
            golsCasa: 0, golsFora: 0, ptsFora: 0,
            perc: '0,00%'
        };
    });

    for (let r = 1; r <= 6; r++) {
        const jogos = (dadosGrupo.rodadas && dadosGrupo.rodadas[r]) ? dadosGrupo.rodadas[r] : [];
        jogos.forEach(j => {
            if (j.gm !== null && j.gm !== undefined && j.gv !== null && j.gv !== undefined) {
                const gm = parseInt(j.gm, 10);
                const gv = parseInt(j.gv, 10);

                if (!isNaN(gm) && !isNaN(gv)) {
                    todosJogos.push({ m: j.m, v: j.v, gm, gv });

                    const tm = stats[j.m];
                    const tv = stats[j.v];

                    if (tm && tv) {
                        tm.j++;
                        tv.j++;
                        tm.gp += gm;
                        tm.gs += gv;
                        tv.gp += gv;
                        tv.gs += gm;

                        tm.golsCasa += gm;
                        tv.golsFora += gv;

                        if (gm > gv) {
                            tm.v++;
                            tm.pts += 3;
                            tv.d++;
                        } else if (gm < gv) {
                            tv.v++;
                            tv.pts += 3;
                            tv.ptsFora += 3;
                            tm.d++;
                        } else {
                            tm.e++;
                            tv.e++;
                            tm.pts += 1;
                            tv.pts += 1;
                            tv.ptsFora += 1;
                        }
                    }
                }
            }
        });
    }

    const lista = Object.values(stats).map(t => {
        t.sg = t.gp - t.gs;
        const pontosPossiveis = t.j * 3;
        const p = pontosPossiveis > 0 ? ((t.pts / pontosPossiveis) * 100).toFixed(2) : '0.00';
        t.perc = p.replace('.', ',') + '%';
        return t;
    });

    const gruposPorPontos = {};
    lista.forEach(t => {
        if (!gruposPorPontos[t.pts]) gruposPorPontos[t.pts] = [];
        gruposPorPontos[t.pts].push(t);
    });

    const pontuacoes = Object.keys(gruposPorPontos).map(Number).sort((a, b) => b - a);
    let listaOrdenada = [];

    pontuacoes.forEach(pts => {
        const empatados = gruposPorPontos[pts];
        if (empatados.length === 1) {
            listaOrdenada.push(empatados[0]);
        } else if (empatados.length === 2) {
            empatados.sort((a, b) => resolverEmpateDuplo(a, b, todosJogos));
            listaOrdenada.push(...empatados);
        } else if (empatados.length === 3) {
            empatados.sort((a, b) => resolverEmpateTriplo(a, b, empatados, todosJogos));
            listaOrdenada.push(...empatados);
        } else if (empatados.length === 4) {
            empatados.sort((a, b) => resolverEmpateQuadruplo(a, b));
            listaOrdenada.push(...empatados);
        }
    });

    listaOrdenada.forEach((item, index) => item.pos = index + 1);
    return listaOrdenada;
}

function resolverEmpateDuplo(a, b, jogos) {
    if (b.sg !== a.sg) return b.sg - a.sg;
    const ptsH2H_A = calcularPontosH2H(a.nome, b.nome, jogos);
    const ptsH2H_B = calcularPontosH2H(b.nome, a.nome, jogos);
    if (ptsH2H_B !== ptsH2H_A) return ptsH2H_B - ptsH2H_A;
    if (b.gp !== a.gp) return b.gp - a.gp;
    if (b.v !== a.v) return b.v - a.v;
    if (a.gs !== b.gs) return a.gs - b.gs;
    if (b.golsFora !== a.golsFora) return b.golsFora - a.golsFora;
    if (b.golsCasa !== a.golsCasa) return b.golsCasa - a.golsCasa;
    return a.nome.localeCompare(b.nome);
}

function resolverEmpateTriplo(a, b, trio, jogos) {
    const nomes = trio.map(t => t.nome);
    const mini = {};
    nomes.forEach(n => mini[n] = { pts: 0, gp: 0, gs: 0, sg: 0, golsFora: 0 });

    jogos.forEach(j => {
        if (nomes.includes(j.m) && nomes.includes(j.v)) {
            mini[j.m].gp += j.gm; mini[j.m].gs += j.gv;
            mini[j.v].gp += j.gv; mini[j.v].gs += j.gm;
            mini[j.v].golsFora += j.gv;
            if (j.gm > j.gv) mini[j.m].pts += 3;
            else if (j.gm < j.gv) mini[j.v].pts += 3;
            else { mini[j.m].pts += 1; mini[j.v].pts += 1; }
        }
    });
    nomes.forEach(n => mini[n].sg = mini[n].gp - mini[n].gs);

    if (mini[b.nome].pts !== mini[a.nome].pts) return mini[b.nome].pts - mini[a.nome].pts;
    if (mini[b.nome].sg !== mini[a.nome].sg) return mini[b.nome].sg - mini[a.nome].sg;
    if (mini[b.nome].gp !== mini[a.nome].gp) return mini[b.nome].gp - mini[a.nome].gp;
    if (mini[b.nome].golsFora !== mini[a.nome].golsFora) return mini[b.nome].golsFora - mini[a.nome].golsFora;

    if (b.sg !== a.sg) return b.sg - a.sg;
    if (b.gp !== a.gp) return b.gp - a.gp;
    return a.nome.localeCompare(b.nome);
}

function resolverEmpateQuadruplo(a, b) {
    if (b.sg !== a.sg) return b.sg - a.sg;
    if (b.golsFora !== a.golsFora) return b.golsFora - a.golsFora;
    if (b.golsCasa !== a.golsCasa) return b.golsCasa - a.golsCasa;
    if (b.ptsFora !== a.ptsFora) return b.ptsFora - a.ptsFora;
    return a.nome.localeCompare(b.nome);
}

function calcularPontosH2H(time1, time2, jogos) {
    let pts = 0;
    jogos.forEach(j => {
        if (j.m === time1 && j.v === time2) {
            if (j.gm > j.gv) pts += 3;
            else if (j.gm === j.gv) pts += 1;
        } else if (j.m === time2 && j.v === time1) {
            if (j.gv > j.gm) pts += 3;
            else if (j.gv === j.gm) pts += 1;
        }
    });
    return pts;
}

window.avancarVoltarRodadaPublico = function(letra, direcao) {
    if (bancoDadosPortal && bancoDadosPortal[letra]) {
        let rodadaAtual = bancoDadosPortal[letra].rodadaExibida || 6;
        rodadaAtual += direcao;

        if (rodadaAtual < 1) rodadaAtual = 6;
        if (rodadaAtual > 6) rodadaAtual = 1;

        bancoDadosPortal[letra].rodadaExibida = rodadaAtual;
        renderizarPainelPublico();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFaseDeGruposPortal);
} else {
    inicializarFaseDeGruposPortal();
}