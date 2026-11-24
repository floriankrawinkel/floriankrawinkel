const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');

// Mobile menu toggle (works on every page)
if (menuIcon && navbar) {
    const toggleMenu = () => {
        const open = navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x', open);
        menuIcon.setAttribute('aria-expanded', String(open));
    };

    menuIcon.addEventListener('click', toggleMenu);
    menuIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Close the menu after picking a link
    navLinks.forEach(link => link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.setAttribute('aria-expanded', 'false');
    }));
}

// Highlight the nav link of the section currently in view (index page only)
const hasInPageNav = Array.from(navLinks).some(link => link.getAttribute('href').startsWith('#'));

if (hasInPageNav && sections.length) {
    const updateActiveLink = () => {
        const top = window.scrollY;

        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector('header nav a[href="#' + id + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

// Contact form (index page only)
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

if (form && statusMessage) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector('input[type="submit"]');

        submitButton.disabled = true;
        submitButton.value = 'Sending...';
        statusMessage.textContent = '';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusMessage.textContent = 'Thanks! Your message has been sent.';
                statusMessage.style.color = 'var(--main-color)';
                form.reset();
            } else {
                statusMessage.textContent = 'Something went wrong. Please try again.';
                statusMessage.style.color = '#ff5c5c';
            }
        } catch (error) {
            statusMessage.textContent = 'Unable to send the message. Please try again later.';
            statusMessage.style.color = '#ff5c5c';
        }

        submitButton.disabled = false;
        submitButton.value = 'Send Message';
    });
}

// Sound design card: cycles through the sound clips
let currentSoundIndex = 0;
const sounds = ['AudioClips/sound1.wav', 'AudioClips/sound2.wav', 'AudioClips/sound3.wav'];
let currentAudio = null;

function playSound() {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(sounds[currentSoundIndex]);
    currentAudio.play();
    currentSoundIndex = (currentSoundIndex + 1) % sounds.length;
}
