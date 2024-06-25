const usernameField = document.getElementById("username-field")
const editor_button = document.getElementById("picture-editor")
const logout = document.getElementById('logout-button')
const posts_container = document.getElementById('post_container')
const sign_button = document.getElementById('sign-button')

let posts
let username = null

logout.addEventListener('click', () => {
    const url = 'logout.html'
    window.location = url
})

editor_button.addEventListener('click', () => {
    const url = 'pictureEditor.html'
    
    window.location = url
})

sign_button.addEventListener('click', () => {
    location = 'register.html'
})

function load_username() {
    fetch('src/php/index.php', {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) {
            throw res.json().then(err => {throw err})
        }
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            if (data.isLogged == true) {
                username = data.username
                usernameField.innerText = username

                posts = data.pictures

                logout.style.display = 'block'
                sign_button.style.display = 'none'

                present_pictures()
            } else {
                usernameField.innerHTML = ''
                logout.style.display = 'none'
                sign_button.style.display = 'block'
            }
        } else if (data.status === "unsuccessful") {
            console.log('status was unsucc')
            
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    })

}

load_username()

function present_pictures() {
    console.log(posts)
    posts.forEach(picture => {
        present_picture(picture)
    })
}

function present_picture(picture) {

    let picture_container = document.createElement('div')
    picture_container.id = 'picture-container'

    let pic_header = document.createElement('h2')
    pic_header.addEventListener('click', () => {
        console.log(picture['id'])
        const url = `pictureEditor.html?pic_id=${encodeURIComponent(picture['id'])}`
        window.location = url
    })

    //title.innerText = picture['title']
    pic_header.innerText = 'title' + ' by ' + username
    pic_header.id = 'pic-header'
    picture_container.appendChild(pic_header)

    

    let table = document.createElement('table')
    table.id = 'picture'
    let index = 0
    for (let i = 0; i < picture["height"]; i++) {
        let table_row = document.createElement('tr')
    
        for (let j = 0; j < picture["width"]; j++) {
            let table_cell = document.createElement('td')
            table_cell.innerText = picture["content"][index]
            index++
            table_cell.classList.add('cell')
            table_row.appendChild(table_cell)
    
        }
        table.appendChild(table_row)
    }

    picture_container.appendChild(table)

    


    posts_container.appendChild(picture_container)
}