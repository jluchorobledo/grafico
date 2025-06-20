document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    setInterval(nextSlide, 5000);
});

// Añade esto al script existente
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-grid img, .about-content, form').forEach((el) => {
    observer.observe(el);
});

document.getElementById('contactButton').addEventListener('click', function() {
    document.getElementById('contactForm').style.display = 'flex';
});

document.getElementById('closeForm').addEventListener('click', function() {
    document.getElementById('contactForm').style.display = 'none';
});

// Cerrar al hacer clic fuera del formulario
document.getElementById('contactForm').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});
