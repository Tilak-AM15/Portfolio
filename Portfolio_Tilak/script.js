// Responsive Navbar
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
});

// Close navbar on link click (for mobile)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 700) {
            navbar.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        }
    });
});

// Scroll to Top Button
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active nav highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

function activateNavOnScroll() {
    let fromTop = window.scrollY + 120;
    sections.forEach(section => {
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', activateNavOnScroll);

// Smooth scroll for anchor links (for browsers lacking CSS smooth-scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.hash && document.querySelector(this.hash)) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate elements on scroll (fadeInUp)
const observerOptions = {
    threshold: 0.2
};
const fadeUpEls = document.querySelectorAll('.project-card, .cert-card, .publication-box, .contact-box, .skill');
const fadeInOnView = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none';
            observer.unobserve(entry.target);
        }
    });
};
fadeUpEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(60px)';
    const observer = new IntersectionObserver(fadeInOnView, observerOptions);
    observer.observe(el);
});

// ==========================
// Animate Skill Bars on View
// ==========================
const skillsSection = document.getElementById('skills');
const skillRanges = skillsSection.querySelectorAll('input[type="range"]');
const skillPercents = skillsSection.querySelectorAll('.percent');

function animateSkills() {
    skillRanges.forEach((input, idx) => {
        let target = Number(input.getAttribute('value'));
        input.value = 0;
        skillPercents[idx].textContent = "0%";
        let current = 0;
        let interval = setInterval(() => {
            if (current < target) {
                current++;
                input.value = current;
                skillPercents[idx].textContent = `${current}%`;
            } else {
                clearInterval(interval);
            }
        }, 10); // Adjust speed here
    });
}

// Use IntersectionObserver to trigger animation every time the section enters the viewport
let skillsObserver = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);