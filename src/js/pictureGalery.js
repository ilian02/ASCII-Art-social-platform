const posts_container = document.getElementById('post_container')


function load_username() {
    fetch('src/php/pictureGalery.php', {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) {
            throw res.json().then(err => {throw err});
        }
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

load_username()