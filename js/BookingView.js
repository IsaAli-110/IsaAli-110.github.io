class BookingView {
    constructor() {
        this.initialized = false;
        
        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'booking' && !this.initialized) {
                this.init();
            }
        });
    }

    init() {
        this.initialized = true;
        this.setupTimePills();
        this.setupBookingForm();
    }

    setupTimePills() {
        const pills = document.querySelectorAll('.time-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    setupBookingForm() {
        const form = document.getElementById('testdriveForm');
        if (!form) return;

        // Set min date to today
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activePill = document.querySelector('.time-pill.active');
            if (!activePill) {
                alert('Please select a preferred time slot.');
                return;
            }

            const btn = form.querySelector('.btn-submit-booking');
            const originalText = btn.innerText;
            btn.innerText = 'Confirming Appointment...';
            btn.style.backgroundColor = '#111';
            
            setTimeout(() => {
                const model = document.getElementById('booking-model').value;
                const date = document.getElementById('booking-date').value;
                const time = activePill.innerText;
                
                alert(`Appointment Confirmed!\n\nModel: ${model}\nDate: ${date}\nTime: ${time}\n\nOur concierge will contact you shortly to confirm the details.`);
                
                btn.innerText = originalText;
                btn.style.backgroundColor = 'var(--porsche-red)';
                form.reset();
                document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
            }, 2000);
        });
    }
}
