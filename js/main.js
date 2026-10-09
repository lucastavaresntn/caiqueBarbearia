/**
 * CAIQUE BARBEARIA - Main JavaScript
 * Responsabilidades: Interatividade, Animações e UX
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navegação & Header ---
    const header = document.querySelector('.main-header');
    const mobileMenu = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Animações de Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Lightbox (Galeria) ---
    const lightbox = document.getElementById('lightbox');
    const lbImg = lightbox.querySelector('img');
    const lbClose = document.querySelector('.close-lightbox');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentImgIndex = 0;
    const images = Array.from(galleryItems).map(item => item.dataset.full);

    const openLightbox = (index) => {
        currentImgIndex = index;
        lbImg.src = images[currentImgIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lbClose.addEventListener('click', closeLightbox);

    lbPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        lbImg.src = images[currentImgIndex];
    });

    lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImgIndex = (currentImgIndex + 1) % images.length;
        lbImg.src = images[currentImgIndex];
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lbPrev.click();
        if (e.key === 'ArrowRight') lbNext.click();
    });

    // --- Carrossel de Avaliações ---
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.nav-btn.next');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    const slides = document.querySelectorAll('.testimonial-card');

    let currentSlide = 0;

    const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 30; // gap definido no CSS
        const moveAmount = currentSlide * (slideWidth + gap);
        track.style.transform = `translateX(-${moveAmount}px)`;

        // Atualizar dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    const createDots = () => {
        const totalSlides = slides.length;
        // Número de dots depende de quantos slides existem menos os visíveis
        // Para simplificar, criaremos um dot por slide
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    };

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    createDots();
    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // --- Botão Voltar ao Topo ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
