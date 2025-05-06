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