const posts_container = document.getElementById('post_container')

let current_page = 3            // ADD BUTTONS TO CHANGE PAGES AND CALL LOAD_GALERY EVERYTIME YOU CHANGE PAGE
let current_posts;

let pic1 = {
    id: 12,
    content: "┼┼┼┼┼  ▄▄▄▄                                                                                                                        ▆▆ ▆ ▆ ▆ ▆  ▆                         ▆▆                                      ▆                ▆                     ▆                  ▆                    ▆                   ▆                   ▆                    ▆                  ▆                    ▆                   ▆             ▆▆▆    ▆                   ▆           ▆       ▆                    ▆         ▆        ▆                    ▆      ▆ ▆         ▆                     ▆▆   ▆           ▆▆                      ▆   ▆▆         ▆▆                        ▆▆   ▆▆ ▆▆▆ ▆▆                           ▆                                                                                                                                                                                                                                                                                                                ",
    width: 40,
    height: 25,
    artist_id: 14,
    username: "client1"
};


function load_galery() {
    fetch(`src/php/pictureGalery.php?page=${current_page}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            console.log(data.message)
            current_posts = data.posts              // USE THIS AND DISPLAY POSTS ON HTML PAGE
            console.log(current_posts)
        } else if (data.status === "unsuccessful") {
            console.log('status was unsucc')
            
        } else {
            console.log('how are we here')
        }
        
    }).catch((err) => {
        // console.error('Error: ', err)
    });
}

load_galery()


function present_pictures() {
    current_posts.array.forEach(picture => {
        present_picture(picture)
    });
}

present_pictures()


function present_picture(picture) {

    let picture_container = document.createElement('div')
    picture_container.id = 'picture-container'

    let pic_header = document.createElement('h2')
    //title.innerText = picture['title']
    pic_header.innerText = 'title' + ' by ' + picture['username'] 
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
            index++;
            table_cell.classList.add('cell')
            table_row.appendChild(table_cell)
    
        }
        table.appendChild(table_row)
    }

    picture_container.appendChild(table)

    


    posts_container.appendChild(picture_container)
}