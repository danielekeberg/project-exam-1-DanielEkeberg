const username = "danielekeberg";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzMwNjEyNzZ9.bX_BTImXPToxi-kxdxYtSpOWzpsuPN5ssfjU5naG4bs";

let allPosts = [];
let currentDisplayCount = 0;

async function fetchPosts() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error response from API:", errorResponse);
            throw new Error("Failed to fetch blog posts.");
        }

        const apiResponse = await response.json();

        if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
            console.error("API response `data` property is not an array:", apiResponse);
            return [];
        }

        return apiResponse.data.map(post => ({
            id: post.id,
            title: post.title,
            description: post.body,
            createdAt: post.created || new Date().toISOString(),
            author: post.author?.name || "Unknown",
            media: post.media || { url: "default.jpg", alt: "Default image" },
        }));
    } catch (error) {
        console.error("Error fetching blog posts:", error.message);
        return [];
    }
}

async function displayPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const postsCount = document.getElementById("post-counter");

    if (allPosts.length === 0) {
        allPosts = await fetchPosts();
        currentDisplayCount = 0;
    }

    const nextPosts = allPosts.slice(currentDisplayCount, currentDisplayCount + 5);
    nextPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post-item";
        postElement.innerHTML = `
            <article>
                <a href="./post/index.html?id=${post.id}">
                    <div class="tech">
                        <img src="${post.media?.url || 'default.jpg'}" alt="${post.title || 'Untitled Post'}">
                        <div class="text">
                            <h2>${post.title || 'Untitled Post'}</h2>
                            <p>${post.description || 'No description available.'}</p>
                            <p class="author">${new Date(post.createdAt).toLocaleDateString() || 'Unknown Date'} ${post.author || 'Unknown Author'}</p>
                        </div>
                    </div>
                </a>
            </article>
        `;
        postsContainer.appendChild(postElement);
    });

    currentDisplayCount += nextPosts.length;

    postsCount.textContent = `Showing ${currentDisplayCount} of ${allPosts.length} posts`;

    const readMoreButton = document.getElementById("read-more");
    if (currentDisplayCount >= allPosts.length) {
        readMoreButton.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const readMoreButton = document.getElementById("read-more");

    displayPosts();

    readMoreButton.addEventListener("click", displayPosts);
});