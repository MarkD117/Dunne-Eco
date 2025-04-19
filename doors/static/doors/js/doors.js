// Descriptions for each type of door
const descriptions = {
    internal: {
        title: "Internal Doors",
        description: "Our high-quality internal doors are designed for style and functionality, available in pre-hung kits for easy installation. Choose from traditional, classic, or modern designs, all crafted with premium timber, veneer and painted finishes.",
        specs: [
            "Available as FD30 & FD60 fire-rated doors",
            "Custom finishes in painted or natural wood",
            "Supplied as a complete kit with handles & architraves",
            "Precision pre-hung for smooth operation"
        ]
    },
    external: {
        title: "External Doors",
        description: "Built for durability and security, our external doors combine robust construction with aesthetic appeal. Available in a variety of finishes to suit any architectural style.",
        specs: [
            "Weather-resistant aluminium or composite options",
            "Multi-point locking system for enhanced security",
            "Custom glazing and panel configurations available",
            "Thermally efficient for superior insulation"
        ]
    },
    bespoke: {
        title: "Bespoke Doors",
        description: "Tailored to your unique specifications, our bespoke doors allow you to choose the materials, finishes, and designs that suit your project perfectly.",
        specs: [
            "Handcrafted to your precise measurements",
            "Choice of premium hardwoods & finishes",
            "Optional decorative glass and inlays",
            "Designed for both modern and heritage properties"
        ]
    },
    bifolding: {
        title: "Bifolding Doors",
        description: "Maximize space and natural light with our sleek bifolding doors. Ideal for open-plan living and creating seamless indoor-outdoor transitions.",
        specs: [
            "Smooth-glide track system for effortless operation",
            "Aluminium or PVC frame options",
            "High-security locking mechanisms",
            "Custom sizes and configurations available"
        ]
    },
    sliding: {
        title: "Sliding Doors",
        description: "Elegant and space-saving, our sliding doors are perfect for modern homes and commercial spaces, offering a seamless and minimalist aesthetic.",
        specs: [
            "Sliding and lift & slide mechanisms",
            "Available in aluminium, and PVC options",
            "Custom glazing options for improved insulation",
            "Ideal for patios, interiors, or room dividers"
        ]
    },
    french: {
        title: "French Doors",
        description: "Bring timeless elegance to your home with our classic French doors, perfect for adding natural light and a touch of sophistication.",
        specs: [
            "Available in aluminium or uPVC finishes",
            "Double or single door configurations",
            "Optional decorative glazing and side panels",
            "Enhanced security with multi-point locking"
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
        document.querySelectorAll('#available-products .door-item').forEach(item => {
            item.style.display = 'block';
        });
        document.getElementById('detailedView').classList.add('d-none');
        document.getElementById('doorGrid').style.display = 'flex';

        if (filter === 'all') return; // Don't do anything for 'All' filter

        // Show the detailed view of the first card matching the filter
        const firstVisibleCard = document.querySelector(`#available-products .door-item.${filter}`);
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
            document.getElementById('doorGrid').style.display = 'none';
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
        document.getElementById('doorGrid').style.display = 'none';
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
    document.getElementById('doorGrid').style.display = 'flex';
    document.getElementById('detailedView').classList.add('d-none');
    // Reset all filters to show all cards
    document.querySelectorAll('#available-products .nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector('#available-products .nav-link[data-filter="all"]').classList.add('active');
});