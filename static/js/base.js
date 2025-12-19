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

window.addEventListener('load', () => {
    // Refresh AOS after short delay
    setTimeout(AOS.refresh, 200); // 200 milliseconds delay

    // Lock hero height to prevent stretching
    setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100); // Delay allows browser chrome to settle

    // Keep product page Features & Benefits box sizes consistent
    equalizeFeatureHeights();
});

window.addEventListener('resize', equalizeFeatureHeights);
window.addEventListener('orientationchange', () => {
    // Recalculate viewport height on orientation change
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener('DOMContentLoaded', () => {
    // Refresh AOS only if Flickity is available
    if (typeof Flickity !== 'undefined') {
        const gallery = document.querySelector('.carousel');
        // Ensure carousel element exists before initializing
        if (gallery) {
            new Flickity(gallery, {
                wrapAround: true,
                autoPlay: false,
                cellAlign: 'center',
                contain: true
            });

            // Auto-refresh AOS after Flickity initializes
            setTimeout(AOS.refresh, 100);
        }
    }

    // Smooth scroll function for hero buttons
    document.querySelectorAll('.smooth-scroll').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Initialise bootstrap toasts
    document.querySelectorAll('.toast').forEach(toastEl => {
        new bootstrap.Toast(toastEl).show();
    });

    // Cookie Consent Modal
    const cookieModalEl = document.getElementById("cookieConsentModal");
    if (cookieModalEl) {
        const cookieModal = new bootstrap.Modal(cookieModalEl);
        const confirmBtn = document.getElementById("confirmCookies");
        const closeBtn = document.getElementById("closeModal");
        const learnMoreBtn = document.getElementById("privacyPolicyButton");

        const isPrivacyPolicyPage = () => window.location.pathname.includes("/privacy-policy");

        // Show modal only if user hasn't confirmed cookies and isn't on privacy policy page
        if (!localStorage.getItem("cookieConsent") && !sessionStorage.getItem("cookieClosed")) {
            if (!(sessionStorage.getItem("privacyPolicyRead") && isPrivacyPolicyPage())) {
                cookieModal.show();
            }
        }

        // When the user clicks "Learn More", store in sessionsStorage to not show until leaving the page
        learnMoreBtn?.addEventListener("click", () => {
            sessionStorage.setItem("privacyPolicyRead", "true");
            cookieModal.hide();
        });

        // When user clicks "Confirm", store in localStorage to never show again
        confirmBtn?.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "true");
            sessionStorage.removeItem("cookieClosed");
            sessionStorage.removeItem("privacyPolicyRead");
            cookieModal.hide();
        });

        // When user closes the modal, store in sessionStorage to not show again this session
        closeBtn?.addEventListener("click", () => {
            sessionStorage.setItem("cookieClosed", "true");
            cookieModal.hide();
        });

        // Reappear modal on any other page (if consent not given)
        window.addEventListener("pageshow", () => {
            if (!localStorage.getItem("cookieConsent") && !isPrivacyPolicyPage()) {
                if (sessionStorage.getItem("privacyPolicyRead")) {
                    sessionStorage.removeItem("privacyPolicyRead");
                    if (!sessionStorage.getItem("cookieClosed")) {
                        cookieModal.show();
                    }
                }
            }
        });
    }

    // Christmas Holiday Banner
    const christmasBanner = document.getElementById('christmasBanner');

    if (christmasBanner) {
        document.body.classList.add('banner-visible');

        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // scrolling down and past 50px -> hide banner
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                christmasBanner.classList.add('hidden');
                document.body.classList.remove('banner-visible');
            }
            // scrolling up OR near the top -> show banner again
            else if (scrollTop < lastScrollTop || scrollTop <= 0) {
                christmasBanner.classList.remove('hidden');
                document.body.classList.add('banner-visible');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Handles clicking hamburger nav menu icon on mobile screens
    const toggler = document.querySelector(".custom-nav-toggler");
    toggler?.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});

// Keep product page Features & Benefits box sizes consistent
function equalizeFeatureHeights() {
    let maxHeight = 0;
    const boxes = document.querySelectorAll('.feature-box');
    boxes.forEach(box => {
        box.style.height = 'auto';
        maxHeight = Math.max(maxHeight, box.offsetHeight);
    });
    boxes.forEach(box => {
        box.style.height = `${maxHeight}px`;
    });
}