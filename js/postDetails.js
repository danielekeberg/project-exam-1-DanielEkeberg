const username = "danielekeberg";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzMwNjEyNzZ9.bX_BTImXPToxi-kxdxYtSpOWzpsuPN5ssfjU5naG4bs";

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchPostById(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch post details.");
        }

        const post = await response.json();
        return post.data;
    } catch (error) {
        console.error("Error fetching post details:", error.message);
    }
}

async function updatePost(postId, updatedData) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update post.");
        }

        alert("Post updated successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error updating post:", error.message);
        alert("Error updating post. Please try again.");
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete post.");
        }

        alert("Post deleted successfully!");
        window.location.href = "../";
    } catch (error) {
        console.error("Error deleting post:", error.message);
        alert("Error deleting post. Please try again.");
    }
}

async function displayPostDetails() {
    const postId = getQueryParam("id");
    if (!postId) {
        document.getElementById("postDetails").innerHTML = "<p>Post not found.</p>";
        return;
    }

    const post = await fetchPostById(postId);

    if (post) {
        document.getElementById("postDetails").innerHTML = `
            <div class="post">
                <img src="${post.media?.url || 'default.jpg'}" alt="${post.title}">
                <div class="text">
                    <h2>${post.title}</h2>
                    <p>${post.body || 'No description available.'}</p>
                    <div class="post-btn">
                        <a href="../"><button id="goHome">Home</button></a>
                    </div>
                    <p class="author">${new Date(post.created).toLocaleDateString()} ${post.author?.name || 'Unknown'}</p>
                </div>
            </div>
        `;

        if (authToken) {
            const editPostButton = document.getElementById("editPostButton");
            editPostButton.style.display = "block";

            document.getElementById("editTitle").value = post.title;
            document.getElementById("editDescription").value = post.body;
            document.getElementById("editImageUrl").value = post.media?.url || '';

            editPostButton.addEventListener("click", () => {
                document.getElementById("editPostForm").style.display = "block";
            });
        }
    } else {
        document.getElementById("postDetails").innerHTML = "<p>Failed to load post details.</p>";
    }
}

document.getElementById("editForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const postId = getQueryParam("id");

    const updatedData = {
        title: document.getElementById("editTitle").value,
        body: document.getElementById("editDescription").value,
        media: {
            url: document.getElementById("editImageUrl").value,
            alt: `Image for ${document.getElementById("editTitle").value}`,
        },
    };

    await updatePost(postId, updatedData);
});

document.getElementById("deletePostButton").addEventListener("click", async () => {
    const postId = getQueryParam("id");
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
        await deletePost(postId);
    }
});

document.addEventListener("DOMContentLoaded", displayPostDetails);