// Número de contacto de WhatsApp de LG BUZOS
const whatsappPhone = "573107707763"; 

// TOGGLE DEL MENÚ HAMBURGUESA EN MÓVILES
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function closeMobileMenu() {
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

// ABRIR VENTANA MODAL INTERACTIVA CON DESCRIPCIÓN
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('detailModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const wsBtn = document.getElementById('whatsappBtn');

    modalImg.src = imageSrc;
    modalTitle.innerText = title;
    modalDesc.innerText = description;
    
    // Generar mensaje dinámico a WhatsApp según el buzo seleccionado
    const customMessage = encodeURIComponent(`Hola LG BUZOS, quiero más información sobre el ${title}`);
    wsBtn.href = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${customMessage}`;
    
    modal.style.display = 'flex';
}

// CERRAR MODAL
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
}

// CERRAR AL HACER CLIC FUERA DE LA VENTANA O PULSAR ESC (TECLADO / SMART TV)
window.onclick = function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// FILTROS POR CATEGORÍA Y BÚSQUEDA EN TIEMPO REAL
let currentCategory = 'todos';

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter');
        filterProducts();
    });
});

// SALTAR A UNA COLECCIÓN DESDE LAS TARJETAS DE TEMPORADA
function jumpToCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-filter') === category) {
            b.classList.add('active');
        }
    });
    document.getElementById('searchInput').value = '';
    filterProducts();
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.product-title').innerText.toLowerCase();
        const desc = card.querySelector('.product-desc-short').innerText.toLowerCase();
        const categories = card.getAttribute('data-category') || '';

        const matchesCategory = (currentCategory === 'todos') || categories.includes(currentCategory);
        const matchesSearch = title.includes(searchInput) || desc.includes(searchInput);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// BOTÓN FLOTANTE VOLVER ARRIBA
window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CONTADOR DE VISITAS PERSISTENTE CON LOCALSTORAGE
function initVisitorCounter() {
    let visits = localStorage.getItem('pageVisits');
    
    if (!visits) {
        visits = 1250; // Número de partida inicial
    } else {
        visits = parseInt(visits) + 1;
    }
    
    localStorage.setItem('pageVisits', visits);
    
    const visitElement = document.getElementById('visitCount');
    if (visitElement) {
        visitElement.innerText = visits.toLocaleString();
    }
}

document.addEventListener('DOMContentLoaded', initVisitorCounter);