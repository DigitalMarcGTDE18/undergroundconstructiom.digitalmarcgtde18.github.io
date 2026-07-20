// Redirect function with click animation effect
function goToLink(url) {}
    window.location.href = url;
// Function for smooth scroll to sections and handle active state
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to open links in new tabs
function goToLink(url) {
    window.open(url, '_blank');
}

// Optional: Dynamic Tooltip Hover Effect
document.querySelectorAll('.image-container').forEach(container => {
    const tooltipText = container.querySelector('.image-overlay h3').innerText
    container.setAttribute('title', tooltipText);
});



let lastScrollTop = 0; // To keep track of the scroll direction
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // If scrolling down, hide the navbar
    if (currentScroll > lastScrollTop) {
        navbar.classList.add('hidden');
    } else {
        // If scrolling up, show the navbar
        navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});
const ham= document.querySelector('.header .nav-bar .ham')
const nav= document.querySelector('.header .nav-bar .nav')

ham.addEventListener('click', () => {
    nav.classList.toggle('nav-toggle');
    ham.classList.toggle('close');
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle mobile navigation menu
const menuBar = document.getElementById('menu-bar');

menuBar.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBar.classList.toggle('fa-times');
});

// Close navbar when a link is clicked (for mobile)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBar.classList.remove('fa-times');
    });
});

// Scroll animations (fade-in effect)
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

fadeElements.forEach(element => {
    observer.observe(element);
});

// Back-to-top button
const backToTopButton = document.createElement('div');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Image zoom effect on hover
const serviceImages = document.querySelectorAll('.services-images img');

serviceImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
        image.style.transition = 'transform 0.3s ease';
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Services section animations and interactions
const serviceCards = document.querySelectorAll('.inner-services');

serviceCards.forEach(card => {
    const image = card.querySelector('.services-images img');
    
    // Add hover effect for the entire card
    card.addEventListener('mouseenter', () => {
        // Only scale the image
        image.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        // Reset image transformation
        image.style.transform = 'scale(1)';
    });

    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1
    });

    // Set initial styles for animation
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.6s ease';
    
    // Observe the card for scroll reveal
    observer.observe(card);
});

// Add parallax effect to service images only
window.addEventListener('scroll', () => {
    const serviceImages = document.querySelectorAll('.services-images img');
    
    serviceImages.forEach(image => {
        const speed = 0.2; // Reduced speed for smoother effect
        const yPos = -(window.pageYOffset * speed);
        image.style.transform = `translateY(${yPos}px)`;
    });
});

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Enhanced Mobile Navigation
const sidebar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.close-sidebar-button');

const toggleSidebar = () => {
    sidebar.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
};

menuButton.addEventListener('click', toggleSidebar);
closeButton.addEventListener('click', toggleSidebar);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close sidebar on mobile after clicking a link
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }
    });
});

// Parallax Effect for Background Images
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced Image Loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Dynamic Counter Animation
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Enhanced Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitButton.textContent = 'Sent!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
});

// Dynamic Content Loading
const loadMoreContent = () => {
    const loadMoreButton = document.querySelector('.load-more');
    if (!loadMoreButton) return;
    
    loadMoreButton.addEventListener('click', function() {
        this.classList.add('loading');
        this.textContent = 'Loading...';
        
        // Simulate content loading (replace with actual API call)
        setTimeout(() => {
            // Add new content here
            this.classList.remove('loading');
            this.textContent = 'Load More';
        }, 1500);
    });
};

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    loadMoreContent();
});