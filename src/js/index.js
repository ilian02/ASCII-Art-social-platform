const usernameField = document.getElementById("username-field")
const editor_button = document.getElementById("picture_editor")


editor_button.addEventListener('click', () => {
    const param = 'new_picture1'
    const url = `src/php/pictureEditor.php?param=${encodeURIComponent(param)}`

    fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message)
    }).catch((error) => {
        console.log('error ' + error)
    })
})


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