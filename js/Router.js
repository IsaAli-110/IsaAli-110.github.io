class Router {
    constructor() {
        this.views = {
            login: document.getElementById('login-view'),
            register: document.getElementById('register-view'),
            home: document.getElementById('home-view'),
            models: document.getElementById('models-view'),
            configurator: document.getElementById('configurator-view'),
            heritage: document.getElementById('heritage-view'),
            booking: document.getElementById('booking-view'),
            profile: document.getElementById('profile-view')
        };
        this.currentView = null;
    }

    navigate(viewName) {
        if (!this.views[viewName]) return;
        
        // Hide all views
        Object.values(this.views).forEach(view => {
            if (view) view.classList.remove('active');
        });

        // Show target view
        this.views[viewName].classList.add('active');
        this.currentView = viewName;
        
        // Scroll to top when changing view
        window.scrollTo(0,0);
        
        // Trigger event for view specific initializations
        window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: viewName } }));
    }
}
