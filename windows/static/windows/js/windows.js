// Descriptions for each type of windows
const descriptions = {
    pvc: {
        title: "PVC Windows",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh ligula. Sed sem nisl, ultrices vitae purus eget, lacinia euismod tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam .",
        specs: [
            "Spec 1 Spec 1 Spec 1 Spec 1 Spec 1 Spec 1",
            "Spec 2 Spec 2 Spec 2 Spec 2 Spec 2 Spec 2",
            "Spec 3 Spec 3 Spec 3 Spec 3 Spec 3 Spec 3",
            "Spec 4 Spec 4 Spec 4 Spec 4 Spec 4 Spec 4",
        ]
    },
    aluminium: {
        title: "Aluminium Windows",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh ligula. Sed sem nisl, ultrices vitae purus eget, lacinia euismod tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam .",
        specs: [
            "Spec 1 Spec 1 Spec 1 Spec 1 Spec 1 Spec 1",
            "Spec 2 Spec 2 Spec 2 Spec 2 Spec 2 Spec 2",
            "Spec 3 Spec 3 Spec 3 Spec 3 Spec 3 Spec 3",
            "Spec 4 Spec 4 Spec 4 Spec 4 Spec 4 Spec 4",
        ]
    },
    steel: {
        title: "Steel Windows",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh ligula. Sed sem nisl, ultrices vitae purus eget, lacinia euismod tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam .",
        specs: [
            "Spec 1 Spec 1 Spec 1 Spec 1 Spec 1 Spec 1",
            "Spec 2 Spec 2 Spec 2 Spec 2 Spec 2 Spec 2",
            "Spec 3 Spec 3 Spec 3 Spec 3 Spec 3 Spec 3",
            "Spec 4 Spec 4 Spec 4 Spec 4 Spec 4 Spec 4",
        ]
    },
    sash: {
        title: "Sash Windows",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh ligula. Sed sem nisl, ultrices vitae purus eget, lacinia euismod tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam .",
        specs: [
            "Spec 1 Spec 1 Spec 1 Spec 1 Spec 1 Spec 1",
            "Spec 2 Spec 2 Spec 2 Spec 2 Spec 2 Spec 2",
            "Spec 3 Spec 3 Spec 3 Spec 3 Spec 3 Spec 3",
            "Spec 4 Spec 4 Spec 4 Spec 4 Spec 4 Spec 4",
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