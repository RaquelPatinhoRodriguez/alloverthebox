document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
    
    // Inicializar AOS si estamos en about-box.html
    if (window.location.pathname.includes('about-box.html')) {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            offset: 100
        });
    }
    
    // Inicializar proyectos si estamos en la página de proyectos
    if (window.location.pathname.includes('projects.html')) {
        initializeProjects();
    }

    const fixedProject = document.querySelector('.fixed-project');
    if (fixedProject) {
        fixedProject.addEventListener('click', function() {
            const flipInner = this.querySelector('.project-flip-inner');
            flipInner.classList.toggle('flipped');
        });
    }
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

// Mensajes para las tarjetas escapables
const mensajesEscape = [
    "¡En desarrollo!",
    "No me atraparás",
    "404: No encontrado",
    "Café primero...",
    "Bug en proceso",
    "Compila y corre",
    "¡Deploy fallido!",
    "git push --force"
];

// Selección de elementos
const escapableCards = document.querySelectorAll('.escapable-project');
const fixedProject = document.querySelector('.fixed-project');

// Funciones
function obtenerMensajeAleatorio() {
    return mensajesEscape[Math.floor(Math.random() * mensajesEscape.length)];
}

function posicionarCards() {
    const isMobile = window.innerWidth <= 768;
    const baseSpacing = 40;
    
    escapableCards.forEach((card, index) => {
        if (isMobile) {
            const y = fixedProject.offsetHeight + (index + 1) * baseSpacing + index * card.offsetHeight;
            card.style.left = '50%';
            card.style.transform = 'translateX(-50%)';
            card.style.top = y + 'px';
        } else {
            const fixedProjectWidth = fixedProject.offsetWidth;
            const x = fixedProjectWidth + baseSpacing + (index * (card.offsetWidth + baseSpacing));
            const minSpacing = fixedProjectWidth + baseSpacing;
            card.style.left = Math.max(x, minSpacing) + 'px';
            card.style.top = '100px';
            card.style.transform = '';
        }
    });
}

function obtenerPosicionAleatoria(elemento) {
    const fixedProjectRect = fixedProject.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    
    const minY = 20;
    const maxY = window.innerHeight - elemento.offsetHeight - 20;
    const maxX = window.innerWidth - elemento.offsetWidth - 20;
    
    let intentos = 0;
    let posicion;
    
    do {
        if (isMobile) {
            posicion = {
                x: window.innerWidth / 2 - elemento.offsetWidth / 2,
                y: Math.random() * (maxY - minY) + minY
            };
        } else {
            posicion = {
                x: Math.random() * maxX + 20,
                y: Math.random() * (maxY - minY) + minY
            };
        }
        
        const rectPropuesto = {
            left: posicion.x,
            right: posicion.x + elemento.offsetWidth,
            top: posicion.y,
            bottom: posicion.y + elemento.offsetHeight
        };
        
        if (!hayColision(rectPropuesto, fixedProjectRect)) {
            return posicion;
        }
        
        intentos++;
    } while (intentos < 10);
    
    return {
        x: isMobile ? window.innerWidth / 2 - elemento.offsetWidth / 2 : maxX,
        y: (maxY + minY) / 2
    };
}

function hayColision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);
}

function initializeProjects() {
    // Inicializar posición de tarjetas
    posicionarCards();
    
    // Inicializar mensajes con texto fijo
    escapableCards.forEach(card => {
        card.querySelector('.card-text').textContent = "Proyecto en fase de diseño. No lo toques o pasarán cosas.";
        card.dataset.hasHovered = "false";
        
        // Añadir evento touch/click para móvil
        card.addEventListener('click', function() {
            const nuevaPosicion = obtenerPosicionAleatoria(card);
            card.style.left = nuevaPosicion.x + 'px';
            card.style.top = nuevaPosicion.y + 'px';
            
            if (card.dataset.hasHovered === "false") {
                card.dataset.hasHovered = "true";
            }
            card.querySelector('.card-text').textContent = obtenerMensajeAleatorio();
        });
    });

    // Añadir listener para reposicionar en resize
    window.addEventListener('resize', posicionarCards);
}

function initFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: rgba(255,255,255,0.1);
            transform: rotate(${Math.random() * 360}deg);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 4 + 3}s infinite alternate;
        `;
        container.appendChild(shape);
    }
}

if (window.location.pathname.includes('about-box.html')) {
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true
    });
    initFloatingShapes();
}

// Inicialización
