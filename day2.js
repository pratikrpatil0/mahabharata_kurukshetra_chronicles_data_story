// day2.js - Add this to your existing code
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded successfully");
    
    // Initialize the slider
    showSlides(1);
    
    // Load the battlefield analytics
    loadBattlefieldAnalytics();
});

function loadBattlefieldAnalytics() {
    const container = document.getElementById('battlefield-analytics-container');
    if (!container) return;
    
    // Load CSS if not already loaded
    if (!document.querySelector('link[href="day2_1.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'day2_1.css';
        document.head.appendChild(link);
    }
    
    // Then fetch and insert the HTML content
    fetch('day2_1.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load battlefield analytics');
            return response.text();
        })
        .then(html => {
            document.getElementById('battlefield-analytics-container').innerHTML = html;
            console.log("Battlefield analytics HTML loaded successfully");
            
            // Execute toggle functionality directly, don't wait for external script
            const toggleButtons = document.querySelectorAll('.toggle-btn');
            const dataSections = document.querySelectorAll('.data-section');
            
            if (toggleButtons.length > 0 && dataSections.length > 0) {
                console.log("Initializing toggle buttons: " + toggleButtons.length + " buttons found");
                
                toggleButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const targetId = this.getAttribute('data-target');
                        console.log("Toggle clicked: " + targetId);
                        
                        // Hide all sections
                        dataSections.forEach(section => {
                            section.classList.remove('active');
                        });
                        
                        // Remove active state from all buttons
                        toggleButtons.forEach(btn => {
                            btn.classList.remove('active');
                        });
                        
                        // Show target section
                        document.getElementById(targetId).classList.add('active');
                        
                        // Set this button as active
                        this.classList.add('active');
                    });
                });
            } else {
                console.error("Toggle buttons or data sections not found!");
            }
            
            // Still load the JS file for other functionality
            const script = document.createElement('script');
            script.src = 'day2_1.js';
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error("Error loading battlefield analytics:", error);
            document.getElementById('battlefield-analytics-container').innerHTML = 
                '<div class="error-message" style="padding: 20px; color: #d5a26f; text-align: center;">Error loading battlefield analytics. Please refresh the page.</div>';
        });
}