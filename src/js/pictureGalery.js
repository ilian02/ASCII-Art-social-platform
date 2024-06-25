const posts_container = document.getElementById('post_container')

let current_page = 3

function load_galery() {
    fetch(`src/php/pictureGalery.php?page=${current_page}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    }).then(data => {
        if (data.status === "success") {
            console.log(data.message)
            console.log(data.posts)
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