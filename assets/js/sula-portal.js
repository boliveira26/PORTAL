document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/noticias-sulamericana.json?v=' + Date.now())
        .then(r => r.json())
        .then(data => {
            const heroEl = document.getElementById('hero-sula-destaque');
            const gridEl = document.getElementById('grid-noticias-sula');

            // Renderiza Destaque
            const hero = data.manchete_hero;
            if (heroEl && hero) {
                heroEl.style.cursor = 'pointer';
                heroEl.onclick = () => location.href = `noticia.html?id=${hero.id}`;
                heroEl.innerHTML = `
                    <div class="imagem-hero-bg" style="background-image: url('${hero.imagem}');">
                        <div class="mascara-protecao-sula"></div>
                        <div class="painel-conteudo-hero">
                            <span class="tag-secao-azul">${hero.categoria || 'SUL-AMERICANA'}</span>
                            <h2>${hero.titulo}</h2>
                            <p class="resumo-hero-txt">${hero.resumo || ''}</p>
                        </div>
                    </div>
                `;
            }

            // Renderiza as 4 primeiras notícias empilhadas
            if (gridEl && data.ultimas_noticias) {
                const quatroPrimeiras = data.ultimas_noticias.slice(0, 4);
                gridEl.innerHTML = quatroPrimeiras.map(item => `
                    <article class="card-noticia-item" onclick="location.href='noticia.html?id=${item.id}'" title="Clique para ler">
                        <div class="thumb-quadrada" style="background-image: url('${item.imagem}');"></div>
                        <div class="info-noticia-conteudo">
                            <span class="categoria-azul">${item.categoria || 'SUL-AMERICANA'}</span>
                            <h4>${item.titulo}</h4>
                            <span class="data-noticia-txt">${item.data_publicacao || 'Oficial'}</span>
                        </div>
                    </article>
                `).join('');
            }
        })
        .catch(err => console.error('Erro ao carregar notícias da Sula:', err));
});