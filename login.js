// login.js

export async function loginUser() {
    const loginForm = document.querySelector(".login__form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("login__username").value;
        const password = document.getElementById("login__password").value;

        // Prepare the user data to send to the server.
        const userData = {
            username,
            password
        };
        // Send a post request
        const serverURL = ' https://puzzled-ruby-hummingbird.cyclic.app/login';

        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        localStorage.setItem('userId', data.userId);
        localStorage.setItem("token", data.token);
        console.log(data)
        if (response.ok) {
            // Login successful
            window.location.href = "../quizCategories.html";
        } else {
            const errorData = await response.json();
            console.error(errorData);
        }
    });
}
