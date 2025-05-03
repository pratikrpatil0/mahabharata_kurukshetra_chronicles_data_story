document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and counters
    initCounters();
    createFormationDots();
    initHeatmap();
    initCasualtyChart();
    createBattlefieldHeatmap();
});

// Initialize animated counters
function initCounters() {
    // Total deaths counter
    animateCounter('deathCounter', 300000, 3000);
    
    // Army-specific casualties
    setTimeout(() => {
        document.querySelector('.pandava-bar').style.width = '40%';
        document.querySelector('.kaurava-bar').style.width = '60%';
        animateCounter('pandavaCounter', 120000, 3000);
        animateCounter('kauravaCounter', 180000, 3000);
    }, 500);
    
    // Bhishma's metrics
    animateCounter('arrowCounter', 100000, 3000);
    animateCounter('killCounter', 50000, 3000);
    animateCounter('elephantCounter', 1000, 3000);
    animateCounter('chariotCounter', 5000, 3000);
}

// Animate number counters
function animateCounter(id, target, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const start = 0;
    const increment = Math.ceil(target / 100);
    const stepTime = Math.floor(duration / 100);
    
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format with commas
        element.textContent = current.toLocaleString();
    }, stepTime);
}

// Create formation visualization dots
function createFormationDots() {
    const formations = document.querySelectorAll('.formation-svg');
    
    formations.forEach(svg => {
        const isSvgPandava = svg.closest('.pandava-formation') !== null;
        const color = isSvgPandava ? '#4B9CD3' : '#C94C4C';
        
        // Create random dots
        for (let i = 0; i < 50; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            
            // Different distributions based on formation type
            let x, y;
            
            if (isSvgPandava) {
                // Half-moon formation dots
                const t = Math.random();
                x = 50 + 200 * t;
                y = 100 - 60 * Math.sin(Math.PI * t);
                y += (Math.random() - 0.5) * 30; // Add some vertical randomness
            } else {
                // Eagle formation dots
                if (Math.random() > 0.5) {
                    // Body parts
                    x = 150 + (Math.random() - 0.5) * 120;
                    y = 50 + Math.random() * 140;
                } else {
                    // Wings
                    const t = Math.random();
                    if (Math.random() > 0.5) {
                        // Left wing
                        x = 80 + 70 * t;
                        y = 120 - 40 * t;
                    } else {
                        // Right wing
                        x = 220 - 70 * t;
                        y = 120 - 40 * t;
                    }
                }
            }
            
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 2);
            circle.setAttribute("fill", color);
            circle.setAttribute("opacity", 0.8);
            
            // Add pulsing animation
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "opacity");
            animate.setAttribute("values", "0.8;0.4;0.8");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            
            circle.appendChild(animate);
            svg.appendChild(circle);
        }
    });
}

// Initialize Bhishma's heatmap
function initHeatmap() {
    const heatmap = document.getElementById('bhishma-heatmap');
    if (!heatmap) return;
    
    // Create heatmap grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    grid.style.gridTemplateRows = 'repeat(6, 1fr)';
    grid.style.height = '100%';
    grid.style.gap = '2px';
    
    // Create grid cells
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.style.borderRadius = '2px';
            
            // Bhishma's movement pattern - concentrated on right side
            let intensity = 0;
            
            // Center area - Bhishma's main position
            if (col >= 5 && col <= 8 && row >= 1 && row <= 4) {
                intensity = 0.7 + Math.random() * 0.3;
                
                // Add warrior icon to a cell in this range
                if (col === 7 && row === 2) {
                    cell.innerHTML = '🛡️';
                    cell.style.display = 'flex';
                    cell.style.alignItems = 'center';
                    cell.style.justifyContent = 'center';
                    cell.style.fontSize = '1.2rem';
                }
            } 
            // Right flank - high activity
            else if (col >= 8) {
                intensity = 0.5 + Math.random() * 0.3;
            }
            // Middle area - medium activity
            else if (col >= 3 && col <= 4) {
                intensity = 0.3 + Math.random() * 0.3;
            }
            // Left side - low activity
            else {
                intensity = 0.1 + Math.random() * 0.2;
            }
            
            // Red hue for heatmap
            const alpha = 0.2 + intensity * 0.8;
            cell.style.backgroundColor = `rgba(201, 76, 76, ${alpha})`;
            
            grid.appendChild(cell);
        }
    }
    
    heatmap.appendChild(grid);
}

// Initialize casualty chart
function initCasualtyChart() {
    const ctx = document.getElementById('casualtyByClassChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Infantry', 'Cavalry', 'Chariots', 'Elephants'],
            datasets: [
                {
                    label: 'Pandava',
                    data: [70000, 30000, 15000, 5000],
                    backgroundColor: 'rgba(75, 156, 211, 0.7)',
                    borderColor: '#4B9CD3',
                    borderWidth: 1
                },
                {
                    label: 'Kaurava',
                    data: [110000, 40000, 20000, 10000],
                    backgroundColor: 'rgba(201, 76, 76, 0.7)',
                    borderColor: '#C94C4C',
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
                    ticks: {
                        callback: function(value) {
                            return value / 1000 + 'k';
                        },
                        color: '#f5e6cc'
                    },
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#f5e6cc'
                    },
                    grid: {
                        color: 'rgba(213, 162, 111, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f5e6cc',
                        font: {
                            family: "'Cinzel', serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Create battlefield heatmap
function createBattlefieldHeatmap() {
    const canvas = document.getElementById('battlefieldHeatmap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth - 40;
    canvas.height = canvas.parentElement.clientHeight - 60;
    
    // Draw battlefield background
    ctx.fillStyle = 'rgba(46, 26, 20, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw battlefield border
    ctx.strokeStyle = 'rgba(213, 162, 111, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Add texture
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;
        
        ctx.fillStyle = `rgba(213, 162, 111, ${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw battle zones (heat areas)
    const heatZones = [
        { x: canvas.width * 0.7, y: canvas.height * 0.3, radius: canvas.width * 0.25, intensity: 0.9 }, // Bhishma's position
        { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: canvas.width * 0.2, intensity: 0.7 }, // Center conflict
        { x: canvas.width * 0.3, y: canvas.height * 0.7, radius: canvas.width * 0.18, intensity: 0.6 }, // Left flank
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: canvas.width * 0.15, intensity: 0.8 }, // Right flank
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: canvas.width * 0.12, intensity: 0.5 }  // Far left
    ];
    
    // Draw each heat zone with gradient
    heatZones.forEach(zone => {
        const gradient = ctx.createRadialGradient(
            zone.x, zone.y, 0,
            zone.x, zone.y, zone.radius
        );
        
        gradient.addColorStop(0, `rgba(201, 76, 76, ${zone.intensity})`);
        gradient.addColorStop(1, 'rgba(201, 76, 76, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw army positions
    // Bhishma's position
    ctx.fillStyle = 'rgba(201, 76, 76, 0.9)';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.7, canvas.height * 0.3, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Add Bhishma label
    ctx.font = 'bold 12px Cinzel';
    ctx.fillStyle = '#d5a26f';
    ctx.fillText('Bhishma', canvas.width * 0.7 - 30, canvas.height * 0.3 - 15);
    
    // Add Shikhandi position
    ctx.fillStyle = 'rgba(75, 156, 211, 0.9)';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.5, canvas.height * 0.5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Add Shikhandi label
    ctx.font = 'bold 12px Cinzel';
    ctx.fillStyle = '#d5a26f';
    ctx.fillText('Shikhandi', canvas.width * 0.5 - 30, canvas.height * 0.5 - 15);
}