const hamburgerIcon = document.getElementById('hamburger-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
const currentSort = document.getElementById('current-sort');

hamburgerIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('visible');
});



document.getElementById('sort-newest').addEventListener('click', () => {
    sortPosts('newest');
    dropdownMenu.classList.remove('visible');
});

document.getElementById('sort-oldest').addEventListener('click', () => {
    sortPosts('oldest');
    dropdownMenu.classList.remove('visible');
});

document.getElementById('sort-alphabetical').addEventListener('click', () => {
    sortPosts('alphabetical');
    dropdownMenu.classList.remove('visible');
})