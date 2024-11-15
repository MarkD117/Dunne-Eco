document.addEventListener('DOMContentLoaded', function () {
    var dropdownToggleElements = document.querySelectorAll('.dropdown-toggle');

    dropdownToggleElements.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent event from bubbling up

            // Find the nearest dropdown parent and the associated dropdown menu
            var dropdown = toggle.closest('.dropdown');
            var dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;

            // Only proceed if the dropdown menu exists
            if (dropdownMenu) {
                // Check if the menu is currently shown
                var isShown = dropdownMenu.classList.contains('show');

                // Close all open dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(function (openMenu) {
                    openMenu.classList.remove('show');
                });

                // Toggle the clicked dropdown's menu
                if (!isShown) {
                    dropdownMenu.classList.add('show');
                }
            }
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-menu.show').forEach(function (openMenu) {
            openMenu.classList.remove('show');
        });
    });
});

// Initialising Animate On Scroll

AOS.init();

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