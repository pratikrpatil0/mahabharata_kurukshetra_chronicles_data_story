// Updated for Day 1 battlefield dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log("Day 1 battlefield dashboard initialized");
    
    // Initialize toggle buttons
    initializeToggleButtons();
    
    // Set force composition
    const pandavaBar = document.querySelector('.pandava-segment');
    const kauravaBar = document.querySelector('.kaurava-segment');
    if (pandavaBar && kauravaBar) {
        // Army ratio - Pandava: 40% (1.6M), Kaurava: 60% (2.4M)
        console.log("Setting army proportion visualizations");
    }
});

// Initialize toggle buttons
function initializeToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const dataSections = document.querySelectorAll('.data-section');
    
    console.log(`Found ${toggleButtons.length} toggle buttons`);
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            console.log(`Toggle button clicked: ${targetId}`);
            
            // Hide all sections
            dataSections.forEach(section => section.classList.remove('active'));
            
            // Deactivate all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Show target section
            document.getElementById(targetId).classList.add('active');
            
            // Activate this button
            this.classList.add('active');
        });
    });
}