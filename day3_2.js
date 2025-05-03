// Combat statistics dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const dashboardViews = document.querySelectorAll('.dashboard-view');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            dashboardViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetView + '-view') {
                    view.classList.add('active');
                }
            });
            
            // Trigger animations for the active view
            if (targetView === 'chart') {
                initializeChart();
            } else if (targetView === 'comparison') {
                animateComparisonBars();
                initializeRadarChart();
            } else if (targetView === 'impact') {
                animateImpactCards();
                initializeHeatmap();
            }
        });
    });
    
    // Initialize the default view
    const defaultView = document.querySelector('.dashboard-view.active');
    if (defaultView) {
        if (defaultView.id === 'chart-view') {
            initializeChart();
        } else if (defaultView.id === 'comparison-view') {
            animateComparisonBars();
            initializeRadarChart();
        } else if (defaultView.id === 'impact-view') {
            animateImpactCards();
            initializeHeatmap();
        }
    } else {
        // Fallback - initialize chart view
        initializeChart();
    }
});

// Initialize main chart
function initializeChart() {
    if (window.combatChart) {
        window.combatChart.destroy();
    }
    
    const ctx = document.getElementById('combat-chart');
    if (!ctx) return;
    
    window.combatChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['🏹', '🗡️', '🔱', '🪓', '🐘', '🛞', '🐎', '👥'],
            datasets: [{
                label: 'Weapon Usage',
                data: [1800000, 500000, 350000, 150000, 50000, 130000, 400000, 2500000],
                backgroundColor: [
                    'rgba(213, 162, 111, 0.7)',
                    'rgba(213, 162, 111, 0.65)',
                    'rgba(213, 162, 111, 0.6)',
                    'rgba(213, 162, 111, 0.55)',
                    'rgba(213, 162, 111, 0.5)',
                    'rgba(213, 162, 111, 0.45)',
                    'rgba(213, 162, 111, 0.4)',
                    'rgba(213, 162, 111, 0.35)'
                ],
                borderColor: [
                    'rgba(213, 162, 111, 1)',
                    'rgba(213, 162, 111, 0.9)',
                    'rgba(213, 162, 111, 0.8)',
                    'rgba(213, 162, 111, 0.7)',
                    'rgba(213, 162, 111, 0.6)',
                    'rgba(213, 162, 111, 0.5)',
                    'rgba(213, 162, 111, 0.4)',
                    'rgba(213, 162, 111, 0.3)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            if (value >= 1000000) {
                                return (value / 1000000).toFixed(1) + ' million';
                            } else if (value >= 1000) {
                                return (value / 1000).toFixed(1) + 'k';
                            }
                            return value;
                        },
                        title: function(context) {
                            const labels = ['Arrows', 'Swords', 'Spears', 'Maces', 'Elephants', 'Chariots', 'Horses', 'Infantry'];
                            return labels[context[0].dataIndex];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)',
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return (value / 1000000) + 'M';
                            } else if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
                        },
                        color: '#f5e6cc'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#f5e6cc',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });
}

// Initialize radar chart for weapon comparison
function initializeRadarChart() {
    if (window.weaponRadarChart) {
        window.weaponRadarChart.destroy();
    }
    
    const ctx = document.getElementById('weapons-radar-chart');
    if (!ctx) return;
    
    window.weaponRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Lethality', 
                'Range', 
                'Production Speed',
                'Versatility',
                'Skill Required'
            ],
            datasets: [
                {
                    label: 'Arrows',
                    data: [70, 95, 85, 60, 80],
                    fill: true,
                    backgroundColor: 'rgba(213, 162, 111, 0.2)',
                    borderColor: 'rgba(213, 162, 111, 0.8)',
                    pointBackgroundColor: 'rgba(213, 162, 111, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(213, 162, 111, 1)'
                },
                {
                    label: 'Swords',
                    data: [85, 20, 60, 75, 90],
                    fill: true,
                    backgroundColor: 'rgba(185, 130, 95, 0.2)',
                    borderColor: 'rgba(185, 130, 95, 0.8)',
                    pointBackgroundColor: 'rgba(185, 130, 95, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(185, 130, 95, 1)'
                },
                {
                    label: 'Spears',
                    data: [75, 50, 65, 80, 60],
                    fill: true,
                    backgroundColor: 'rgba(156, 108, 80, 0.2)',
                    borderColor: 'rgba(156, 108, 80, 0.8)',
                    pointBackgroundColor: 'rgba(156, 108, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(156, 108, 80, 1)'
                },
                {
                    label: 'Maces',
                    data: [90, 15, 50, 60, 75],
                    fill: true,
                    backgroundColor: 'rgba(120, 85, 70, 0.2)',
                    borderColor: 'rgba(120, 85, 70, 0.8)',
                    pointBackgroundColor: 'rgba(120, 85, 70, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(120, 85, 70, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f5e6cc',
                        font: {
                            family: 'Cinzel'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItem) {
                            return tooltipItem[0].label;
                        },
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/100';
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(213, 162, 111, 0.2)'
                    },
                    grid: {
                        color: 'rgba(213, 162, 111, 0.2)'
                    },
                    pointLabels: {
                        color: '#f5e6cc',
                        font: {
                            family: 'Cinzel'
                        }
                    },
                    ticks: {
                        color: 'rgba(213, 162, 111, 0.8)',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}

// Initialize heatmap
function initializeHeatmap() {
    const heatmapCells = document.querySelectorAll('.heatmap-cell');
    
    heatmapCells.forEach(cell => {
        const value = parseInt(cell.getAttribute('data-value'));
        const colorIntensity = Math.min(value / 100, 1);
        
        // Create color gradient from light to dark
        const red = Math.floor(156 + (213 - 156) * (1 - colorIntensity));
        const green = Math.floor(85 + (162 - 85) * (1 - colorIntensity));
        const blue = Math.floor(56 + (111 - 56) * (1 - colorIntensity));
        
        cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${0.5 + colorIntensity * 0.4})`;
        cell.textContent = value + '%';
        
        // Add tooltip with more information
        cell.setAttribute('title', `Effectiveness: ${value}%`);
        
        // Add click event for additional info
        cell.addEventListener('click', function() {
            // Show animated pulse effect when clicked
            this.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Animate comparison bars
function animateComparisonBars() {
    const progressBars = document.querySelectorAll('.weapon-progress');
    const maxValue = 1800000; // Highest value (arrows)
    
    progressBars.forEach(bar => {
        const value = parseInt(bar.getAttribute('data-value'));
        const percentage = (value / maxValue) * 100;
        
        // Reset width first
        bar.style.width = '0%';
        
        // Animate after a tiny delay
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 100);
    });
}

// Animate impact cards
function animateImpactCards() {
    const cards = document.querySelectorAll('.impact-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}