const hamburgerIcon = document.getElementById('hamburger-icon');
const dropdownMenu = document.getElementById('dropdown-menu');
const currentSort = document.getElementById('current-sort');

hamburgerIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('visible');
});

function updateActiveSort(activeId) {
    const items = document.querySelectorAll('#dropdown-menu li');
    items.forEach(item => item.classList.remove('active'));

    const activeItem = document.getElementById(`sort-${activeId}`);
    activeItem.classList.add('active');
}

document.getElementById('sort-newest').addEventListener('click', () => {
    updateActiveSort('newest');
    sortPosts('newest');
    dropdownMenu.classList.remove('visible');
});

document.getElementById('sort-oldest').addEventListener('click', () => {
    updateActiveSort('oldest');
    sortPosts('oldest');
    dropdownMenu.classList.remove('visible');
});

document.getElementById('sort-alphabetical').addEventListener('click', () => {
    updateActiveSort('alphabetical');
    sortPosts('alphabetical');
    dropdownMenu.classList.remove('visible');
})