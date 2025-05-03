document.addEventListener('DOMContentLoaded', function() {
    console.log("Timeline initialization starting...");
    
    // Initialize the interactive elements
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
                    description = 'Conch shells signal the beginning of Day 2\'s battle. Bhima leads the first wave, charging ahead like a tempest against the Kaurava formations. The Pandavas advance with renewed strategy after studying Day 1\'s patterns.';
                    break;
                case '8:00 AM':
                    title = 'Bhima\'s Rampage';
                    description = 'Bhima slays over 100 elite Kaurava soldiers in close combat, completely shattering their left flank. His mace strikes with such ferocity that even elephants flee from his path. This creates a critical opening in the Kaurava defense line.';
                    break;
                case '9:30 AM':
                    title = 'Arjuna\'s Divyastras';
                    description = 'Arjuna enters battle using celestial weapons (Divyastras), firing more than 15,000 arrows in just three hours. His Gandiva bow creates a rain of arrows so dense that it blocks the sun in certain areas of the battlefield, causing disarray among enemy forces.';
                    break;
                case '11:00 AM':
                    title = 'Vrihadvala Falls';
                    description = 'Arjuna kills Kaurava general Vrihadvala with a sharp celestial shaft to the chest. The loss of this skilled commander creates a leadership vacuum in the Kaurava ranks, leading to confusion in their center formation.';
                    break;
                case '12:00 PM':
                    title = 'Eastern Flank Attack';
                    description = 'Krishna maneuvers Arjuna to the eastern wing to attack Bhishma\'s elite guards. This strategic repositioning catches the Kaurava defenses off-guard, as they had concentrated their strength to counter Bhima\'s advance on the western flank.';
                    break;
                case '1:00 PM':
                    title = 'Nakula\'s Dual-Sword Technique';
                    description = 'The second Kaurava General, Senapati Kritavarman\'s deputy, is slain by Nakula using his signature dual-sword technique. Nakula\'s speed and precision demonstrate the diverse fighting skills of the Pandavas beyond archery and mace combat.';
                    break;
                case '3:00 PM':
                    title = 'Arjuna\'s Whirlwind Attack';
                    description = 'Arjuna\'s chariot turns into a blazing whirlwind of destruction, eliminating over 2,000 foot soldiers and cavalry in a devastating display of archery. Krishna\'s chariot maneuvering creates opportunities for Arjuna to release volleys from impossible angles.';
                    break;
                case '5:00 PM':
                    title = 'Kaurava Strategic Retreat';
                    description = 'The Kauravas retreat from their eastern stronghold under Bhishma\'s command—a tactical fallback to regroup and minimize losses. Recognizing the day\'s unfavorable outcomes, Bhishma orders a controlled withdrawal to preserve forces for the coming days.';
                    break;
                case '6:00 PM':
                    title = 'Day\'s Conclusion';
                    description = 'Krishna signals a halt as the sun sets. Kaurava morale is noticeably low after significant command losses. The Pandava forces return to their camp with renewed confidence, having successfully executed their counter-offensive strategy for Day 2.';
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
    const iconLabels = ['🐚', '💪', '🏹', '⚔️', '🛞', '🗡️', '🌪️', '↩️', '🌙'];
    
    window.battleIntensityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Battle Intensity',
                data: [30, 70, 65, 55, 50, 60, 95, 75, 20],
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
                                'Bhima leads first wave',
                                'Bhima slays 100+ elite warriors',
                                'Arjuna uses Divyastras',
                                'Vrihadvala killed by Arjuna',
                                'Attack on eastern flank',
                                'Nakula\'s dual-sword victory',
                                'Arjuna\'s devastating whirlwind',
                                'Kaurava strategic retreat',
                                'Battle ends for the day'
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