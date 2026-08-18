/* ============================================
   PROFESSIONAL BACKGROUND ANIMATIONS - JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // ========== PARTICLE NETWORK CANVAS ==========
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Particle configuration
        const config = {
            particleCount: window.innerWidth < 768 ? 40 : 80,
            maxDistance: 150,
            particleColor: '56, 189, 248',
            lineColor: '56, 189, 248',
            lineOpacity: 0.15,
            particleSize: 2,
            speed: 0.5
        };

        // Resize canvas to fill screen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Create particles
        function createParticles() {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * config.speed,
                    vy: (Math.random() - 0.5) * config.speed,
                    size: Math.random() * config.particleSize + 0.5
                });
            }
        }

        // Draw particles and connections
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections first
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.maxDistance) {
                        const opacity = (1 - distance / config.maxDistance) * config.lineOpacity;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${config.particleColor}, 0.8)`;
                ctx.fill();

                // Add glow effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${config.particleColor}, 0.1)`;
                ctx.fill();
            });
        }

        // Update particle positions
        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -1;
                }
            });
        }

        // Animation loop
        function animate() {
            updateParticles();
            drawParticles();
            animationId = requestAnimationFrame(animate);
        }

        // Mouse interaction - particles react to mouse
        let mouseX = null;
        let mouseY = null;

        canvas.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        canvas.addEventListener('mouseleave', () => {
            mouseX = null;
            mouseY = null;
        });

        // Add mouse repulsion/attraction in update
        const originalUpdate = updateParticles;
        updateParticles = function() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction
                if (mouseX !== null && mouseY !== null) {
                    const dx = particle.x - mouseX;
                    const dy = particle.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const mouseRadius = 100;

                    if (distance < mouseRadius) {
                        const force = (mouseRadius - distance) / mouseRadius;
                        particle.x += (dx / distance) * force * 2;
                        particle.y += (dy / distance) * force * 2;
                    }
                }

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -1;
                }
            });
        };

        // Initialize
        resizeCanvas();
        createParticles();

        if (!isReducedMotion) {
            animate();
        } else {
            // Draw static particles if reduced motion
            drawParticles();
        }

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 200);
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }

    // ========== PARALLAX ON SCROLL FOR ORBS ==========
    const orbs = document.querySelectorAll('.bg-orb');
    if (orbs.length > 0 && window.innerWidth > 768) {
        let scrollY = 0;

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;

            orbs.forEach((orb, index) => {
                const speed = 0.05 + (index * 0.02);
                const yOffset = scrollY * speed;
                orb.style.marginTop = `${yOffset}px`;
            });
        }, { passive: true });
    }

    // ========== CONSOLE LOG ==========
    console.log('%c ✨ Background Animations Loaded ', 'background: #38bdf8; color: #0f172a; font-size: 0.9rem; font-weight: bold; padding: 5px 10px; border-radius: 4px;');

});