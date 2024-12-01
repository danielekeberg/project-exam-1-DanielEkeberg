const hamburger = document.getElementById('hamburger');
const navButtons = document.getElementById('navButtons');

hamburger.addEventListener('click', () => {
    navButtons.classList.toggle('active');
});