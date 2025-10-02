
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

const savedFontSize = localStorage.getItem('fontSize') || '16px';
document.documentElement.style.fontSize = savedFontSize;
document.getElementById('font-size-select').value = savedFontSize;

function saveA11ySettings(settings) {
    localStorage.setItem('a11yPrefs', JSON.stringify(settings));
    applyA11ySettings(settings);
}

function applyA11ySettings(settings) {
    if (settings.fontSize) {
        document.documentElement.style.fontSize = settings.fontSize;
        document.getElementById('font-size-select').value = settings.fontSize;
    }
}

document.getElementById('font-size-select').addEventListener('change', function(e) {
    const newSize = e.target.value;
    localStorage.setItem('fontSize', newSize);
    document.documentElement.style.fontSize = newSize;
    saveA11ySettings({ fontSize: newSize });
});
