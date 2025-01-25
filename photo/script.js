document.addEventListener("DOMContentLoaded", function () {
  
  // Swiper initialization options
  const swiperOptions = {
    loop: true,
    speed: 1000, // Smooth transition speed
    grabCursor: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      progress: function () {
        const swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          const slideProgress = swiper.slides[i].progress;
          const innerOffset = swiper.width * 0.5; // Adjust interleave offset
          const innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            `translate3d(${innerTranslate}px, 0, 0)`;
        }
      },
      touchStart: function () {
        const swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function (speed) {
        const swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = `${speed}ms`;
          swiper.slides[i].querySelector(".slide-inner").style.transition = `${speed}ms`;
        }
      },
    },
  };

  // Initialize Swiper
  const swiper = new Swiper(".swiper-container", swiperOptions);

  // Add scroll functionality to the navigation buttons
  const nextButton = document.querySelector(".swiper-button-next");
  const prevButton = document.querySelector(".swiper-button-prev");

  // Go to the next slide when next button is clicked
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      swiper.slideNext(); // Trigger smooth scroll to the next slide
    });
  }

  // Go to the previous slide when prev button is clicked
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      swiper.slidePrev(); // Trigger smooth scroll to the previous slide
    });
  }
});
