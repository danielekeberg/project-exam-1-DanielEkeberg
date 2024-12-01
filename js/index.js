const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("post-btn");
const logoutButton = document.getElementById("logoutButton");
const editPost = document.querySelector(".ifLoggedIn");


function isLoggedIn() {
    const token = localStorage.getItem("authToken");
    if (token) {
        return true;
    }
}

function ifLoggedIn() {
    const postBlogButton = document.getElementById("postBlogButton");

    if(isLoggedIn()) {
        postBtn.style.display = "block";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        editPost.style.display = "block";
    } else {
        postBtn.style.display = "none";
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        logoutButton.style.display = "none";
        createPost.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", ifLoggedIn);

function logout() {
    const userConfirmed = confirm("Are you sure you want to log out?");
    if (userConfirmed) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        window.location.href = "../index.html";
    } else {
        return;
    }
    
}

document.getElementById("logoutBtn").addEventListener("click", logout);