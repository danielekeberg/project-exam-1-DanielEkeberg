document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorMsg = document.getElementById("error-message");
    const successMsg = document.getElementById("success-message");

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Noroff-API-Key': '0e79f6bf-a18d-4f75-82ca-fe82b431f4dc'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("authToken", data.data.accessToken);
            localStorage.setItem("username", data.data.name);
            localStorage.setItem("userEmail", email);
            successMsg.style.display = "block";
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 500);
        } else {
            errorMsg.style.display = "block";
            setTimeout(() => {
                errorMsg.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});