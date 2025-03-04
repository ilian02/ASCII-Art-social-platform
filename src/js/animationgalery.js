const posts_container = document.getElementById('post_container')

let current_page = 1
let current_posts
let current_frame = 0;

async function display_loop () {
    while(true) {
        present_pictures()
        current_frame += 1
        await delay(1000);
    }
}

//loads all pictures from the DB with GET request
function load_galery() {
    fetch(`src/php/animationGalery.php?page=${current_page}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        console.log(data)
        if (data.status === "success") {
            current_posts = data.posts
            display_loop()
        } else if (data.status === "unsuccessful") {
            console.log('status was unsucc')
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    })
}

//present all pictures
function present_pictures() {
    posts_container.innerHTML = ''
    current_posts.forEach(picture => {
        present_picture(picture)
    })
}

//present single picture
function present_picture(picture) {
    let frames_count = picture['frames'].length

    //create container for each picture
    let picture_container = document.createElement('div')
    picture_container.id = 'picture-container'

    //add title and username of creator
    let pic_header = document.createElement('h2')
    pic_header.innerText = picture['title'] + ' by ' + picture['username'] 
    pic_header.id = 'pic-header'
    picture_container.appendChild(pic_header)

    
    //create table and add to container
    let table = document.createElement('table')
    table.id = 'picture'
    let index = 0
    for (let i = 0; i < picture["height"]; i++) {
        let table_row = document.createElement('tr')
    
        for (let j = 0; j < picture["width"]; j++) {
            let table_cell = document.createElement('td')

            table_cell.innerText = picture['frames'][current_frame % frames_count]['content'][index]
    
            index++
            table_cell.classList.add('cell')
            table_row.appendChild(table_cell)
        }
        table.appendChild(table_row)
    }

    picture_container.appendChild(table)

    //add pic container to all pictures
    posts_container.appendChild(picture_container)
}

//button for previous page
document.addEventListener('DOMContentLoaded', () => {
    const prev_button = document.getElementById('prev')
    prev_button.addEventListener('click', ()=>{
        current_page -= 1
        if (current_page < 1) {
            current_page = 1
        }
        posts_container.innerHTML = ''
        load_galery()
    })
    
})

//button for next page
document.addEventListener('DOMContentLoaded', () => {

    load_galery()

    const next_button = document.getElementById('next')
    next_button.addEventListener('click', ()=>{
        current_page += 1
        posts_container.innerHTML = ''
        load_galery()
    })
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
