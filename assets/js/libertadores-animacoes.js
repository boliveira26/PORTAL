// ==========================================================================
// assets/js/libertadores-animacoes.js - MOTOR DE ANIMAÇÕES 3D E CARROSSEL
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    iniciarContadorAnimado();
    iniciarEfeito3DTilt();
});

// 1. CARROSSEL DE TODOS OS GRUPOS (DESLIZAMENTO SUAVE)
function deslizarGrupos(direcao) {
    const trilha = document.getElementById('trilha-todos-grupos');
    if (!trilha) return;
    const larguraCard = 315; // Largura do card + gap
    trilha.scrollBy({ left: direcao * larguraCard, behavior: 'smooth' });
}

// 2. CONTADORES NUMÉRICOS ANIMADOS VIA INTERSECTION OBSERVER
function iniciarContadorAnimado() {
    const elementosNumero = document.querySelectorAll('.stat-numero[data-valor]');
    if (!elementosNumero.length) return;

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const el = entrada.target;
                const valorFinal = parseInt(el.getAttribute('data-valor'), 10);
                animarNumero(el, 0, valorFinal, 1800);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    elementosNumero.forEach(el => observador.observe(el));
}

function animarNumero(elemento, inicio, fim, duracao) {
    let tempoInicio = null;

    function frame(tempoAtual) {
        if (!tempoInicio) tempoInicio = tempoAtual;
        const progresso = Math.min((tempoAtual - tempoInicio) / duracao, 1);
        // Efeito Ease-Out Cúbico para desacelerar no final
        const easeOut = 1 - Math.pow(1 - progresso, 3);
        const valorAtual = Math.floor(inicio + (fim - inicio) * easeOut);
        
        elemento.textContent = valorAtual;

        if (progresso < 1) {
            requestAnimationFrame(frame);
        } else {
            elemento.textContent = fim;
        }
    }

    requestAnimationFrame(frame);
}

// 3. EFEITO 3D TILT TÁTIL NOS CARDS PRINCIPAIS
function iniciarEfeito3DTilt() {
    const cards = document.querySelectorAll('.card-3d-tilt');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centroX = rect.width / 2;
            const centroY = rect.height / 2;
            
            // Ângulo de inclinação sutil e elegante (máximo 6 graus)
            const rotX = -((y - centroY) / centroY) * 6;
            const rotY = ((x - centroX) / centroX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}