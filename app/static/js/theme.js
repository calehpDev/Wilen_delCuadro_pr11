const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '☀️';
}

if (btnTheme) {
    btnTheme.addEventListener('click', (e) => {
        // Función que realiza el cambio de estado de tema
        const toggleTheme = () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');

            if (isDark) {
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        };

        // Si el navegador no soporta View Transitions API, hace el cambio directo
        if (!document.startViewTransition) {
            toggleTheme();
            return;
        }

        // Obtener la posición exacta del clic para centrar el círculo
        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Iniciar la transición nativa
        const transition = document.startViewTransition(() => {
            toggleTheme();
        });

        // Ejecutar el clip-path animado
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];
            document.documentElement.animate(
                { clipPath: clipPath },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    });
}