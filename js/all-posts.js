let posts = [];
let currentIndex = 0;
const postsPerPage = 5;

fetch('../API/techpost.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        posts = data;
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        updatePostCounter();
        loadPosts();
        sortPosts('alphabetical');
        updateActiveSort('alphabetical');
    })
    .catch(error => console.error('Error fetching the API:', error));

function loadPosts() {
    const techContainer = document.getElementById('tech-container');
    const nextPosts = posts.slice(currentIndex, currentIndex + postsPerPage);

    nextPosts.forEach(tech => {
        const techHTML = `
        <article>
            <div class="tech">
                <img src="${tech.image}" alt="${tech.title}">
                <div class="text">
                    <h2>${tech.title}</h2>
                    <p>${tech.descriptionPreview}</p>
                    <p class="author">${tech.publishDate} ${tech.author}<p>
                    <div class="ifLoggedIn">
                        <button class="default-btn" id="editPost">Edit</button>
                    </div>
                </div>
            </div>
        </article>
        `;
        techContainer.innerHTML += techHTML;
    });

    currentIndex += postsPerPage;
    updatePostCounter();

    if(currentIndex >= posts.length) {
        document.getElementById('read-more').style.display = "none";
    }
}

function updatePostCounter() {
    const postCounter = document.getElementById('post-counter');
    const showing = Math.min(currentIndex, posts.length);
    const total = posts.length;

    postCounter.textContent = `Showing ${showing} of ${total} posts`;
}

function sortPosts(criteria) {
    switch (criteria) {
        case 'newest':
            posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            break;
        case 'oldest':
            posts.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
            break;
        case 'alphabetical':
            posts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            return;
    }

    currentIndex = 0;
    document.getElementById('tech-container').innerHTML = '';
    loadPosts();
    document.getElementById('read-more').style.display = 'block';
}

document.getElementById('sort-newest').addEventListener('click', () => sortPosts('newest'));
document.getElementById('sort-oldest').addEventListener('click', () => sortPosts('oldest'));
document.getElementById('sort-alphabetical').addEventListener('click', () => sortPosts('alphabetical'));

document.getElementById('read-more').addEventListener('click', loadPosts);
