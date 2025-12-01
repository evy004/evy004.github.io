const items = document.querySelectorAll(".timeline-container");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

items.forEach(item => observer.observe(item));
