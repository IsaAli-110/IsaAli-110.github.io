class HomeView {
    constructor() {
        this.initialized = false;
        
        // Listen for when home view becomes active
        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'home' && !this.initialized) {
                this.init();
            }
        });
    }

    init() {
        this.initialized = true;
        this.setupCustomCursor();
        this.setupParallax();
        this.setupObserver();
        this.setupSlider();
        this.setup3DParallax();
    }

    setupCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            if(document.getElementById('home-view').classList.contains('active')) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursor.style.display = 'block';
            } else {
                cursor.style.display = 'none';
            }
        });
    }

    setupParallax() {
        const bgText = document.querySelector('.hero-bg-text');
        if (!bgText) return;
        
        window.addEventListener('scroll', () => {
            if (document.getElementById('home-view').classList.contains('active')) {
                bgText.style.transform = `translate(calc(-50% + ${window.scrollY * 0.4}px), -50%)`;
            }
        });
    }

    setupObserver() {
        // Observers are now handled in App.js globally to fix missing text issues.
    }

    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = (progress * (end - start)) + start;
            obj.innerHTML = end % 1 === 0 ? Math.floor(val) : val.toFixed(1);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    setupSlider() {
        const outer = document.getElementById('slider-outer');
        const track = document.getElementById('slider-track');
        const dots = document.querySelectorAll('.dot');
        if (!outer || !track) return;

        let isDragging = false, startX, currentTranslate = 0, prevTranslate = 0, currentIndex = 0;

        const getPos = (e) => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

        const updateSlider = () => {
            track.style.transform = `translateX(${currentTranslate}px)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        };

        const setPositionByIndex = () => {
            currentTranslate = currentIndex * -outer.offsetWidth;
            prevTranslate = currentTranslate;
            track.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            updateSlider();
        };

        outer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = getPos(e);
            track.style.transition = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const currentX = getPos(e);
            currentTranslate = prevTranslate + (currentX - startX);
            track.style.transform = `translateX(${currentTranslate}px)`;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100 && currentIndex < 3) currentIndex++;
            else if (movedBy > 100 && currentIndex > 0) currentIndex--;

            setPositionByIndex();
        });

        // Touch Support
        outer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = getPos(e);
            track.style.transition = 'none';
        }, { passive: true });

        outer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = getPos(e);
            currentTranslate = prevTranslate + (currentX - startX);
            track.style.transform = `translateX(${currentTranslate}px)`;
        }, { passive: true });

        outer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100 && currentIndex < 3) currentIndex++;
            else if (movedBy > 100 && currentIndex > 0) currentIndex--;
            setPositionByIndex();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                setPositionByIndex();
            });
        });

        window.addEventListener('resize', setPositionByIndex);
    }

    setup3DParallax() {
        const container = document.querySelector('.parallax-car-container');
        const car = document.getElementById('parallax-car');
        
        if (!container || !car) return;

        document.addEventListener('mousemove', (e) => {
            if (!document.getElementById('home-view').classList.contains('active')) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset when mouse leaves
        document.addEventListener('mouseleave', () => {
            container.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }
}
