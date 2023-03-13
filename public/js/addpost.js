document.getElementById("new-post-form").addEventListener("submit", newPostHandler);

async function newPostHandler(event) {
    event.preventDefault();

    const newPostTitle = document.getElementById('inputPostTitle').value;
    const newPostContent = document.getElementById('inputPostText').value;

    const response = await fetch('/postHeader', { 
        method: 'POST',
        body: JSON.stringify({
            title: newPostTitle,
            content: newPostContent,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/postHeader`);
    } else {
        alert('Error when attempting to create Post');
        document.location.replace(`/postHeader`);
    }
    
}