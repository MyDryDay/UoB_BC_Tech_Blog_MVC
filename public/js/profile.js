const postHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-body').value.trim();

    if (name && description) {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert('Could not create new post.');
        }
    }
};

const deleteHandler = async (e) => {
    if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert('Could not delete post.');
        }
    }
};

document.querySelector('.new-blog-form')
        .addEventListener('submit', postHandler);

document.querySelector('.post-list')
        .addEventListener('click', deleteHandler);