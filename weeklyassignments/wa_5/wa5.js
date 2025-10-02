
let toggle = false;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function(e) {
    if (toggle === false) {
        navMenu.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
        toggle = true;
    } else {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        toggle = false;
    }
});

navToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
    }
});
