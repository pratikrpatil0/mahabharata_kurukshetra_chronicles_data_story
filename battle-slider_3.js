// Battle image slider functionality
let slideIndex = 1;

// Execute after document loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the slider
    showSlides(slideIndex);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Handle wrapping around
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Show the current slide and activate its dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active-dot";
}

// Fullscreen functionality
function openFullscreen(imageSrc) {
    // Set the image source
    document.getElementById('fullscreen-image').src = imageSrc;
    
    // Show the overlay
    const overlay = document.getElementById('fullscreen-overlay');
    document.body.appendChild(overlay); // Move to end of body to ensure proper stacking
    overlay.style.display = 'flex';
    
    // Small delay to ensure transition works
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Add ESC key listener
    document.addEventListener('keydown', handleEscKey);
}

function closeFullscreen() {
    // Hide the overlay
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('active');
    overlay.style.display = 'none'; // Add this line to ensure it's hidden
    
    // Re-enable scrolling
    document.body.style.overflow = ''; // Use empty string to reset to default
    document.body.style.overflowY = 'auto'; // Explicitly set vertical scrolling
    
    // Remove ESC key listener
    document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
}

// Close fullscreen when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            // Only close if clicking the background (not the image)
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
    }
});

// Add this function to toggle slider size
function toggleSliderSize() {
    const slider = document.querySelector('.battle-slider');
    const button = document.querySelector('.expand-toggle');
    
    if (slider.classList.contains('expanded')) {
        slider.classList.remove('expanded');
        button.textContent = 'Expand Images';
    } else {
        slider.classList.add('expanded');
        button.textContent = 'Collapse Images';
    }
}