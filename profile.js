const userContainer = document.querySelector(".user-info")
const welcomeHeader = document.querySelector(".welcome")
const scoreContainer = document.querySelector(".score-details")


function createElements(tagName, className, textContent) {
    let element = document.createElement(tagName);
    element.classList.add(className)
    element.textContent = textContent
    return element
}
function appendElements(parent, child) {
    parent.appendChild(child)
}


function createUserProfile(data) {
    const firstname = data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1);

    const lastname = data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1);

    welcomeHeader.textContent = `Welcome ${firstname} 🎉`
    const userHeader = createElements("h2", "user-header", `${firstname} ${lastname}`)
    const userEmail = createElements("p", "user-email", `Email: ${data.email}`)

    appendElements(userContainer, userHeader)
    appendElements(userContainer, userEmail)
}

async function getUserProfile() {
    const id = localStorage.getItem("userId");
    const URL = `http://localhost:5002/getOne/${id}`;

    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            await createUserProfile(data);
        } else {
            console.error('Failed to fetch user profile');
            // Handle errors when the response status is not ok
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
}


function getScore(score) {
    const scoreHeading = createElements("h2", "score__heading", "Score History")
    scoreHeading.style.marginBottom = "0"
    appendElements(scoreContainer, scoreHeading)
    if (score.length > 0) {
        const scoreFlexContainer = createElements("div", "score__flex", "")
        appendElements(scoreContainer, scoreFlexContainer)
        score.forEach(score => {
            const displayScore = createElements("div", "display__score", "")
            const scoreElement = createElements("p", "score", `Score: ${score.score}`)
            const scoreDate = createElements("p", "score__date", `Date: ${score.date}`)
            const scoreQuiz = createElements("p", "scoreQuiz", `Quiz Title: ${score.quizTitle}`)
            appendElements(displayScore, scoreElement)
            appendElements(displayScore, scoreDate)
            appendElements(displayScore, scoreQuiz)
            appendElements(scoreFlexContainer, displayScore)   
        });   
    } else {
        const takeQuiz = createElements("div", "take__quiz", "")
        appendElements(scoreContainer, takeQuiz)
        const text = createElements("p", "text", "It's lonely here, take a quiz 👀 ")
        appendElements(takeQuiz, text)
        const link = createElements("a", "link", "Take quiz")
        appendElements(takeQuiz, link)
        link.href = "./quizCategories.html"
    }
}

async function getUserScore() {
    const id = localStorage.getItem("userId");

    const URL = `http://localhost:5005/getScores/${id}`;

    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            getScore(data);
        } else {
            console.error('Failed to fetch user Score');
            // Handle errors when the response status is not ok
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
}


if (localStorage.getItem("token")) {
    getUserProfile()
    getUserScore()
} else {
    window.location.href = "/authentication.html"
}


document.querySelector(".logout__btn").addEventListener("click", () => {
    localStorage.removeItem('token')
    window.location.href = "/authentication.html"
})



function toggle_visibility() {
    var e = document.getElementById('feedback-main');
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

document.querySelector(".feedback-button").addEventListener("click", () => {
    toggle_visibility()
})

const feedbackDiv = document.querySelector("#feedback-div");

const feedbackForm = document.querySelector("#feedback-form1");

feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.querySelector("#feedback-name").value
    const email = document.querySelector("#feedback-email").value
    const comment = document.querySelector("#feedback-comment").value
    // Prepare the user score to send to the server.
    const userFeedback = {
        name,
        email,
        comment
    };

    // Send a post request
    const serverURL = 'https://eorctzvnce9zu0j.m.pipedream.net';

    const response = await fetch(serverURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFeedback)
    });

    if (response.ok) {
        // Registration successful
        feedbackForm.reset()
        toggle_visibility()
        const user = createElements("p", "btn", "Thank you for your feedback")
        user.style.width = "60%"
        user.style.maxWidth = "300px"
        user.style.margin = "20px auto"
        appendElements(userContainer, user)
    } else {
        const errorFeedback = await response.json();
        console.error(errorFeedback);
    }
})