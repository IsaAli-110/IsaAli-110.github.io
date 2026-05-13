class AuthView {
    constructor(router) {
        this.router = router;
        this.init();
    }

    init() {
        this.initDummyData();
        this.setupTogglePassword();
        this.setupNavigation();
        this.setupForms();
        this.setupParticles();
        this.setupParallax();
    }

    initDummyData() {
        if (!localStorage.getItem('porsche_users')) {
            const defaultUser = {
                username: 'admin',
                email: 'admin',
                password: 'admin'
            };
            localStorage.setItem('porsche_users', JSON.stringify([defaultUser]));
        }
    }

    setupTogglePassword() {
        const toggles = document.querySelectorAll('.toggle-btn');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling;
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                e.target.classList.toggle('fa-eye');
                e.target.classList.toggle('fa-eye-slash');
            });
        });
    }

    setupNavigation() {
        // Links to swap between login and register
        const toRegisterBtn = document.getElementById('go-to-register');
        if (toRegisterBtn) {
            toRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.router.navigate('register');
            });
        }

        const toLoginBtn = document.getElementById('go-to-login');
        if (toLoginBtn) {
            toLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.router.navigate('login');
            });
        }
    }

    setupForms() {
        // Login Form
        const loginForm = document.getElementById('porscheForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('login-email').value;
                const passwordInput = document.getElementById('login-password').value;
                
                const users = JSON.parse(localStorage.getItem('porsche_users')) || [];
                const validUser = users.find(u => (u.email === emailInput || u.username === emailInput) && u.password === passwordInput);

                if (validUser) {
                    const btn = loginForm.querySelector('.btn-porsche');
                    const originalText = btn.innerText;
                    btn.innerText = 'Authenticating...';
                    btn.style.backgroundColor = '#d5001c';
                    btn.style.color = 'white';
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = 'white';
                        btn.style.color = 'black';
                        loginForm.reset();
                        this.router.navigate('home');
                    }, 1000);
                } else {
                    alert('Invalid Email/Username or Password. Please try again.');
                }
            });
        }

        // Register Form
        const regForm = document.getElementById('regForm');
        if (regForm) {
            regForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('reg-email').value;
                const username = document.getElementById('reg-username').value;
                const password = document.getElementById('reg-password').value;

                const users = JSON.parse(localStorage.getItem('porsche_users')) || [];
                
                // Cek apakah email/username sudah ada
                if (users.find(u => u.email === email || u.username === username)) {
                    alert('Email or Username already exists!');
                    return;
                }

                const btn = regForm.querySelector('.btn-porsche');
                const originalText = btn.innerText;
                btn.innerText = 'Creating Profile...';
                btn.style.backgroundColor = '#d5001c';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    // Simpan user baru
                    users.push({ username, email, password });
                    localStorage.setItem('porsche_users', JSON.stringify(users));
                    
                    alert('Registration Successful! Please sign in with your new account.');
                    btn.innerText = originalText;
                    btn.style.backgroundColor = 'white';
                    btn.style.color = 'black';
                    regForm.reset();
                    
                    // Arahkan kembali ke halaman login
                    this.router.navigate('login');
                }, 1500);
            });
        }
    }

    setupParallax() {
        const bgLogin = document.getElementById('parallaxBgLogin');
        const bgRegister = document.getElementById('parallaxBgRegister');
        
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            
            if (bgLogin && document.getElementById('login-view').classList.contains('active')) {
                bgLogin.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
            }
            if (bgRegister && document.getElementById('register-view').classList.contains('active')) {
                bgRegister.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
            }
        });
    }

    setupParticles() {
        this.canvases = document.querySelectorAll('.auth-particles');
        
        this.canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            let canvasParticles = [];

            const resize = () => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            };
            window.addEventListener('resize', resize);
            resize();

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 1.5;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }
                draw() {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            for (let i = 0; i < 50; i++) canvasParticles.push(new Particle());

            const animate = () => {
                const view = canvas.closest('.view-section');
                if (view && view.classList.contains('active')) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvasParticles.forEach(p => { p.update(); p.draw(); });
                }
                requestAnimationFrame(animate);
            };
            animate();
        });
    }
}
