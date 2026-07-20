// Modern JavaScript with enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll functionality with modern implementation
    const smoothScroll = (target, duration = 800) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Enhanced navbar functionality
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    let scrollTimeout;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Clear the timeout
        clearTimeout(scrollTimeout);
        
        // Add/remove classes based on scroll direction
        if (currentScroll <= 0) {
            navbar.classList.remove('hidden');
            navbar.classList.remove('scroll-up');
        } else if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        // Set a timeout to hide navbar after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (currentScroll > 100) {
                navbar.classList.add('hidden');
            }
        }, 1500);

        lastScroll = currentScroll;
    };

    // Throttle scroll event for better performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Enhanced image gallery with modern features
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        // Add intersection observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(container);

        // Add modern hover effect
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-10px)';
            container.style.boxShadow = '0 15px 30px rgba(239, 187, 32, 0.3)';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateY(0)';
            container.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        // Add double-click functionality
        let lastClick = 0;
        
        container.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastClick;
            
            if (timeDiff < 300 && timeDiff > 0) {
                // Double click detected
                const targetUrl = container.getAttribute('data-target');
                if (targetUrl) {
                    window.location.href = targetUrl;
                }
            }
            
            lastClick = currentTime;
        });
    });

    // Modern form handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            try {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="loading">Sending...</span>';
                
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }

    // Modern notification system
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger reflow
        notification.offsetHeight;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('.content-section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
});
