const addCommentHandler = async (e) => {
    e.preventDefault();
    const textBody = document.querySelector('#comment-body').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            text: textBody
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        location.reload();
    } else {
        alert('Could not add comment!');
    }
};

document.querySelector('.new-comment-form')
        .addEventListener('submit', addCommentHandler);