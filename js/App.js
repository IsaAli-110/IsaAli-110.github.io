class App {
    constructor() {
        this.router = new Router();
        this.authView = new AuthView(this.router);
        this.homeView = new HomeView();
        this.modelsView = new ModelsView();
        this.configuratorView = new ConfiguratorView();
        this.heritageView = new HeritageView();
        this.bookingView = new BookingView();
        this.profileView = new ProfileView(this.router);
        
        this.setupNavLinks();
        
        // Start the app with login view
        this.router.navigate('login');
        this.setupGlobalObserver();
    }

    setupNavLinks() {
        const navLinks = document.querySelectorAll('[data-route]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.router.navigate(route);
            });
        });
    }

    setupGlobalObserver() {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const counter = entry.target.querySelector('.hud-value');
                    if (counter && !counter.dataset.animated && this.homeView) {
                        this.homeView.animateValue(counter, 0, parseFloat(counter.getAttribute('data-target')), 2000);
                        counter.dataset.animated = true;
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
