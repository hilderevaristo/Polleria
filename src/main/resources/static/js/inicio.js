// Efecto scroll navbar: transparente → blanco con animación
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        // Si el scroll es mayor a 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
// --- Animación de contador para tarjetas de estadísticas ---
document.addEventListener("DOMContentLoaded", function() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const counterElement = this.querySelector('.counter');

            // Si el elemento no existe, no hace nada
            if (!counterElement) return;

            const target = parseFloat(counterElement.getAttribute('data-target'));
            const isDecimal = counterElement.hasAttribute('data-decimal');
            const duration = 500; // 1 segundos
            let startTime = null;

            // Previene que la animación se reinicie si ya está corriendo
            if (counterElement.classList.contains('animating')) return;
            counterElement.classList.add('animating');

            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                let currentValue = progress * target;

                if (isDecimal) {
                    counterElement.innerText = currentValue.toFixed(1);
                } else {
                    counterElement.innerText = Math.floor(currentValue);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = isDecimal ? target.toFixed(1) : target;
                    // Al terminar, quitamos la clase para que pueda volver a animarse al hacer hover nuevamente
                    counterElement.classList.remove('animating');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    });
});