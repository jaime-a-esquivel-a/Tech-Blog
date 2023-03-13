async function deletePost(idPost){

    if (confirm("Are you sure you want to delete this Post?")) {

        console.log('confirmed!');

        const response = await fetch(`/postHeader/${idPost}`, { 
            method: 'DELETE',
            body: JSON.stringify({
                id: idPost,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/postHeader`);
        } else {
            alert('Error when attempting to delete Post');
            document.location.replace(`/postHeader`);
        }

    } else {
        //DO nothing
    }

}