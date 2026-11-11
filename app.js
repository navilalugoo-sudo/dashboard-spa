document.addEventListener('DOMContentLoaded', () => {
    // 1. menu sidebar colapsable en movil (fase 3)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // FASE 4: modo oscuro nativo
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }

    // ZONA 3: Control del drawer (Panel Deslizante)
    const openDrawerBtn = document.getElementById('openDrawerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const configDrawer = document.getElementById('configDrawer');

    const openDrawer = () => configDrawer.classList.add('open');
    const closeDrawer = () => configDrawer.classList.remove('open');

    if (openDrawerBtn) openDrawerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
    });
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

    // Formulario dentro del drawer y gestion del estado loading (Fase 4)
    const configForm = document.getElementById('configForm');
    if (configForm) {
        configForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = configForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Guardando...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                closeDrawer();
                alert('Parametros actualizados con exito');
            }, 1500);
        });
    }

    // ZONA 3: ventana modal para acciones criticas
    const openModalBtn = document.getElementById('openModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const confirmActionBtn = document.getElementById('confirmActionBtn');
    const confirmModal = document.getElementById('confirmModal');

    const openModal = () => confirmModal.classList.add('open');
    const closeModal = () => confirmModal.classList.remove('open');

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

    if (confirmActionBtn) {
        confirmActionBtn.addEventListener('click', () => {
            confirmActionBtn.disabled = true;
            confirmActionBtn.textContent = 'Reiniciando...';

            setTimeout(() => {
                confirmActionBtn.disabled = false;
                confirmActionBtn.textContent = 'Sí, Reiniciar';
                closeModal();
                alert('Instancia reiniciada correctamente');
            }, 2000);
        });
    }

    // FASE 5: Atajo de teclado escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (confirmModal && confirmModal.classList.contains('open')) {
                closeModal();
            }
            if (configDrawer && configDrawer.classList.contains('open')) {
                closeDrawer();
            }
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
});