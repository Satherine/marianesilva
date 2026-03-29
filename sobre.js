const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn-prev");
const nextBtn = document.querySelector(".carousel-btn-next");
const dots = document.querySelectorAll(".carousel-dot");

if (carousel && track && prevBtn && nextBtn && dots.length > 0) {
  const totalSlides = dots.length;
  let currentIndex = 0;
  let autoplayId;
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 45;

  const updateCarousel = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel(currentIndex);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const restartAutoplay = () => {
    clearInterval(autoplayId);
    autoplayId = setInterval(nextSlide, 4500);
  };

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slide = Number(dot.dataset.slide);
      goToSlide(slide);
      restartAutoplay();
    });
  });

  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoplayId);
  });

  carousel.addEventListener("mouseleave", restartAutoplay);

  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      clearInterval(autoplayId);
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) >= swipeThreshold) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      restartAutoplay();
    },
    { passive: true },
  );

  updateCarousel(currentIndex);
  restartAutoplay();
}
