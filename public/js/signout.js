const signOutHandler = async (event) => {

    event.preventDefault();

    console.log('Sign out process');

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
      alert('Failed to Sign Out.');
    }

}

document
    .querySelector('#signoutButton')
    .addEventListener('click', signOutHandler);