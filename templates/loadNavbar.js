document.addEventListener("DOMContentLoaded", function() {
    fetch('navBar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading navbar:', error));
});