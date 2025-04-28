// Descriptions for each type of window
const descriptions = {
    fixed: {
        title: "Fixed Windows",
        description: "Fixed windows are ideal for maximising natural light and framing beautiful outdoor views. With no moving parts, they offer exceptional energy efficiency and a sleek, minimal design.",
        specs: [
            "Non-opening for maximum insulation and security",
            "Perfect for feature walls and expansive glazing",
            "Slim sightlines to maximise light intake",
            "Customisable shapes and sizes available",
        ]
    },
    tiltandturn: {
        title: "Tilt & Turn Windows",
        description: "Our tilt and turn windows offer versatile functionality, combining easy ventilation with secure locking. Their dual-opening action makes them perfect for modern living, offering both style and practicality.",
        specs: [
            "Tilt inwards for ventilation, turn fully for easy cleaning",
            "Secure multi-point locking systems",
            "Ideal for contemporary homes and apartments",
            "Available in timber, aluminium, or composite finishes",
        ]
    },
    sash: {
        title: "Sash Windows",
        description: "Bring timeless elegance to your home with our expertly crafted sash windows. Perfect for heritage properties and modern builds alike, they combine traditional aesthetics with modern performance.",
        specs: [
            "Authentic sliding or mock-sash styles available",
            "Smooth operation with modern counterbalance systems",
            "Double or triple glazing options for insulation",
            "Finished in durable, low-maintenance coatings",
        ]
    },
    bespoke: {
        title: "Bespoke Windows",
        description: "Our bespoke windows are tailored to your exact requirements, offering complete freedom in design, size, and material choice. Whether you need a unique shape or a specialised finish, we bring your vision to life.",
        specs: [
            "Fully customised to any specification",
            "Available in timber, aluminium, or mixed materials",
            "Designed to match existing architecture or create a new statement",
            "Precision craftsmanship for flawless performance",
        ]
    }
};

// Filter functionality
document.querySelectorAll('#available-products .nav-link').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Remove active class from all buttons
        document.querySelectorAll('#available-products .nav-link').forEach(link => link.classList.remove('active'));

        // Add active class to the clicked button
        button.classList.add('active');

        // Show all cards and hide detailed view in the first section
        document.querySelectorAll('#available-products .windows-item').forEach(item => {
            item.style.display = 'block';
        });
        document.getElementById('detailedView').classList.add('d-none');
        document.getElementById('windowsGrid').style.display = 'flex';

        if (filter === 'all') return; // Don't do anything for 'All' filter

        // Show the detailed view of the first card matching the filter
        const firstVisibleCard = document.querySelector(`#available-products .windows-item.${filter}`);
        if (firstVisibleCard) {
            const type = firstVisibleCard.querySelector('.card').getAttribute('data-type');
            const details = descriptions[type] || {
                title: "No Title Available",
                description: "No description available.",
                specs: []
            };

            // Set image, title, and description
            document.getElementById('detailImage').src = firstVisibleCard.querySelector('img').src;
            document.getElementById('detailTitle').textContent = details.title;
            document.getElementById('detailDescription').textContent = details.description;

            // Populate specs list
            const specList = document.createElement('ul');
            specList.classList.add("list-unstyled", "mt-3");
            details.specs.forEach(spec => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${spec}`;
                specList.appendChild(li);
            });

            // Only remove the old specs if it exists and it's not the back button's container
            const descriptionContainer = document.getElementById('detailDescription');
            const oldSpecList = descriptionContainer.nextElementSibling;
            if (oldSpecList && oldSpecList.tagName.toLowerCase() === 'ul') {
                oldSpecList.remove();
            }

            // Insert the new specs list
            descriptionContainer.insertAdjacentElement("afterend", specList);

            // Show detailed view
            document.getElementById('windowsGrid').style.display = 'none';
            document.getElementById('detailedView').classList.remove('d-none');
        } else {
            document.getElementById('detailDescription').textContent = "No description available.";
        }
    });
});

// Product card click functionality to open detailed view
document.querySelectorAll('#available-products .card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const details = descriptions[type] || {
            title: "No Title Available",
            description: "No description available.",
            specs: []
        };

        // Set image, title, and description
        document.getElementById('detailImage').src = card.querySelector('img').src;
        document.getElementById('detailTitle').textContent = details.title;
        document.getElementById('detailDescription').textContent = details.description;

        // Populate specs list
        const specList = document.createElement('ul');
        specList.classList.add("list-unstyled", "mt-3");
        details.specs.forEach(spec => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${spec}`;
            specList.appendChild(li);
        });

        // Only remove the old specs if it exists and it's not the back button's container
        const descriptionContainer = document.getElementById('detailDescription');
        const oldSpecList = descriptionContainer.nextElementSibling;
        if (oldSpecList && oldSpecList.tagName.toLowerCase() === 'ul') {
            oldSpecList.remove();
        }

        // Insert the new specs list
        descriptionContainer.insertAdjacentElement("afterend", specList);

        // Show detailed view and hide grid
        document.getElementById('windowsGrid').style.display = 'none';
        document.getElementById('detailedView').classList.remove('d-none');

        // Scroll smoothly into the detailed view
        document.getElementById('detailedView').scrollIntoView({ behavior: "smooth", block: "center" });

        // Ensure the right filter is active
        document.querySelectorAll('#available-products .nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`#available-products .nav-link[data-filter="${type}"]`).classList.add('active');
    });
});

// Back button to return to product grid
document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('windowsGrid').style.display = 'flex';
    document.getElementById('detailedView').classList.add('d-none');
    // Reset all filters to show all cards
    document.querySelectorAll('#available-products .nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector('#available-products .nav-link[data-filter="all"]').classList.add('active');
});