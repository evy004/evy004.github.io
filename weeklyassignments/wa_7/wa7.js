
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

// Data Persistance Implementation
function saveA11ySettings(settings) {
    const data = {
        ...settings,
        savedAt: Date.now()
    };
    localStorage.setItem('a11yPrefs', JSON.stringify(data));
    applyA11ySettings(settings);
}

function cleanupOldData() {
    const data = JSON.parse(localStorage.getItem('a11yPrefs'));
    if (data && Date.now() - data.savedAt > 30 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem('a11yPrefs');
    }
}
cleanupOldData();

// Allow users to clear their saved data preferences
document.getElementById('font-size-select').addEventListener('change', function(e) {
    const newSize = e.target.value;
    localStorage.setItem('fontSize', newSize);
    document.documentElement.style.fontSize = newSize;
    saveA11ySettings({ fontSize: newSize });
});

document.getElementById('clear-data-btn').addEventListener('click', () => {
    localStorage.removeItem('fontSize');
    localStorage.removeItem('a11yPrefs');
    document.documentElement.style.fontSize = '16px';
    document.getElementById('font-size-select').value = '16px';
    filterEvents('all');
    alert('Your preferences have been cleared and reset to default.');
});

// Allow users to opt out of data collection
document.getElementById('opt-out-storage').addEventListener('change', function(e) {
    if (e.target.checked) {
        localStorage.clear();
    }
});

// RSVP Modal logic
document.getElementById('open-rsvp-modal').addEventListener('click', () => {
    document.getElementById('rsvp-modal').style.display = 'flex';
    document.getElementById('rsvp-success').style.display = 'none';
    document.getElementById('rsvp-email').value = localStorage.getItem('rsvpEmail') || '';
});

document.getElementById('close-rsvp-modal').addEventListener('click', () => {
    document.getElementById('rsvp-modal').style.display = 'none';
});

document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('rsvp-email').value;
    localStorage.setItem('rsvpEmail', email);
    document.getElementById('rsvp-success').style.display = 'block';
    setTimeout(() => {
        document.getElementById('rsvp-modal').style.display = 'none';
    }, 1200);
});