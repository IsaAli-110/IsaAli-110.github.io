class ModelsView {
    constructor() {
        this.initialized = false;
        
        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'models' && !this.initialized) {
                this.init();
            }
        });
    }

    init() {
        this.initialized = true;
        // Any specific logic for Models page can go here
        // The global observer in App.js will handle the .reveal animations
    }
}
