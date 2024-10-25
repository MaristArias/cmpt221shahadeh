document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        window.location.href = '/home';
    }
});

document.querySelector('.splash-message').addEventListener('click', function() {
    window.location.href = '/home'; 
});
