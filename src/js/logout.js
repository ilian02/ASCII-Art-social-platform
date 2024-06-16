function log_out() {
    fetch('src/php/logout.php', {
        method: 'GET',
    })
    location = 'index.html'
}

log_out()