document.getElementById("edit-post-form").addEventListener("submit", editPostHandler);

async function editPostHandler(event) {
    event.preventDefault();

    const editPostId = document.getElementById('inputPostId').value;
    const editPostTitle = document.getElementById('inputPostTitle').value;
    const editPostContent = document.getElementById('inputPostText').value;

    console.log(editPostId);
    console.log(editPostTitle);
    console.log(editPostContent);

    const response = await fetch(`/postHeader/${editPostId}`, { 
        method: 'PUT',
        body: JSON.stringify({
            postId: editPostId,
            title: editPostTitle,
            description: editPostContent,
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