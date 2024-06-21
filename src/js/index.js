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
        if (data.status === "success") {
            if (data.isLogged == true) {
                usernameField.innerText = data.username
            } else {
                usernameField.innerHTML = 'Anon'
            }
        } else if (data.status === "unsuccessful") {
            console.log('status was unsucc')
            
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
}

load_username()