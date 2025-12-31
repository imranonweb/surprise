// Screen management
let currentScreen = 'landing';

function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    
    fromScreen.classList.remove('active');
    
    setTimeout(() => {
        toScreen.classList.add('active');
        currentScreen = toId;
        
        // Scroll to top when switching screens
        window.scrollTo(0, 0);
        toScreen.scrollTop = 0;
    }, 600);
}

function showGift() {
    switchScreen('landing', 'gift');
}

function showWish() {
    switchScreen('gift', 'wish');
    
    // Start celebration effects after a delay
    setTimeout(() => {
        createFireworks();
        createSparkles();
    }, 2000);
}

// Fireworks effect
function createFireworks() {
    const container = document.querySelector('.fireworks-container');
    const colors = ['#ff6b9d', '#ffd700', '#c86dd7', '#00ffff', '#ff4757', '#2ed573'];
    
    function launchFirework() {
        const firework = document.createElement('div');
        firework.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 50 + 10}%;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            pointer-events: none;
        `;
        
        container.appendChild(firework);
        
        // Create explosion particles
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const angle = (i / particleCount) * 360;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const distance = 50 + Math.random() * 50;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 6px ${color}, 0 0 10px ${color};
                animation: explode 1.5s ease-out forwards;
                --angle: ${angle}deg;
                --distance: ${distance}px;
            `;
            
            firework.appendChild(particle);
        }
        
        setTimeout(() => firework.remove(), 1500);
    }
    
    // Launch fireworks periodically
    const fireworkInterval = setInterval(() => {
        if (currentScreen === 'wish') {
            launchFirework();
        }
    }, 800);
    
    // Initial burst
    for (let i = 0; i < 3; i++) {
        setTimeout(() => launchFirework(), i * 200);
    }
}

// Sparkle effect
function createSparkles() {
    const colors = ['#ff6b9d', '#c86dd7', '#ffd700', '#ff1493', '#00ffff', '#fff'];
    
    function createSparkle() {
        if (currentScreen !== 'wish') return;
        
        const sparkle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s ease-out forwards;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Create sparkles periodically
    setInterval(() => {
        if (currentScreen === 'wish') {
            createSparkle();
        }
    }, 150);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: 
                translate(
                    calc(cos(var(--angle)) * var(--distance)), 
                    calc(sin(var(--angle)) * var(--distance))
                ) 
                scale(0);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Ensure page starts from landing on refresh
window.addEventListener('load', () => {
    document.getElementById('landing').classList.add('active');
    document.getElementById('gift').classList.remove('active');
    document.getElementById('wish').classList.remove('active');
    currentScreen = 'landing';
});

// Add touch feedback for mobile
document.querySelectorAll('.magic-button').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});
