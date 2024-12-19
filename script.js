// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-content, .feature-content, .project-card, .contact-content');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    reveal(); // Initial check for visible elements
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let speed = 0.1; // Adjust for faster/slower movement

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for inner cursor
        cursorInner.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    });

    // Smooth animation loop for outer cursor
    function animate() {
        // Smooth interpolation
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        // Apply transform with hardware acceleration
        cursorOuter.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`;
        
        requestAnimationFrame(animate);
    }
    animate();

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('a, button, .project-card');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const elemX = rect.left + rect.width / 2;
            const elemY = rect.top + rect.height / 2;
            const strength = 0.3;

            const deltaX = Math.floor((elemX - e.clientX) * strength);
            const deltaY = Math.floor((elemY - e.clientY) * strength);

            cursorInner.classList.add('cursor-hover');
            cursorOuter.classList.add('cursor-hover');

            // Smooth magnetic movement
            gsap.to(cursorOuter, {
                duration: 0.3,
                x: e.clientX - 20 + deltaX,
                y: e.clientY - 20 + deltaY,
                ease: "power2.out"
            });
        });

        elem.addEventListener('mouseenter', () => {
            cursorInner.classList.add('cursor-hover');
            cursorOuter.classList.add('cursor-hover');
        });

        elem.addEventListener('mouseleave', () => {
            cursorInner.classList.remove('cursor-hover');
            cursorOuter.classList.remove('cursor-hover');
        });
    });

    // Click animation
    document.addEventListener('mousedown', () => {
        cursorInner.classList.add('cursor-click');
        cursorOuter.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorInner.classList.remove('cursor-click');
        cursorOuter.classList.remove('cursor-click');
    });
});

// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500); // Show loader for 1.5 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#nav-menu');
    const navLinks = document.querySelectorAll('nav ul li');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate menu items
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.3}s`;
            }
        });
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Handle verification input boxes
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.verification-boxes input');
    
    inputs.forEach((input, index) => {
        // Auto-focus next input when a number is entered
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                inputs[index - 1].focus();
            }
        });

        // Allow only numbers
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
});