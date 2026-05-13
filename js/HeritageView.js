class HeritageView {
    constructor() {
        this.initialized = false;
        
        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'heritage' && !this.initialized) {
                this.init();
            }
        });
    }

    init() {
        this.initialized = true;
        // Logic handled by App.js reveal observer
    }
}
