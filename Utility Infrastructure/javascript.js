// Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let sliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

// Settings
let timeRunning = 2000;
let timeAutoNext = 20000;

// Variables
let runTimeOut;
let runNextAuto;
let isSliding = false;
let viewedSlides = new Set(); // Track viewed slides

// Initialize thumbnails
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0].cloneNode(true));
thumbnailItemsDom[0].classList.add('active');

// Mark first slide as viewed
viewedSlides.add(0);

// Event Listeners
nextDom.onclick = function() {
    if (isSliding) return;
    showSlider('next');
};

prevDom.onclick = function() {
    if (isSliding) return;
    showSlider('prev');
};

// Initialize auto-slide
runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Main slider function
function showSlider(type) {
    isSliding = true;
    let sliderItemsDom = sliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = document.querySelectorAll('.thumbnail .item');
    
    // Remove active class from current thumbnail
    thumbnailItemsDom.forEach(item => item.classList.remove('active'));
    
    if(type === 'next') {
        // Prepare next slide
        let currentSlide = sliderItemsDom[0];
        let nextSlide = sliderItemsDom[1];
        
        // Set up transitions
        nextSlide.style.transform = 'scale(1.1)';
        nextSlide.style.opacity = '0';
        
        setTimeout(() => {
            nextSlide.style.transform = 'scale(1)';
            nextSlide.style.opacity = '1';
            currentSlide.style.transform = 'scale(1.1)';
            currentSlide.style.opacity = '0';
            
            // Move slides in DOM
            sliderDom.appendChild(currentSlide);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            
            // Update active thumbnail
            thumbnailItemsDom[1].classList.add('active');

            // Track viewed slides
            const nextIndex = Array.from(sliderItemsDom).indexOf(nextSlide);
            viewedSlides.add(nextIndex);

            // Show content immediately if slide was previously viewed
            if (viewedSlides.has(nextIndex)) {
                const content = nextSlide.querySelector('.content');
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }
        }, 100);
        
    } else {
        // Prepare previous slide
        let lastSlide = sliderItemsDom[sliderItemsDom.length - 1];
        let currentSlide = sliderItemsDom[0];
        
        // Set up transitions
        lastSlide.style.transform = 'scale(1.1)';
        lastSlide.style.opacity = '0';
        
        setTimeout(() => {
            lastSlide.style.transform = 'scale(1)';
            lastSlide.style.opacity = '1';
            currentSlide.style.transform = 'scale(1.1)';
            currentSlide.style.opacity = '0';
            
            // Move slides in DOM
            sliderDom.prepend(lastSlide);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            
            // Update active thumbnail
            thumbnailItemsDom[thumbnailItemsDom.length - 2].classList.add('active');

            // Track viewed slides
            const lastIndex = Array.from(sliderItemsDom).indexOf(lastSlide);
            viewedSlides.add(lastIndex);

            // Show content immediately if slide was previously viewed
            if (viewedSlides.has(lastIndex)) {
                const content = lastSlide.querySelector('.content');
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            }
        }, 100);
    }

    // Reset transitions after animation
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        isSliding = false;
    }, timeRunning);

    // Reset auto-slide timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
    
    // Animate progress bar
    timeDom.style.width = '100%';
    setTimeout(() => {
        timeDom.style.width = '0';
    }, 50);
}

// Add click handlers for thumbnails
thumbnailItemsDom.forEach((item, index) => {
    item.onclick = function() {
        if (isSliding) return;
        let currentIndex = Array.from(thumbnailItemsDom).indexOf(document.querySelector('.thumbnail .item.active'));
        let clickedIndex = Array.from(thumbnailItemsDom).indexOf(this);
        
        if (currentIndex === clickedIndex) return;
        
        let direction = clickedIndex > currentIndex ? 'next' : 'prev';
        showSlider(direction);
    };
});