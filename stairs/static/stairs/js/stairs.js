// Descriptions for each type of stairs
const descriptions = {
    wooden: {
        title: "Wooden Stairs",
        description: "Our wooden stairs combine timeless craftsmanship with durable materials, offering a warm and inviting centerpiece for any home. Available in a range of hardwood and softwood options, each staircase is designed for lasting beauty and strength.",
        specs: [
            "Crafted from premium hardwoods or softwoods",
            "Bespoke designs to suit traditional and modern interiors",
            "Smooth, hand-finished surfaces for a refined look",
            "Optional integrated balustrades and handrails",
        ]
    },
    steel: {
        title: "Steel Stairs",
        description: "Sleek and contemporary, our steel stairs deliver bold architectural impact without compromising on strength. Perfect for both residential and commercial spaces, they are engineered for durability and customisable to fit your style.",
        specs: [
            "Heavy-duty construction with a slimline aesthetic",
            "Powder-coated, painted or raw industrial finishes available",
            "Compatible with glass, timber, or steel balustrades",
            "Custom-built for interior installations",
        ]
    },
    cladded: {
        title: "Cladded Stairs",
        description: "Our concrete cladded stairs offer a premium blend of structural strength and luxurious finishes. Ideal for modern homes and commercial spaces, these stairs can be tailored with a variety of cladding materials for a truly bespoke look.",
        specs: [
            "Core structure with stylish cladding in timber, stone, or tiles",
            "Superior acoustic and vibration resistance",
            "Perfect for floating or cantilevered stair designs",
            "Designed for seamless integration into contemporary architecture",
        ]
    },
    winder: {
        title: "Winder Stairs",
        description: "Maximise space without sacrificing style with our expertly crafted winder stairs. Designed to turn corners elegantly, they offer a practical solution for tighter floor plans while maintaining a high-end finish.",
        specs: [
            "Space-saving design ideal for compact layouts",
            "Smooth, continuous flow for comfortable use",
            "Available in timber, steel, or a combination of materials",
            "Customisable tread and riser finishes",
        ]
    },
    paddle: {
        title: "Paddle Stairs",
        description: "Our paddle stairs (also known as alternating tread stairs) are the perfect solution for limited spaces where standard stairs are not feasible. Designed for easy and safe access, they offer a smart and stylish alternative.",
        specs: [
            "Ideal for lofts, mezzanines, and compact areas",
            "Alternating tread design for easier climbing",
            "Available in timber, steel, or mixed materials",
            "Custom sizing and handrail options available",
        ]
    },
    attic: {
        title: "Attic Stairs",
        description: "Our custom-built attic stairs are permanent, space-efficient staircases designed to provide safe and reliable access to attic spaces. Built to suit each project, they're ideal for areas where standard stairs won't fit but lasting access is still required.",
        specs: [
            "Fixed staircase design - no folding or retractable parts",
            "Tailored to fit tight spaces and awkward layouts",
            "Built for everyday use with durable materials",
            "Available in timber, steel, or mixed finishes to match your interior",
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
        document.querySelectorAll('#available-products .stairs-item').forEach(item => {
            item.style.display = 'block';
        });
        document.getElementById('detailedView').classList.add('d-none');
        document.getElementById('stairsGrid').style.display = 'flex';

        if (filter === 'all') return; // Don't do anything for 'All' filter

        // Show the detailed view of the first card matching the filter
        const firstVisibleCard = document.querySelector(`#available-products .stairs-item.${filter}`);
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
            document.getElementById('stairsGrid').style.display = 'none';
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
        document.getElementById('stairsGrid').style.display = 'none';
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
    document.getElementById('stairsGrid').style.display = 'flex';
    document.getElementById('detailedView').classList.add('d-none');
    // Reset all filters to show all cards
    document.querySelectorAll('#available-products .nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector('#available-products .nav-link[data-filter="all"]').classList.add('active');
});