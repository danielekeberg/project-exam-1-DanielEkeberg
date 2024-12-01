const username = "danielekeberg";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzMwNjEyNzZ9.bX_BTImXPToxi-kxdxYtSpOWzpsuPN5ssfjU5naG4bs";

async function createPost(post) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(post),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error response from API:", errorResponse);
            throw new Error("Failed to create blog post.");
        }

        const createdPost = await response.json();
        console.log("Blog post created successfully:", createdPost);
        return createdPost;
    } catch (error) {
        console.error("Error creating blog post:", error.message);
        throw error;
    }
}

document.getElementById("createPostForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const description = document.getElementById("postDescription").value;
    const author = document.getElementById("postAuthor").value;
    const date = document.getElementById("postDate").value;
    const imageUrl = document.getElementById("postImageUrl").value;

    const newPost = {
        title,
        body: description,
        author,
        publishDate: date,
        media: {
            url: imageUrl,
            alt: `Image for ${title}`,
        },
    };

    try {
        const createdPost = await createPost(newPost);
        alert(`Post created successfully!`);
        window.location.href = "../";
    } catch (error) {
        alert("Error creating post. Please try again.");
    }
});