function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);

    // Send the ID token to the server
    fetch('/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        if (data.message === 'User verified successfully') {
            window.location.href = '/ComplaintForm';
        } else {
            alert('Verification failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function initGoogleAuth() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '365690865739-3mf2s21thpv3kn2c1c3nit5496h0cjns.apps.googleusercontent.com'
        }).then(function() {
            var auth2 = gapi.auth2.getAuthInstance();
            document.getElementById('google-signin-button').addEventListener('click', function() {
                auth2.signIn().then(onSignIn);
            });
        });
    });
}

window.onload = function() {
    initGoogleAuth();
};
