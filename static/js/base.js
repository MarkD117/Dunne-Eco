// Initialising Animate On Scroll
AOS.init({
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 900, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // animation happens only once
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

window.addEventListener('load', function() {
    setTimeout(function() {
        AOS.refresh();
    }, 200); // 200 milliseconds delay
});

// Lock hero height to prevent stretching
function setStableViewportHeight() {
    setTimeout(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100); // Delay allows browser chrome to settle
  }
  
  window.addEventListener('load', setStableViewportHeight);
  window.addEventListener('orientationchange', setStableViewportHeight);

// Refresh AOS only if Flickity is available
document.addEventListener("DOMContentLoaded", function () {
    // Check if Flickity is available before initializing
    if (typeof Flickity !== 'undefined') {
        var gallery = document.querySelector('.carousel');
        
        // Ensure carousel element exists before initializing
        if (gallery) { 
            var flkty = new Flickity(gallery, {
                wrapAround: true,
                autoPlay: false,
                cellAlign: 'center',
                contain: true
            });

            // Auto-refresh AOS after Flickity initializes (Ensures AOS runs even if Flickity is instantly ready)
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll function for hero buttons
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

// Keep product page Features & Benefits box sizes consistent
function equalizeFeatureHeights() {
    let maxHeight = 0;
    document.querySelectorAll('.feature-box').forEach(box => {
        box.style.height = 'auto';
        if (box.offsetHeight > maxHeight) {
            maxHeight = box.offsetHeight;
        }
    });
    document.querySelectorAll('.feature-box').forEach(box => {
        box.style.height = maxHeight + 'px';
    });
}
window.addEventListener('load', equalizeFeatureHeights);
window.addEventListener('resize', equalizeFeatureHeights);

// Initialise bootstrap toasts
document.querySelectorAll('.toast').forEach(toastElement => {
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
});

// Cookie Consent Modal
document.addEventListener("DOMContentLoaded", function () {
  let cookieModal = new bootstrap.Modal(document.getElementById("cookieConsentModal"));

  function isPrivacyPolicyPage() {
      return window.location.pathname.includes("/privacy-policy");
  }

  // Show modal only if user hasn't confirmed cookies and isn't currently on the privacy policy page
  if (!localStorage.getItem("cookieConsent") && !sessionStorage.getItem("cookieClosed")) {
      if (!(sessionStorage.getItem("privacyPolicyRead") && isPrivacyPolicyPage())) {
          cookieModal.show();
      }
  }

  // When the user clicks "Learn More", store in sessionsStorage to not show until leaving the page
  document.getElementById("privacyPolicyButton").addEventListener("click", function () {
      sessionStorage.setItem("privacyPolicyRead", "true");
      cookieModal.hide();
  });

  // When user clicks "Confirm", store in localStorage to never show again
  document.getElementById("confirmCookies").addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "true");
      sessionStorage.removeItem("cookieClosed"); // Remove session closed flag
      sessionStorage.removeItem("privacyPolicyRead"); // Remove policy read flag
      cookieModal.hide();
  });

  // When user closes the modal, store in sessionStorage to not show again this session
  document.getElementById("closeModal").addEventListener("click", function () {
      sessionStorage.setItem("cookieClosed", "true");
      cookieModal.hide();
  });

  // Reappear modal on any other page (if consent not given)
  window.addEventListener("pageshow", function () {
      if (!localStorage.getItem("cookieConsent") && !isPrivacyPolicyPage()) {
          if (sessionStorage.getItem("privacyPolicyRead")) {
              sessionStorage.removeItem("privacyPolicyRead"); // Reset so it shows on next visit
              if (!sessionStorage.getItem("cookieClosed")) {
                  cookieModal.show();
              }
          }
      }
  });
});

// Handles clicking hamburger nav menu icon on mobile screens
document.addEventListener("DOMContentLoaded", function () {

    const toggler = document.querySelector(".custom-nav-toggler");

    toggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });