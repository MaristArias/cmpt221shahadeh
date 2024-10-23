// Redirect to the home page when the spacebar is pressed or when the message is clicked
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        window.location.href = '/home';
    }
});

document.querySelector('.splash-message').addEventListener('click', function() {
    window.location.href = '*/home';
});
