const editHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector("input[name='edit-title']").value;
    const description = document.querySelector("input[name='edit-body']").value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const res = await fetch(`/api/blogs/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/profile');
    } else {
        alert('Could not update post.');
    }
};

document.querySelector('.edit-form')
        .addEventListener('submit', editHandler);