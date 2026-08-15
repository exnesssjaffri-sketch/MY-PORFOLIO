/* ============================================
   SYED ALI HAIDER JAFFRI - Landing Page Scripts
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
        // Fallback: hide preloader after 3 seconds regardless
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
            }
        }, 3000);
    }

    // ========== MOBILE NAV TOGGLE ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close nav when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    // Call once on load
    updateActiveLink();

    // ========== SCROLL REVEAL ANIMATIONS ==========
    // Elements with data-aos attribute will animate in on scroll
    const revealElements = document.querySelectorAll('[data-aos]');

    // Map AOS-style animations to CSS classes
    const aosClasses = {
        'fade-up': 'aos-fade-up',
        'fade-down': 'aos-fade-down',
        'fade-right': 'aos-fade-right',
        'fade-left': 'aos-fade-left',
        'zoom-in': 'aos-zoom-in'
    };

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const aosType = entry.target.getAttribute('data-aos');
                    const delay = entry.target.getAttribute('data-aos-delay') || '0';
                    const animationClass = aosClasses[aosType] || 'aos-fade-up';

                    entry.target.classList.add(animationClass);
                    entry.target.style.transitionDelay = `${delay}ms`;
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show all elements
        revealElements.forEach(el => {
            const aosType = el.getAttribute('data-aos');
            const animationClass = aosClasses[aosType] || 'aos-fade-up';
            el.classList.add(animationClass);
        });
    }

    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounters() {
        statNumbers.forEach(counter => {
            const counterPosition = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight - 100;

            if (counterPosition < screenPosition && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = parseInt(counter.getAttribute('data-count'));
                let currentCount = 0;
                const increment = Math.ceil(target / 60);
                const duration = 1500;
                const stepTime = Math.floor(duration / target);

                function updateCounter() {
                    currentCount += increment;
                    if (currentCount >= target) {
                        counter.textContent = target + '+';
                        return;
                    }
                    counter.textContent = currentCount;
                    setTimeout(updateCounter, stepTime);
                }

                updateCounter();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
    setTimeout(animateCounters, 1000);

    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== PARALLAX EFFECT ON HERO (Mouse Move) ==========
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');

    if (heroSection && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;

            if (heroContent) {
                heroContent.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
            if (heroBg) {
                heroBg.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
            }
            if (heroBg) {
                heroBg.style.transform = 'translate(0, 0)';
            }
        });
    }

    // ========== CONSOLE WELCOME ==========
    console.log('%c Syed Ali Haider Jaffri - Landing Page ', 'background: #38bdf8; color: #0f172a; font-size: 1.2rem; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Built with ❤️ using HTML, CSS & JavaScript ', 'color: #94a3b8; font-size: 0.9rem;');

    console.log('🚀 Welcome! Let\'s build something amazing together.');
    console.log('📧 alijaffri4255@gmail.com');

});