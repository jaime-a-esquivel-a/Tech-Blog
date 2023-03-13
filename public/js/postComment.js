document.getElementById("new-comment-form").addEventListener("submit", newCommentHandler);

async function newCommentHandler(event) {
    event.preventDefault();

    const postId = document.getElementById('inputUserId').value;
    const userId = document.getElementById('inputPostId').value;
    const commentText = document.getElementById('inputCommentText').value;

    console.log(postId);
    console.log(userId);

    const response = await fetch(`/postHeader/comment/${postId}`, { 
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            post_id: postId,
            text: commentText,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/post/${postId}`);
    } else {
        alert('Error when attempting to create Comment');
        document.location.replace(`/post/${postId}`);
    }

}