const registerForm = document.getElementById("register-form")
const errorBox = document.createElement('p')
registerForm.appendChild(errorBox)

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    console.log('clicked')

    const inputs = Array.from(document.querySelectorAll('label input'))
    const userData = {}

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
            throw res.json().then(err => {throw err})
        }
        return res.json()
    }).then(data => {
        console.log(data.status)
        if (data.status === "success") {
            console.log('registered')
            location = 'index.html'
        } else if (data.status === "unsuccessful") {
            console.log('nuhuh')
            errorBox.innerHTML = ''

            let errors = data.errors[0]

            errors.forEach(function(error) {
                errMessage = document.createElement('p')
                errMessage.innerText = error
                errorBox.append(errMessage)
            })
        } else {
            console.log('Защо сме тук' + data.message)
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    })
})