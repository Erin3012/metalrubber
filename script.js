const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const photoCarousel = document.querySelector('.photo-carousel');
const photoTrack = photoCarousel?.querySelector('.photo-carousel-track');
const photoSlides = photoCarousel ? [...photoCarousel.querySelectorAll('.photo-slide')] : [];
const photoDots = photoCarousel?.querySelector('.photo-carousel-dots');
const photoCounter = photoCarousel?.querySelector('.photo-carousel-counter');
let photoIndex = 0;
let photoAutoplay;

if (photoCarousel && photoTrack && photoSlides.length) {
  photoSlides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = `photo-carousel-dot${index === 0 ? ' is-active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ver fotografía ${index + 1}`);
    dot.setAttribute('aria-selected', String(index === 0));
    dot.addEventListener('click', () => showPhoto(index));
    photoDots.append(dot);
  });

  function showPhoto(index) {
    photoIndex = (index + photoSlides.length) % photoSlides.length;
    photoTrack.style.transform = `translateX(-${photoIndex * 100}%)`;
    [...photoDots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === photoIndex);
      dot.setAttribute('aria-selected', String(dotIndex === photoIndex));
    });
    photoCounter.textContent = `${String(photoIndex + 1).padStart(2, '0')} / ${String(photoSlides.length).padStart(2, '0')}`;
  }

  photoCarousel.querySelector('.photo-carousel-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
  photoCarousel.querySelector('.photo-carousel-next').addEventListener('click', () => showPhoto(photoIndex + 1));
  photoCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
  });
  const stopPhotoAutoplay = () => clearInterval(photoAutoplay);
  photoCarousel.addEventListener('mouseenter', stopPhotoAutoplay);
  photoCarousel.addEventListener('focusin', stopPhotoAutoplay);
  photoAutoplay = setInterval(() => showPhoto(photoIndex + 1), 5000);
}
