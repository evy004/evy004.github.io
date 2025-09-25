
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

const filterButtons = document.querySelectorAll('.event-filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const filterValue = event.target.dataset.category;
        filterEvents(filterValue);
    });
});

function filterEvents(category) {
    eventCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
