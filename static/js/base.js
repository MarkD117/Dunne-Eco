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

document.addEventListener("DOMContentLoaded", function () {
  let cookieModal = new bootstrap.Modal(document.getElementById("cookieConsentModal"));

  // Show modal only if user hasn't confirmed or closed it this session
  if (!localStorage.getItem("cookieConsent") && !sessionStorage.getItem("cookieClosed")) {
      cookieModal.show();
  }

  // When user clicks "Confirm", store in localStorage to never show again
  document.getElementById("confirmCookies").addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "true"); 
      sessionStorage.removeItem("cookieClosed"); // Remove session closed flag
      cookieModal.hide(); // Hide the modal after confirming
  });

  // When user closes the modal, store in sessionStorage to not show again this session
  document.getElementById("closeModal").addEventListener("click", function () {
      sessionStorage.setItem("cookieClosed", "true");
      cookieModal.hide(); // Hide the modal after closing
  });
});