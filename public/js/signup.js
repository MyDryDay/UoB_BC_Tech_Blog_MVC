const signupHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const pass = document.querySelector('#pass-signup').value.trim();

    if (name && email && pass) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, pass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert(res.statusText);
        }
    }
};

document.querySelector('.signup-form')
        .addEventListener('submit', signupHandler);