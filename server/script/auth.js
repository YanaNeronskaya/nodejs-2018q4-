document.getElementById('submit').addEventListener('click', () => {
    const userName = document.getElementById('userName');
    const userPassword = document.getElementById('userPassword');

    if (!userName || !userPassword) throw new Error('Error! Not valid password/user name');

    fetch('http://localhost:8080/auth', {
        method: 'POST',
        body: {
            userName,
            userPassword
        }
    })
        .then(function (response) {
            alert(response.headers.get('Content-Type'));
            alert(response.status);

            return response.json();
        })
        .then(function (data) {
            alert(data)
        })
        .catch(alert);
});
