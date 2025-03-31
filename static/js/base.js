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

// Ensure AOS refreshes once on first scroll, then disable further calls
document.addEventListener("DOMContentLoaded", function () {
    // Check if Flickity is available before initializing
    if (typeof Flickity !== 'undefined') {
        var gallery = document.querySelector('.carousel');
        
        if (gallery) { // Ensure the carousel element exists before initializing
            new Flickity(gallery, {
                wrapAround: true,
                autoPlay: false,
                cellAlign: 'center',
                contain: true
            });
        }
    }

    // Refresh AOS only once after first scroll
    let aosRefreshed = false;
    window.addEventListener('scroll', function () {
        if (!aosRefreshed) {
            AOS.refresh();
            aosRefreshed = true; // Prevent further refresh calls
        }
    });
});

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