document.addEventListener('DOMContentLoaded', function() {
    console.log("Timeline initialization starting...");
    
    // First check if CSS has loaded
    ensureStylesLoaded();
    
    // Then initialize the interactive elements
    setTimeout(() => {
        // Timeline view interactions
        initializeTimelineEvents();
        
        // View toggle buttons
        setupViewButtons();
        
        // Initialize modal functionality
        initializeEventModal();
        
        console.log("Timeline initialization complete");
    }, 200); // Small delay to ensure all HTML is rendered
});

function ensureStylesLoaded() {
    // Check if the timeline-dashboard has proper styling
    const dashboard = document.querySelector('.timeline-dashboard');
    if (dashboard) {
        const computedStyle = window.getComputedStyle(dashboard);
        if (computedStyle.background === 'rgba(0, 0, 0, 0)' || computedStyle.background === 'transparent') {
            console.warn("Timeline styles might not be loaded, injecting CSS...");
            
            // Add link to CSS if missing
            if (!document.querySelector('link[href="day3_3.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'day3_3.css';
                document.head.appendChild(link);
            }
        }
    }
}

function setupViewButtons() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const dashboardViews = document.querySelectorAll('.dashboard-view');
    
    if (viewButtons.length === 0) {
        console.error("No view buttons found!");
        return;
    }
    
    if (dashboardViews.length === 0) {
        console.error("No dashboard views found!");
        return;
    }
    
    console.log(`Found ${viewButtons.length} view buttons and ${dashboardViews.length} dashboard views`);
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            console.log(`Button clicked: ${targetView}`);
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active view
            dashboardViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetView + '-view') {
                    view.classList.add('active');
                    
                    // Initialize charts based on the active view
                    if (targetView === 'intensity') {
                        setTimeout(initializeBattleIntensityChart, 100);
                    } else if (targetView === 'heroes') {
                        setTimeout(initializeHeroActivityChart, 100);
                    }
                }
            });
        });
    });
}

function initializeTimelineEvents() {
    const timeEvents = document.querySelectorAll('.time-event');
    
    timeEvents.forEach(event => {
        event.addEventListener('click', function() {
            const time = this.getAttribute('data-time');
            let title, description;
            
            // Set modal content based on time
            switch(time) {
                case '6:00 AM':
                    title = 'Battle Commences';
                    description = 'The blaring of conch shells signals the start of Day 3\'s battle. Both armies form their battle arrays, with the Kauravas adopting the Garuda formation while the Pandavas position in a counter-formation.';
                    break;
                case '8:00 AM':
                    title = 'Arjuna\'s Exceptional Combat';
                    description = 'Arjuna engages with extraordinary skill, simultaneously facing a thousand Rathas and Maharathas. His chariot, guided by Lord Krishna, becomes the epicenter of the battlefield as he cuts through enemy ranks.';
                    break;
                case '9:30 AM':
                    title = 'Satyaki & Abhimanyu\'s Alliance';
                    description = 'When Satyaki\'s chariot is destroyed by the Gandhara army, he quickly mounts Abhimanyu\'s chariot. Together, they launch a counteroffensive that successfully pushes back Shakuni\'s forces, demonstrating remarkable coordination.';
                    break;
                case '11:00 AM':
                    title = 'Bhima vs Duryodhana';
                    description = 'Bhima directly confronts Duryodhana in a fierce duel. His precise arrows strike Duryodhana, causing him to collapse in his chariot. Duryodhana\'s charioteer retreats, creating temporary disarray in the Kaurava ranks.';
                    break;
                case '12:00 PM':
                    title = 'Bhishma Restores Order';
                    description = 'Bhishma rallies the scattered Kaurava forces, restoring discipline and structure to their formations. Duryodhana returns to the battlefield and confronts Bhishma, accusing him of showing leniency toward the Pandavas.';
                    break;
                case '1:00 PM':
                    title = 'Shikhandi Confronts Bhishma';
                    description = 'Shikhandi challenges Bhishma to combat. Recognizing Shikhandi\'s past life as Amba, Bhishma refuses to fight, considering it improper to battle someone who was once a woman. This momentarily forces Bhishma to withdraw from active combat.';
                    break;
                case '3:00 PM':
                    title = 'Krishna\'s Divine Intervention';
                    description = 'Witnessing relentless attacks on Arjuna, Krishna loses his composure and charges towards Bhishma with his Sudarshana Chakra. Arjuna intervenes, reminding Krishna of his promise not to directly engage in battle, and vows to face Bhishma with renewed determination.';
                    break;
                case '5:00 PM':
                    title = 'Arjuna vs Bhishma';
                    description = 'Reinvigorated by Krishna\'s support, Arjuna launches a fierce assault on Bhishma. The two legendary warriors engage in an intense duel, with arrows darkening the sky as they demonstrate their supreme archery skills.';
                    break;
                case '6:00 PM':
                    title = 'Day\'s End';
                    description = 'As the sun sets, both armies sound the retreat. Warriors withdraw to their respective camps to rest, treat their wounds, and prepare strategies for the battles that await them on Day 4.';
                    break;
            }
            
            openModal(time, title, description);
        });
    });
}

function initializeBattleIntensityChart() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error("Chart.js is not loaded! Loading it now...");
        loadChartJS(function() {
            initializeBattleIntensityChart(); // Retry after loading
        });
        return;
    }
    
    if (window.battleIntensityChart) {
        window.battleIntensityChart.destroy();
    }
    
    const ctx = document.getElementById('battle-intensity-chart');
    if (!ctx) {
        console.error("Could not find battle-intensity-chart canvas element");
        return;
    }
    
    const timeLabels = ['6:00 AM', '8:00 AM', '9:30 AM', '11:00 AM', '12:00 PM', '1:00 PM', '3:00 PM', '5:00 PM', '6:00 PM'];
    const iconLabels = ['🐚', '🏹', '🛞', '💪', '⚔️', '🛡️', '🔄', '⚡', '🌙'];
    
    window.battleIntensityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Battle Intensity',
                data: [30, 65, 55, 75, 60, 80, 95, 85, 20],
                borderColor: '#d5a26f',
                backgroundColor: 'rgba(213, 162, 111, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d5a26f',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHitRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)'
                    },
                    ticks: {
                        color: '#f5e6cc',
                        callback: function(value) {
                            if (value === 0) return 'Low';
                            if (value === 50) return 'Medium';
                            if (value === 100) return 'High';
                            return '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Battle Intensity',
                        color: '#d5a26f',
                        font: {
                            family: 'Cinzel'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#f5e6cc',
                    },
                    afterTickToLabelConversion: function(data) {
                        const xLabels = data.ticks;
                        for (let i = 0; i < xLabels.length; i++) {
                            xLabels[i].label = iconLabels[i] + ' ' + xLabels[i].label;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const idx = tooltipItems[0].dataIndex;
                            return iconLabels[idx] + ' ' + timeLabels[idx];
                        },
                        label: function(context) {
                            const events = [
                                'Battle commences',
                                'Arjuna faces thousands',
                                'Satyaki & Abhimanyu counterattack',
                                'Bhima defeats Duryodhana',
                                'Bhishma rallies Kauravas',
                                'Shikhandi confronts Bhishma',
                                'Krishna nearly intervenes',
                                'Arjuna vs Bhishma duel',
                                'Armies retreat'
                            ];
                            return [
                                'Intensity: ' + context.raw + '%',
                                'Event: ' + events[context.dataIndex]
                            ];
                        }
                    }
                }
            }
        }
    });
}

function initializeHeroActivityChart() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error("Chart.js is not loaded! Loading it now...");
        loadChartJS(function() {
            initializeHeroActivityChart(); // Retry after loading
        });
        return;
    }
    
    if (window.heroActivityChart) {
        window.heroActivityChart.destroy();
    }
    
    const ctx = document.getElementById('hero-activity-chart');
    if (!ctx) {
        console.error("Could not find hero-activity-chart canvas element");
        return;
    }
    
    const timeLabels = ['6:00 AM', '8:00 AM', '9:30 AM', '11:00 AM', '12:00 PM', '1:00 PM', '3:00 PM', '5:00 PM', '6:00 PM'];
    const iconLabels = ['🐚', '🏹', '🛞', '💪', '⚔️', '🛡️', '🔄', '⚡', '🌙'];
    
    window.heroActivityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Bhishma',
                    data: [30, 40, 35, 25, 85, 70, 60, 80, 20],
                    backgroundColor: 'rgba(201, 169, 89, 0.8)'
                },
                {
                    label: 'Arjuna',
                    data: [30, 90, 50, 30, 40, 50, 60, 90, 20],
                    backgroundColor: 'rgba(86, 180, 233, 0.8)'
                },
                {
                    label: 'Bhima',
                    data: [30, 50, 40, 90, 40, 30, 20, 40, 20],
                    backgroundColor: 'rgba(213, 94, 0, 0.8)'
                },
                {
                    label: 'Krishna',
                    data: [10, 30, 25, 20, 30, 40, 95, 60, 10],
                    backgroundColor: 'rgba(86, 180, 80, 0.8)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    stacked: false,
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)'
                    },
                    ticks: {
                        color: '#f5e6cc'
                    },
                    title: {
                        display: true,
                        text: 'Battlefield Influence',
                        color: '#d5a26f',
                        font: {
                            family: 'Cinzel'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#f5e6cc'
                    },
                    afterTickToLabelConversion: function(data) {
                        const xLabels = data.ticks;
                        for (let i = 0; i < xLabels.length; i++) {
                            xLabels[i].label = iconLabels[i];
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            return timeLabels[tooltipItems[0].dataIndex];
                        }
                    }
                }
            }
        }
    });
}

function initializeEventModal() {
    const modal = document.getElementById('event-modal');
    if (!modal) {
        console.error("Could not find event-modal element");
        return;
    }
    
    const closeModalBtn = document.querySelector('.close-modal');
    if (!closeModalBtn) {
        console.error("Could not find close-modal button");
        return;
    }
    
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function openModal(time, title, description) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    
    const modalTime = document.getElementById('modal-time');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    if (!modalTime || !modalTitle || !modalDesc) {
        console.error("Modal elements not found");
        return;
    }
    
    modalTime.textContent = time;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = 1;
        }
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('event-modal');
    modal.querySelector('.modal-content').style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Add this helper function to dynamically load Chart.js if needed
function loadChartJS(callback) {
    if (typeof Chart !== 'undefined') {
        callback();
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = callback;
    script.onerror = function() {
        console.error("Failed to load Chart.js");
    };
    document.head.appendChild(script);
}