function toggleMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    nav.classList.toggle('nav-open');
    menuToggle.classList.toggle('active');
}

function toggleSectors() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});
