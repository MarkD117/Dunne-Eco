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