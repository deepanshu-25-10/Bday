// ------- Osmo [https://osmo.supply/] ------- //

document.addEventListener("DOMContentLoaded", () => {

  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    
    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });

  // Fetch content from 'photo/photo.html' and insert it into '.parallax__content'
  fetch('photo/photo.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // Insert the content into the 'parallax__content' section
      document.querySelector('.parallax__content').innerHTML = data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      document.querySelector('.parallax__content').innerHTML = '<p>Sorry, we couldn\'t load the content at this time.</p>';
    });

});

// ------- Lenis Smooth Scroll ------- //

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
