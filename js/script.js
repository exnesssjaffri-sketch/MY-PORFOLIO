/* ============================================
   SYED ALI HAIDER JAFFRI - Portfolio Scripts
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

    // ========== AOS INITIALIZATION ==========
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

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

    // ========== TYPING EFFECT ==========
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const roles = [
            'Web Developer',
            'Graphic Designer',
            'Digital Marketer',
            'Prompt Engineer'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 300; // Pause before typing next
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing after a short delay
        setTimeout(typeEffect, 1000);
    }

    // ========== SKILL BARS ANIMATION ==========
    const skillCards = document.querySelectorAll('.skill-card');

    function animateSkillBars() {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight - 100;

            if (cardPosition < screenPosition) {
                const skillPercent = card.getAttribute('data-skill');
                const barFill = card.querySelector('.skill-bar-fill');
                if (barFill && skillPercent) {
                    barFill.style.width = skillPercent + '%';
                }
            }
        });
    }

    // Run on scroll and on load
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    // Also run after AOS animations might have fired
    setTimeout(animateSkillBars, 1000);

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

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success message (since this is a static site, we simulate)
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    const existingMsg = document.querySelector('.form-message');
                    if (existingMsg) existingMsg.remove();
                }, 5000);
            }, 1500);
        });

        function showFormMessage(text, type) {
            // Remove any existing message
            const existingMsg = document.querySelector('.form-message');
            if (existingMsg) existingMsg.remove();

            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message form-message-${type}`;
            messageDiv.textContent = text;

            // Style the message
            messageDiv.style.cssText = `
                padding: 0.8rem 1.2rem;
                margin-top: 1rem;
                border-radius: 6px;
                font-weight: 500;
                font-size: 0.9rem;
                text-align: center;
                animation: fadeInUp 0.3s ease;
            `;

            if (type === 'error') {
                messageDiv.style.background = 'rgba(239, 68, 68, 0.15)';
                messageDiv.style.color = '#fca5a5';
                messageDiv.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            } else {
                messageDiv.style.background = 'rgba(34, 197, 94, 0.15)';
                messageDiv.style.color = '#86efac';
                messageDiv.style.border = '1px solid rgba(34, 197, 94, 0.3)';
            }

            contactForm.appendChild(messageDiv);
        }
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
    const heroOverlay = document.querySelector('.hero-overlay');

    if (heroSection && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;

            if (heroContent) {
                heroContent.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
            if (heroOverlay) {
                heroOverlay.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
            }
            if (heroOverlay) {
                heroOverlay.style.transform = 'translate(0, 0)';
            }
        });
    }

    // ========== CONSOLE WELCOME ==========
    console.log('%c Syed Ali Haider Jaffri Portfolio ', 'background: #38bdf8; color: #0f172a; font-size: 1.2rem; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Built with ❤️ using HTML, CSS & JavaScript ', 'color: #94a3b8; font-size: 0.9rem;');

    console.log('🚀 Welcome! Let\'s build something amazing together.');
    console.log('📧 exnesssjaffri@gmail.com');

});