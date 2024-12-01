async function loginUser() {
    const apiUrl = 'https://api.example.com/login';
    const loginData = {
        email: "daniel.lehre.ekeberg@stud.noroff.no",
        password: "admin"
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Login Successful:", responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}