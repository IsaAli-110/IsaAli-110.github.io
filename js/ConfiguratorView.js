class ConfiguratorView {
    constructor() {
        this.initialized = false;
        
        this.basePrice = 161100;
        this.currentPrice = this.basePrice;
        this.options = { color: 0, wheels: 0, interior: 0 };

        this.carImages = {
            carmine: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
            gt: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
            racing: 'https://images.unsplash.com/photo-1611821064430-0d40221e4c9c?q=80&w=2070&auto=format&fit=crop',
            black: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop'
        };

        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'configurator' && !this.initialized) {
                this.init();
            }
        });
    }

    init() {
        this.initialized = true;
        this.setupTabs();
        this.setupSelections();
        this.updatePrice();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.config-tab');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
    }

    setupSelections() {
        const carImg = document.getElementById('config-car-img');
        
        // Colors
        document.querySelectorAll('.swatch-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                document.querySelectorAll('.swatch-item').forEach(s => s.classList.remove('active'));
                target.classList.add('active');
                
                const color = target.dataset.color;
                const price = parseInt(target.dataset.price);
                
                carImg.style.opacity = 0.2;
                carImg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    carImg.src = this.carImages[color];
                    carImg.style.opacity = 1;
                    carImg.style.transform = 'scale(1)';
                }, 400);

                this.options.color = price;
                this.updatePrice();
            });
        });

        // Wheels
        document.querySelectorAll('.wheel-option').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                document.querySelectorAll('.wheel-option').forEach(s => s.classList.remove('active'));
                target.classList.add('active');
                this.options.wheels = parseInt(target.dataset.price);
                this.updatePrice();
            });
        });

        // Interior
        document.querySelectorAll('.int-option').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                document.querySelectorAll('.int-option').forEach(s => s.classList.remove('active'));
                target.classList.add('active');
                this.options.interior = parseInt(target.dataset.price);
                this.updatePrice();
            });
        });
    }

    updatePrice() {
        this.currentPrice = this.basePrice + this.options.color + this.options.wheels + this.options.interior;
        const priceEl = document.getElementById('total-price');
        
        // Simple counter animation
        let start = parseInt(priceEl.innerText.replace(/[^0-9]/g, '')) || this.basePrice;
        let end = this.currentPrice;
        let duration = 500;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = Math.floor((progress * (end - start)) + start);
            priceEl.innerText = '$ ' + val.toLocaleString();
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }
}
