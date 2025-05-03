document.addEventListener('DOMContentLoaded', function() {
    console.log("Casualty dashboard initializing...");
    
    // Check if CSS is loaded
    ensureStyles();
    
    // Set up tab switching
    setupTabs();
    
    // Initialize casualties chart
    setTimeout(initializeCasualtiesChart, 300);
    
    // Add entry animations
    animateEntryElements();
});

function ensureStyles() {
    // Add CSS if missing
    if (!document.querySelector('link[href="day3_4.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'day3_4.css';
        document.head.appendChild(link);
        console.log("Casualty dashboard CSS added");
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.view-tab');
    const views = document.querySelectorAll('.dashboard-view');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            const targetView = this.getAttribute('data-view');
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetView + '-view') {
                    view.classList.add('active');
                }
            });
        });
    });
}

function initializeCasualtiesChart() {
    if (typeof Chart === 'undefined') {
        console.error("Chart.js not loaded! Loading now...");
        loadChartJS(initializeCasualtiesChart);
        return;
    }
    
    const ctx = document.getElementById('casualties-chart');
    if (!ctx) {
        console.error("Cannot find casualties chart element");
        return;
    }
    
    // Data for casualties
    const data = {
        labels: ['Chariots', 'Elephants', 'Cavalry', 'Infantry'],
        datasets: [
            {
                label: 'Pandavas',
                data: [10000, 3000, 12000, 95000],
                backgroundColor: 'rgba(100, 149, 237, 0.7)',
                borderColor: 'rgba(100, 149, 237, 1)',
                borderWidth: 1
            },
            {
                label: 'Kauravas',
                data: [15000, 6000, 18000, 141000],
                backgroundColor: 'rgba(220, 20, 60, 0.7)',
                borderColor: 'rgba(220, 20, 60, 1)',
                borderWidth: 1
            }
        ]
    };
    
    // Custom icons for x-axis
    const icons = ['🛞', '🐘', '🐎', '👥'];
    
    // Create chart
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#d5a26f',
                        callback: function(value, index) {
                            return icons[index] + ' ' + data.labels[index];
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)'
                    },
                    ticks: {
                        color: '#f5e6cc',
                        callback: function(value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#f5e6cc',
                        font: {
                            family: 'Cinzel'
                        },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const index = tooltipItems[0].dataIndex;
                            return icons[index] + ' ' + data.labels[index];
                        },
                        label: function(context) {
                            let value = context.parsed.y;
                            if (value >= 1000) {
                                value = (value / 1000).toFixed(1) + 'k';
                            }
                            return context.dataset.label + ': ' + value;
                        },
                        afterBody: function(tooltipItems) {
                            const dataIndex = tooltipItems[0].dataIndex;
                            let ratio;
                            
                            // Calculate ratio
                            const kauravaValue = data.datasets[1].data[dataIndex];
                            const pandavaValue = data.datasets[0].data[dataIndex];
                            ratio = (kauravaValue / pandavaValue).toFixed(1);
                            
                            return 'Kaurava:Pandava ratio = ' + ratio + ':1';
                        }
                    }
                }
            }
        }
    });
    
    console.log("Casualties chart initialized");
}

function loadChartJS(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    document.head.appendChild(script);
}

function animateEntryElements() {
    // Animate army totals with delay
    const totals = document.querySelectorAll('.army-total');
    totals.forEach((total, index) => {
        total.style.opacity = '0';
        total.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            total.style.transition = 'all 0.6s ease';
            total.style.opacity = '1';
            total.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate insights with delay
    const insights = document.querySelectorAll('.insight');
    insights.forEach((insight, index) => {
        insight.style.opacity = '0';
        insight.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            insight.style.transition = 'all 0.5s ease';
            insight.style.opacity = '1';
            insight.style.transform = 'translateY(0)';
        }, 500 + index * 150);
    });
    
    // Animate highlights with delay
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
        highlight.style.opacity = '0';
        highlight.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            highlight.style.transition = 'all 0.4s ease';
            highlight.style.opacity = '1';
            highlight.style.transform = 'translateX(0)';
        }, index * 200);
    });
}