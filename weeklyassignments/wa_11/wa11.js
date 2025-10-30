const dogImg = document.getElementById('dogImg');
const btn = document.getElementById('fetchBtn');
const breedSelect = document.getElementById('breedSelect');

async function loadBreeds() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  const breeds = Object.keys(data.message);

  for (const breed of breeds) {
    const option = document.createElement('option');
    option.value = breed;
    option.textContent = breed[0].toUpperCase() + breed.slice(1);
    breedSelect.appendChild(option);
  }
}

loadBreeds();

async function fetchDog() {
  try {
    const breed = breedSelect.value;
    let url;

    if (breed === 'random') {
      url = 'https://dog.ceo/api/breeds/image/random';
    } else {
      url = `https://dog.ceo/api/breed/${breed}/images/random`;
    }

    const res = await fetch(url);
    const data = await res.json();

    dogImg.src = data.message;
    dogImg.alt = `${breed} dog image`;
  } catch (err) {
    console.error('Error fetching dog image:', err);
  }
}

btn.addEventListener('click', fetchDog);

fetchDog();