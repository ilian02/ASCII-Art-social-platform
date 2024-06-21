const registerForm = document.getElementById("register-form")
const errorBox = document.createElement('p')
registerForm.appendChild(errorBox)

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputs = Array.from(document.querySelectorAll('label input'))
    const userData = {};

    inputs.forEach(input => {
        userData[input.name] = input.value
    })



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
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            location = 'index.html';
        } else if (data.status === "unsuccessful") {
            // ADD ERROR MESSAGE ON SCREEN
            errorBox.innerHTML = ''

            let errors = data.errors[0]

            errors.forEach(function(error) {
                errMessage = document.createElement('p')
                errMessage.innerText = error
                errorBox.append(errMessage)
            })
            
            console.log(message.innerText)
        } else {
            console.log('Защо сме тук' + data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
})