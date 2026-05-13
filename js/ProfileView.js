class ProfileView {
    constructor(router) {
        this.router = router;
        this.initialized = false;
        
        window.addEventListener('viewChanged', (e) => {
            if (e.detail.view === 'profile' && !this.initialized) {
                this.init();
            } else if (e.detail.view === 'profile') {
                this.updateProfileData();
            }
        });
    }

    init() {
        this.initialized = true;
        this.setupLogout();
        this.updateProfileData();
    }

    updateProfileData() {
        const nameEl = document.getElementById('profile-name-display');
        const emailEl = document.getElementById('profile-email-display');
        const initialEl = document.getElementById('profile-initial');
        
        // This is a simple mock, usually you'd get the currently logged in user
        // For now we just get the last user from localStorage or default
        const users = JSON.parse(localStorage.getItem('porsche_users')) || [];
        if (users.length > 0) {
            // Get the last registered user or admin
            const activeUser = users[users.length - 1];
            if (nameEl) nameEl.innerText = activeUser.username || 'Porsche Owner';
            if (emailEl) emailEl.innerText = activeUser.email || 'user@porsche.com';
            if (initialEl) initialEl.innerText = (activeUser.username ? activeUser.username.charAt(0) : 'P').toUpperCase();
        }
    }

    setupLogout() {
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                const originalText = logoutBtn.innerText;
                logoutBtn.innerText = 'Logging out...';
                
                setTimeout(() => {
                    logoutBtn.innerText = originalText;
                    this.router.navigate('login');
                }, 1000);
            });
        }
    }
}
