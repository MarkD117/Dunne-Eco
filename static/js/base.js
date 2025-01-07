// Smooth scroll function for home page links
document.addEventListener('DOMContentLoaded', () => {
  const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

  smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          // Prevent default link behavior
          event.preventDefault();

          // Get the target element
          const targetId = link.getAttribute('href').split('#')[1];
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              // Smooth scroll to the target element
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth',
              });
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize the counter
    function initCounter(id, startValue, endValue) {
        const counter = new CountUp(id, startValue, endValue, 0, 2.5); // 2.5 seconds duration
        if (!counter.error) {
            counter.start();
        } else {
          console.error(counter.error);
        }
    }

    // IntersectionObserver to detect when the counter section is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the counters when the section comes into view
                initCounter('counter-1', 0, 2145);
                initCounter('counter-2', 0, 5368);
                initCounter('counter-3', 0, 7482);
                initCounter('counter-4', 0, 100);
                observer.unobserve(entry.target); // Stop observing once the counters are activated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is in view
    });

    // Observe the counter section
    const counterSection = document.querySelector('#counter');
    observer.observe(counterSection);
});

// Initialising Animate On Scroll
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Initialise bootstrap toasts
document.querySelectorAll('.toast').forEach(toastElement => {
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
});