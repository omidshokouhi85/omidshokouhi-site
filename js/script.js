window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // صفحه از cache برگشته - همه عکس‌ها رو force reload کن
        document.querySelectorAll('img').forEach(img => {
            const src = img.src;
            img.src = '';
            img.src = src;
        });
    }
});

// Modular UI Architecture for Portfolio
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Architecture
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling & Navigation Interactivity
    const links = document.querySelectorAll('.nav-links a, .hero-actions a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Close mobile menu if open
                    navLinks.classList.remove('open');
                    if (menuToggle) menuToggle.classList.remove('active');

                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const options = {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px"
    };

    // Intersection Observer for Section Activation
    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px"
    });

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove('active'));
                const contactLink = document.querySelector('.nav-links a[href="#contact"]');
                if (contactLink) contactLink.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        if (section.tagName === 'FOOTER') {
            footerObserver.observe(section);
        } else {
            observer.observe(section);
        }
    });
});


// ===== CERTIFICATE GALLERY =====

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".certificate-card");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let current = 0;

    function updateCards() {
        cards.forEach(card => card.classList.remove("active-card"));
        cards[current].classList.add("active-card");
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            current++;
            if (current >= cards.length)
                current = 0;
            updateCards();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            current--;
            if (current < 0)
                current = cards.length - 1;
            updateCards();
        });
    }

    setInterval(() => {
        current++;
        if (current >= cards.length)
            current = 0;
        updateCards();
    }, 5000);


    /* ========= MODAL ========= */

    const modal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.getElementById("closeModal");
    const zoomBtn = document.getElementById("zoomBtn");
    const rotateBtn = document.getElementById("rotateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    let zoom = 1;
    let rotate = 0;

    function updateTransform() {
        modalImage.style.transform =
            `scale(${zoom}) rotate(${rotate}deg)`;
    }

    cards.forEach(card => {
        const img = card.querySelector("img");

        img.addEventListener("click", () => {

            modal.classList.add("active");

            modalImage.src = img.src;
            downloadBtn.href = img.src;

            zoom = 1;
            rotate = 0;

            updateTransform();
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    zoomBtn.addEventListener("click", () => {
        zoom += 0.25;
        if (zoom > 3)
            zoom = 1;

        updateTransform();
    });

    rotateBtn.addEventListener("click", () => {
        rotate += 90;
        updateTransform();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("active");
        }
    });

    updateCards();
});