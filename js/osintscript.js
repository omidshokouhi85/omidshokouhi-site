
    // Modular UI Architecture for Portfolio

    document.addEventListener('DOMContentLoaded', () => {
    // این خط رو اضافه کن:
    if (!document.querySelector('.article-container')) return;
    
    // بقیه کدها دست نخور...
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

    // Intersection Observer for Section Activation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const options = {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px"
    };

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
    }, options);

    sections.forEach(section => observer.observe(section));
});
