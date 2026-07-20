// Redirect function with click animation effect
function goToLink(url) {}
    window.location.href = url;
// Function for smooth scroll to sections
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
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
function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    // Toggle active class for both nav-links and hamburger
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

const ham= document.querySelector('.header .nav-bar .ham')
const nav= document.querySelector('.header .nav-bar .nav')

ham.addEventListener('click', () => {
    nav.classList.toggle('nav-toggle');
    ham.classList.toggle('close');
});

// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    });
});

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Parallax Effect for Background Images
const parallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};

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
        }
    });
});

// Dynamic Counter Animation
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const count = parseInt(element.innerText);
    const increment = target / 200;

    if (count < target) {
        element.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(element), 1);
    } else {
        element.innerText = target;
    }
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Image Loading Animation
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    imageObserver.observe(img);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile Navigation Enhancement
const sidebar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.close-sidebar-button');

menuButton.addEventListener('click', () => {
    sidebar.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
    document.body.style.overflow = '';
});

// Add scroll event listeners
window.addEventListener('scroll', () => {
    scrollReveal();
    parallax();
});

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
    parallax();
});