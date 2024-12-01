document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const errorRegister = document.querySelector(".error-message");

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    console.log("Submitting Registrattion Data:", formData);

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        console.log("Response Status Code:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessages = errorData.errors?.map(error => error.message) || ["An unexpected error occured"];
            if (errorMessages.some(message => message.includes("Profile already exists"))) {
                errorRegister.style.display = "block";
                errorRegister.innerHTML = "<p>This email is already in use. Please try another email or login.</p>";
                setTimeout(() => {
                    errorRegister.style.display = "none";
                }, 2000);
            } else {
                errorRegister.style.display = "block";
                errorRegister.innerHTML = `<p>Registration failed: ${errorMessages.join(", ")}</p>`;
                setTimeout(() => {
                    errorRegister.style.display = "none";
                }, 3000);
            }
            console.error("API Error Details:", errorData);
            return;
        }

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Registration Failed:", error);
        alert("Failed to register. Please try again later.");
    }
})