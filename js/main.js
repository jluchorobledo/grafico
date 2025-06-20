// Autor: Diego Pazos

// Configuración de ponentes y eventos
const speakers = [
    {
        name: 'Dr. Sarah Johnson',
        role: 'AI Research Lead',
        company: 'Tech Innovations',
        image: './assets/img/speaker1.jpg'
    },
   

const carouselImages = [
    {
        src: './assets/img/slide1.jpg',
        title: 'TechConference 2023',
        description: 'Momentos destacados de nuestra última edición'
    },
    {
        src: './assets/img/slide2.jpg',
        title: 'Networking',
        description: 'Conecta con líderes de la industria'
    },
    {
        src: './assets/img/slide3.jpg',
        title: 'Innovación',
        description: 'Descubre las últimas tendencias tecnológicas'
    }
];

// Configuración de imágenes de la galería
const galleryImages = [
    {
        src: './assets/img/gallery1.jpg',
        title: 'Imagen 1',
        description: 'Descripción de la imagen 1'
    },
    {
        src: './assets/img/gallery2.jpg',
        title: 'Imagen 2',
        description: 'Descripción de la imagen 2'
    },
    {
        src: './assets/img/gallery3.jpg',
        title: 'Imagen 3',
        description: 'Descripción de la imagen 3'
    }
    // Puedes añadir más imágenes aquí
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll
    handleNavbarScroll();
    
    // Video gallery
    initVideoGallery();
    
    // Contact form
    initContactForm();
});

// Funciones de navegación
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Cargar ponentes en mosaico
function loadSpeakers() {
    const gallery = document.querySelector('.mosaic-gallery');
    
    speakers.forEach(speaker => {
        const speakerCard = document.createElement('article');
        speakerCard.className = 'speaker-card';
        
        speakerCard.innerHTML = `
            <img src="${speaker.image}" alt="${speaker.name}">
            <div class="speaker-info">
                <h3>${speaker.name}</h3>
                <p>${speaker.role}</p>
                <p>${speaker.company}</p>
            </div>
        `;
        
        gallery.appendChild(speakerCard);
    });
}

// Inicializar carrusel
function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    
    carouselImages.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        
        carouselItem.innerHTML = `
            <img src="${image.src}" class="d-block w-100" alt="${image.title}">
            <div class="carousel-caption">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;
        
        carouselInner.appendChild(carouselItem);
    });

    // Inicializar el carrusel de Bootstrap
    new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 5000,
        ride: true
    });
}

// Inicializar animaciones
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos para animación
    document.querySelectorAll('.speaker-card, .carousel-caption, .cta-button')
        .forEach(element => observer.observe(element));
}

// Efectos de scroll
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    });
}

// Manejar formulario de registro
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Aquí iría la lógica de envío del formulario
            console.log('Registro enviado');
            
            // Mostrar mensaje de éxito
            showNotification('¡Registro exitoso! Te contactaremos pronto.');
        } catch (error) {
            console.error('Error en el registro:', error);
            showNotification('Hubo un error en el registro. Por favor, intenta nuevamente.', 'error');
        }
    });
}

// Utilidad para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Función para manejar el zoom de imágenes
function initImageZoom() {
    // Crear el modal de zoom
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    document.body.appendChild(zoomModal);

    // Manejar click en imágenes de galerías
    document.querySelectorAll('.mosaic-item img, .gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            zoomModal.innerHTML = '';
            zoomModal.appendChild(modalImg);
            zoomModal.classList.add('active');
        });
    });

    // Cerrar modal al hacer click
    zoomModal.addEventListener('click', function() {
        this.classList.remove('active');
    });
}

// Función para cargar la galería
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = ''; // Limpiar la galería existente
    
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="gallery-overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}
  

// Función para mostrar el botón de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/56948181288';
    whatsappButton.target = '_blank';
    whatsappButton.className = 'floating-whatsapp';
    whatsappButton.innerHTML = '<i class="ri-whatsapp-line"></i>';
    document.body.appendChild(whatsappButton);
});

// Funcionalidad de la galería de videos
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.video-card');
    const mainVideo = document.getElementById('videoActual');

    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.dataset.video) {
                const videoId = this.dataset.video;
                mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                
                // Scroll suave al video principal
                mainVideo.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Inicialización de EmailJS
(function() {
    emailjs.init("TU_USER_ID");
})();

// Modal creativa para galería
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.galeria-mosaico img');
    const modal = document.getElementById('modal-galeria');
    const modalImg = document.getElementById('modal-img');
    const cerrarModal = document.getElementById('cerrar-modal');
    const fondoModal = document.getElementById('modal-fondo');

    imagenes.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('activa');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    cerrarModal.addEventListener('click', () => {
        modal.classList.remove('activa');
        modalImg.src = '';
    });

    fondoModal.addEventListener('click', () => {
        modal.classList.remove('activa');
        modalImg.src = '';
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('activa')) {
            modal.classList.remove('activa');
            modalImg.src = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal de contacto
    const abrirContacto = document.getElementById('abrir-contacto-modal');
    const modalContacto = document.getElementById('modal-contacto');
    const cerrarContacto = document.getElementById('cerrar-contacto-modal');
    const fondoContacto = document.getElementById('fondo-contacto-modal');

    if(abrirContacto && modalContacto && cerrarContacto && fondoContacto){
        abrirContacto.addEventListener('click', () => {
            modalContacto.style.display = 'flex';
        });
        cerrarContacto.addEventListener('click', () => {
            modalContacto.style.display = 'none';
        });
        fondoContacto.addEventListener('click', () => {
            modalContacto.style.display = 'none';
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContacto.style.display === 'flex') {
                modalContacto.style.display = 'none';
            }
        });
    }

    // Envío de formulario con EmailJS
    const form = document.getElementById('contact-form');
    if(form){
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            sendEmail();
        });
    }
});

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
