document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    AOS.init();
});

const squares = document.getElementById('squares');
if (squares) {
    for (let i = 0; i < 15; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = Math.random() * 50 + 20 + 'px';
        square.style.height = square.style.width;
        square.style.left = Math.random() * 100 + '%';
        square.style.top = Math.random() * 100 + '%';
        square.style.animationDuration = (Math.random() * 8 + 4) + 's';
        //square.style.animationDelay = (Math.random() * 5) + 's';
        squares.appendChild(square);
    }
}

async function loadNavbar() {
    try {
        const response = await fetch('components/navbar.html');
        const data = await response.text();
        document.getElementById('navbar-placeholder').innerHTML = data;

        // Activar el link actual
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentLink = document.querySelector(`.navbar-nav a[href="${currentPage}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}
