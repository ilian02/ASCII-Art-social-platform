const usernameField = document.getElementById("username-field")

function load_username() {
    fetch('src/php/index.php', {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) {
            throw res.json().then(err => {throw err});
        }
        return res.json()
    }).then(data => {
        console.log(data.status)
        if (data.status === "success") {
            if (data.isLogged == true) {
                usernameField.innerText = data.username
            }
            console.log(data.message)
        } else if (data.status === "unsuccessful") {
            console.log('status was unsucc')
            usernameField.innerText = 'Anon'
        } else {
            console.log(data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
}

load_username()
console.log('here')