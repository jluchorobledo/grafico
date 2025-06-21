// Autor: Diego Pazos



// NAVBAR: Efecto sticky y scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // SLIDER/CAROUSEL Bootstrap (si usas Bootstrap)
    if (window.bootstrap && document.getElementById('mainCarousel')) {
        new bootstrap.Carousel(document.getElementById('mainCarousel'), {
            interval: 5000,
            ride: true
        });
    }

    // GALERÍA: Zoom modal (opcional)
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    document.body.appendChild(zoomModal);

    document.querySelectorAll('.galeria-mosaico img').forEach(img => {
        img.addEventListener('click', function() {
            zoomModal.innerHTML = '';
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            zoomModal.appendChild(modalImg);
            zoomModal.classList.add('active');
        });
    });

    zoomModal.addEventListener('click', function() {
        this.classList.remove('active');
    });

    // MODAL DE CONTACTO
    const contactButton = document.getElementById('contactButton');
    const contactForm = document.getElementById('contactForm');
    const closeForm = document.getElementById('closeForm');

    if (contactButton && contactForm) {
        contactButton.addEventListener('click', function() {
            contactForm.classList.add('active');
        });
    }
    if (closeForm && contactForm) {
        closeForm.addEventListener('click', function() {
            contactForm.classList.remove('active');
        });
    }

    // FORMULARIO DE CONTACTO (EmailJS)
    const form = document.getElementById('contact-form');
    if(form){
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            sendEmail();
        });
    }
});

// Enviar formulario de contacto con EmailJS
function sendEmail() {
    emailjs.send("service_yvu8lal", "template_p6l7grc", {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    })
    .then(function(response) {
        document.getElementById('contacto-resultado').innerHTML = "<span style='color:green'>¡Mensaje enviado correctamente!</span>";
        document.getElementById('contact-form').reset();
    }, function(error) {
        document.getElementById('contacto-resultado').innerHTML = "<span style='color:red'>Error al enviar el mensaje. Intenta de nuevo.</span>";
    });
}

// SMOOTH SCROLL para navegación interna
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});