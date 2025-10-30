const dogImg = document.getElementById('dogImg');
    const btn = document.getElementById('fetchBtn');

    async function fetchDog() {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        dogImg.src = data.message;
        dogImg.alt = "Random dog image";
      } catch(err) {
        console.error('Failed to fetch dog image:', err);
        dogImg.alt = "Could not load dog image :(";
      }
    }

    btn.addEventListener('click', fetchDog);

    fetchDog();