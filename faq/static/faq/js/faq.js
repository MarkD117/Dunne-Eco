const searchInput = document.getElementById('faq-search-input');
const clearIcon = document.getElementById('clear-search');

function toggleClearIcon() {
    clearIcon.style.display = searchInput.value.trim() ? 'inline' : 'none';
}

// Show/hide icon on input
searchInput.addEventListener('input', toggleClearIcon);
document.addEventListener('DOMContentLoaded', toggleClearIcon);

// Clear input on click
clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    toggleClearIcon();
    searchInput.form.submit(); // Auto-submit form after clearing
});

document.getElementById('category-dropdown').addEventListener('change', function() {
    const selectedUrl = this.value;

    // Preserve the search query if present
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('q');
    const finalUrl = searchQuery ? `${selectedUrl}?q=${encodeURIComponent(searchQuery)}` : selectedUrl;

    window.location.href = finalUrl;
});