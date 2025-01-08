document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll function for home page links
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

    // Handle hash fragment in URL on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Get the hash without '#'
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Remove the hash from the URL
            history.replaceState(null, null, window.location.pathname);
        }
    }

    // Function to initialize the counter
    function initCounter(id, startValue, endValue, appendPlus = false) {
        const counter = new CountUp(id, startValue, endValue, 0, 2.5); // 2.5 seconds duration
        if (!counter.error) {
            counter.start();
            // Callback function to append '+' after the counter animation completes
            counter.callback = function () {
                if (appendPlus) {
                    document.getElementById(id).textContent += "+"; // Append '+' to the counter
                }
            };
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
                initCounter('counter-4', 0, 100, true);
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