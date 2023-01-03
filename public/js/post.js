/*const posts = document.getElementsByClassName('linkcard');

async function viewPost(event) {

    event.preventDefault();

    console.log('Clicked');

}

for (let i = 0; i < posts.length; i++){
    posts[i].addEventListener('click', viewPost);
}*/

function viewPost(postid){

    window.location.href = (`/post/${postid}`);
    
}