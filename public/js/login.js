const loginHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const pass = document.querySelector('#pass-login').value.trim();

    if (email && pass) {
        const res = await fetch('/api/users.login', {
            method: 'POST',
            body: JSON.stringify({ email, pass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert(res.statusText);
        }
    }
};

document.querySelector('.login-form')
        .addEventListener('submit', loginHandler);