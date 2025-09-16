document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slidesContainer = carousel.querySelector('.slides');
    const images = Array.from(slidesContainer.querySelectorAll('img'));
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.dots');
    let index = 0;

    const renderDots = () => {
      dotsContainer.innerHTML = '';
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = i === index ? 'active' : '';
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    };

    const goTo = (i) => {
      index = (i + images.length) % images.length;
      const offset = -index * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;
      slidesContainer.style.width = `${images.length * 100}%`;
      images.forEach(img => img.style.width = `${100 / images.length}%`);
      renderDots();
    };

    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));

    let timer = setInterval(() => goTo(index + 1), 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(index + 1), 5000);
    });

    goTo(0);
  }
});
