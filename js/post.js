document.addEventListener("DOMContentLoaded", async () => {
    const postContainer = document.getElementById("post-container");

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if(!postId) {
        postContainer.innerHTML = `
            <div class="no-post">
                <p>Post not found. Please go back to the main page.</p>
            </div>
            `;
        return;
    }

    try {
        const response = await fetch('../API/techpost.json');
        const posts = await response.json();
        const post = posts.find(post => post.id === parseInt(postId));

        if (!post) {
            postContainer.innerHTML = `
            <div class="no-post">
                <p>Post not found. Please go back to the main page.</p>
            </div>
            `;
            return;
        }

        postContainer.innerHTML = `
            <div class="post">
                <img src="${post.image}" alt="${post.title}">
                <div class="text">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <div class="post-btn">
                        <a href="../"><button id="goHome">Home</button></a>
                    </div>
                    <p class="author">${post.publishDate} ${post.author}</p>
                    <div class="ifLoggedIn">
                        <button id="editPost">Edit Post</button>
                        <button id="deletePost">Delete Post</button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching the API:', error);
        postContainer.innerHTML = "<p>Error loading post details.</p>";
    }
})