document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    const contentContainer = document.getElementById("createPostContainer");
    const noAccess = document.getElementById("noAccess");

    if (!authToken || !username) {
        contentContainer.style.display = "none";
        noAccess.style.display = "block";
    } else {
        contentContainer.style.display = "block";
    }
});