// Simplified day2_1.js - Only handle toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    console.log("Day 2 battlefield dashboard initialized");
    
    // Initialize toggle buttons
    initializeToggleButtons();
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