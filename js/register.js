async function registerUser() {
    const apiUrl = 'https://api.example.com/register';
    const userData = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Failed to register: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Registration Successful:", responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
