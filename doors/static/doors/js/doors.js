// Descriptions for each type of door
const descriptions = {
    timber: "Classic and durable, perfect for traditional and modern homes.",
    pvc: "Low-maintenance and energy-efficient, ideal for contemporary spaces.",
    aluminium: "Sleek and modern, offering superior durability and security.",
    composite: "A perfect blend of strength, insulation, and style."
};

// Filter functionality
document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Remove active class from all buttons
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

        // Add active class to the clicked button
        button.classList.add('active');

        // Show all cards and hide detailed view
        document.querySelectorAll('.door-item').forEach(item => {
            item.style.display = 'block';
        });
        document.getElementById('detailedView').classList.add('d-none');
        document.getElementById('doorGrid').style.display = 'flex';

        if (filter === 'all') return; // Don't do anything for 'All' filter

        // Show the detailed view of the first card matching the filter
        const firstVisibleCard = document.querySelector(`.door-item.${filter}`);
        if (firstVisibleCard) {
            const type = firstVisibleCard.querySelector('.card').getAttribute('data-type');

            // Check if the description exists for the type
            const description = descriptions[type];
            if (description) {
                document.getElementById('detailImage').src = firstVisibleCard.querySelector('img').src;
                document.getElementById('detailTitle').textContent = firstVisibleCard.querySelector('.card-title').textContent;
                document.getElementById('detailDescription').textContent = description;

                // Show detailed view
                document.getElementById('doorGrid').style.display = 'none';
                document.getElementById('detailedView').classList.remove('d-none');
            } else {
                document.getElementById('detailDescription').textContent = "No description available.";
            }
        }
    });
});

// Product card click functionality to open detailed view
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');

        // Check if the description exists for the type
        const description = descriptions[type];
        if (description) {
            document.getElementById('detailImage').src = card.querySelector('img').src;
            document.getElementById('detailTitle').textContent = card.querySelector('.card-title').textContent;
            document.getElementById('detailDescription').textContent = description;

            // Show detailed view and hide product grid
            document.getElementById('doorGrid').style.display = 'none';
            document.getElementById('detailedView').classList.remove('d-none');

            // Set active class for the appropriate filter
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelector(`.nav-link[data-filter=${type}]`).classList.add('active');
        } else {
            document.getElementById('detailDescription').textContent = "No description available.";
        }
    });
});

// Back button to return to product grid
document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('doorGrid').style.display = 'flex';
    document.getElementById('detailedView').classList.add('d-none');
    // Reset all filters to show all cards
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-link[data-filter="all"]').classList.add('active');
});