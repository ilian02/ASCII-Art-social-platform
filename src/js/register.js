const registerForm = document.getElementById("register-form")

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputs = Array.from(document.querySelectorAll('label input'))
    const userData = {};

    inputs.forEach(input => {
        userData[input.name] = input.value
    })

    console.log(userData)

    fetch('src/php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then((res) => {
        if (!res.ok) {
            throw res.json().then(err => {throw err});
        }
        console.log(res.status)
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            console.log(data.message)
            console.log(data.user_id)
            location = 'index.html';
        } else if (data.status === "unsuccessful") {
            // ADD ERROR MESSAGE ON SCREEN
            console.log(data.message)
        } else {
            console.log(data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
})