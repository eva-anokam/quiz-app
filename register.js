// register.js
import { displayPopup } from "./popup.js";

export async function registerUser() {
    const registerForm = document.querySelector(".form");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Prepare the user data to send to the server.
        const userData = {
            firstname,
            lastname,
            username,
            email,
            password
        };
        // Send a post request
        const serverURL = 'https://puzzled-ruby-hummingbird.cyclic.app/register';

        const response = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            // Registration successful
            const userDataResponse = await response.json()

            const userProfileData = {
                ...userDataResponse,
                userId: userDataResponse.userId
            }

            const profileURL = "https://nice-cyan-brown-bear-wrap.cyclic.app/profile";

            const profileResponse = await fetch(profileURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfileData)
            })
            const data = await profileResponse.json()
            if (profileResponse.ok) {
                displayPopup()
            } else {
                const errorData = await profileResponse.json()
                console.error(`Cannot create profile ${errorData}`)
            }
        } else {
            const errorData = await response.json()
            console.error(errorData)
        }
    });
}
