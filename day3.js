// Set Chart.js defaults
Chart.defaults.color = '#f5e6cc';
Chart.defaults.font.family = "'Cinzel', serif";
Chart.defaults.scale.grid.color = 'rgba(213, 162, 111, 0.1)';

// Register the datalabels plugin
Chart.register(ChartDataLabels);

// Define chart colors
const pandavaColor = '#4B9CD3';
const kauravaColor = '#C94C4C';
const goldColor = '#d5a26f';
const accentColor = '#8c6239';

// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
    // Add blood drip elements
    createBloodDrips();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize charts and visualizations
    initializeCharts();
});

// Create blood drip elements
function createBloodDrips() {
    const bloodDripContainer = document.querySelector('.blood-drip-container');
    if (!bloodDripContainer) return;
    
    // Clear existing drips
    bloodDripContainer.innerHTML = '';
    
    // Create 12 blood drips
    for (let i = 0; i < 12; i++) {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        bloodDripContainer.appendChild(drip);
    }
}

// Initialize back to top button
function initBackToTop() {
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);
    
    // Show button when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize charts and visualizations
function initializeCharts() {
    // You can add chart initializations here
    // For example:
    
    // Casualty breakdown chart
    const casualtyBreakdownChart = document.getElementById('casualtyBreakdownChart');
    if (casualtyBreakdownChart) {
        new Chart(casualtyBreakdownChart, {
            type: 'bar',
            data: {
                labels: ['Infantry', 'Cavalry', 'Chariots', 'Elephants'],
                datasets: [
                    {
                        label: 'Pandava Losses',
                        data: [30000, 18000, 10000, 4000],
                        backgroundColor: 'rgba(75, 156, 211, 0.7)',
                        borderColor: pandavaColor,
                        borderWidth: 1
                    },
                    {
                        label: 'Kaurava Losses',
                        data: [55000, 32000, 21000, 7000],
                        backgroundColor: 'rgba(201, 76, 76, 0.7)',
                        borderColor: kauravaColor,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Casualties',
                            color: goldColor
                        },
                        ticks: {
                            callback: function(value) {
                                if (value >= 1000) {
                                    return value / 1000 + 'k';
                                }
                                return value;
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat().format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Add more chart initializations as needed
}