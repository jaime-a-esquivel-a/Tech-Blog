const signupFormHandler = async (event) => {

    event.preventDefault();

    console.log('Signup process started');

    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const pass = document.getElementById('signupPass').value.trim();

    if (username == '' || email == '' ||  pass == '') {
        alert('All fields are required');
        return;
    }

    const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ 
            user_name: username, 
            email: email, 
            password: pass, }),
        headers: { 'Content-Type': 'application/json' },
    });

    //console.log(response);

    if(response.ok){

        const response2 = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ 
                email: email, 
                password: pass }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response2.ok) {
              document.location.replace('/');
          } else {
            alert('Failed to log in.');
          }

    }else{
        alert('Error when signing up');
    }

};


document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);