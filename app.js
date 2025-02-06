document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
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

async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const data = await response.text();
        document.getElementById('footer-placeholder').innerHTML = data;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Funciones para about-me.html
const consoleMessages = [
    "Cargando perfil...\n",
    "🖥️ Full Stack Developer\n",
    "👩‍💻 Nombre: Raquel Patiño Rodríguez\n",
    "☕ Tazas de café consumidas hoy: " + (Math.floor(Math.random() * 19) + 4) + "\n",
    "Cargando habilidades...\n",
    "🟣 .NET Core: true\n",
    "🚀 AWS: true\n",
    "🛠️ Terraform: true\n",
    "🏆 Premio al mejor bug encontrado: 'Se arregló solo'.\n"
];

let messageIndex = 0;

function showConsoleMessage() {
    if (messageIndex < consoleMessages.length) {
        const line = document.createElement("div");
        line.className = "line";
        line.textContent = consoleMessages[messageIndex];
        document.getElementById("output")?.appendChild(line);

        setTimeout(() => {
            line.style.opacity = 1;
        }, 300);

        messageIndex++;
        setTimeout(showConsoleMessage, 1000);
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains("dark-mode");

    if (isDark) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    }
}

// Inicializar la consola si estamos en about-me.html
if (window.location.pathname.includes('about-me.html')) {
    setTimeout(showConsoleMessage, 1000);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.remove("dark-mode", "light-mode");
        document.body.classList.add(savedTheme);
    }
}
