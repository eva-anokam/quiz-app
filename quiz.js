function createDate() {
    // Create a new Date object
    const now = new Date();

    // Get the current date and time
    const currentYear = now.getFullYear();  // Get the 4-digit year (e.g., 2023)
    const currentMonth = now.getMonth();    // Get the month (0-11, where 0 is January)
    const currentDate = now.getDate();      // Get the day of the month (1-31)
    const currentDay = now.getDay();        // Get the day of the week (0-6, where 0 is Sunday)
    const currentHours = now.getHours();    // Get the hour (0-23)
    const currentMinutes = now.getMinutes();  // Get the minutes (0-59)
    const currentSeconds = now.getSeconds();  // Get the seconds (0-59)

    // Create a human-readable date and time string
    const formattedDateTime = `${currentDate}-${currentMonth + 1}-${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`;
    return formattedDateTime
}
export function quizApp(quiz) {
    if (localStorage.getItem("token")) {
        const quizQuestions = quiz
        const mainElement = document.querySelector(".main")
        let quizCount = 0;
        let answersArray = []

        function createElements(tagName, className, textContent) {
            let element = document.createElement(tagName);
            element.classList.add(className)
            element.textContent = textContent
            return element
        }
        function appendElements(parent, child) {
            parent.appendChild(child)
        }
        let containerElement = createElements("div", "container", "")


        function createOptionElement(labelText) {
            const label = document.createElement("label");

            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.value = labelText;
            radioBtn.name = "answer"

            const labelTextNode = document.createTextNode(labelText);

            label.appendChild(radioBtn);
            label.appendChild(labelTextNode);
            return label;
        }


        function createOptionList(questionsArray, quizCountNum) {
            let optionsContainer = createElements("ul", "optionsContainer", "");
            questionsArray[quizCountNum].options.forEach(el => {
                let option = createOptionElement(el)
                let optionItem = createElements("li", "option__item", "")
                appendElements(optionItem, option)
                appendElements(optionsContainer, optionItem)
            })
            return optionsContainer;
        }

        function displayProgress(quizIndex) {
            let display = document.querySelector(".progress")
            if (display) {
                display.remove()
            }
            const num = quizIndex + 1
            const displayProgress = createElements("p", "progress", `${num}/ ${quizQuestions.length}`)

            quizIndex < quizQuestions.length ? appendElements(mainElement, displayProgress) : ""
        }


        function loadQuiz(questionsArray, quizCountNum) {
            displayProgress(quizCountNum)
            const count = quizCountNum
            if (quizCountNum < questionsArray.length) {
                let questionElement = createElements("h2", "question", questionsArray[count].question)
                let optionsContainer = createOptionList(questionsArray, quizCountNum)
                appendElements(containerElement, questionElement)
                appendElements(containerElement, optionsContainer)
                appendElements(mainElement, containerElement)
            }
        }

        function createBtn(btnText) {
            const btnElement = createElements("button", `${btnText}`, btnText);
            return btnElement
        }

        function createExitBtn() {
            let exit = createElements("button", "exit", "exit")
            exit.classList.add("btn")
            return appendElements(mainElement, exit);
        }

        function appendBtn(btnText) {
            let btn = createBtn(btnText)
            btn.classList.add(btnText)
            appendElements(containerElement, btn)
        }

        function checkIfSelected() {
            let inputs = document.querySelectorAll(".optionsContainer .option__item input[type='radio']");
            let result = Array.from(inputs).some(input => input.checked)
            return result
        }

        function saveSelected(arr) {
            let inputs = Array.from(document.querySelectorAll(".optionsContainer .option__item input[type='radio']"));
            let answer = inputs.find(el => el.checked === true)
            arr.push(answer.value)
            return arr;
        }



        const alert = createElements("p", "alert", "Select an answer")

        function loadNext() {
            if (checkIfSelected()) {
                saveSelected(answersArray)
                containerElement.textContent = ""
                quizCount++
                //load next question
                loadQuiz(quizQuestions, quizCount)
                appendBtn("prev") //prev btn created
                appendBtn("next")
            } else {
                appendElements(containerElement, alert)
            }
        }

        function loadPrevious() {
            if (quizCount > 0) { //don't create a prev btn if quizCount === 0
                containerElement.textContent = "";
                quizCount--
                //load prev question
                loadQuiz(quizQuestions, quizCount)
                appendBtn("prev")
                appendBtn("next")
            }
        }

        function displaySubmitBtn() {
            containerElement.textContent = ""
            let displaySubmitBtn = createElements("button", "submit", "submit")
            displaySubmitBtn.classList.add("btn")
            appendElements(mainElement, displaySubmitBtn)
            //clear previous btns
            containerElement.textContent = ""
            return true
        }

        function gradingSystem(quizQuestionArr) {
            // Calculate the unrounded grading point
            const unroundedGradingPoint = 100 / quizQuestionArr.length;

            // Round the grading point to the nearest integer
            const gradingPoint = Math.round(unroundedGradingPoint);

            return gradingPoint;
        }

        function calculateScore(quizQuestionArr, answerArr) {
            let score = 0;
            let gradingPoint = gradingSystem(quizQuestionArr);
            const correctAnswers = [];

            quizQuestionArr.forEach(question => {
                correctAnswers.push(question.correctAnswer);
            });

            correctAnswers.length === answerArr.length && correctAnswers.forEach((element, index) => {
                if (element === answerArr[index]) {
                    score += gradingPoint;
                }
            });

            score = Math.floor(score);
            score = `${score}%`;

            return score;
        }


        function displayScore() {
            const result = createElements("p", "score", "")
            result.textContent = "Score:" + " " + calculateScore(quizQuestions, answersArray)
            //remove all submit btn
            const submitBtn = document.querySelector(".submit");
            if (submitBtn) {
                submitBtn.remove()
            }
            appendElements(mainElement, result)
        }

        function createResult(questionsArray) {
            const resultContainer = createElements("div", "results", "")
            appendElements(mainElement, resultContainer)
            const resultHeading = createElements("h2", "result__heading", "Results")
            appendElements(resultContainer, resultHeading)
            const questionsContainer = createElements("div", "questions__container", "")
            appendElements(resultContainer, questionsContainer)

            questionsArray.forEach(question => {
                const questionDiv = createElements("div", "question__div", "")
                appendElements(questionsContainer, questionDiv)
                const questionHeading = createElements("h3", "question", `${question.question}`)
                appendElements(questionDiv, questionHeading)
                question.options.forEach(option => {
                    const optionEl = createElements("p", "option", option)
                    appendElements(questionDiv, optionEl)
                })
            })
        }

        function evaluateResult(quizQuestionArr, answerArr) {
            createResult(quizQuestions)
            const results = document.querySelector(".results")

            const correctAnswers = []
            quizQuestionArr.forEach(question => {
                correctAnswers.push(question.correctAnswer)
            });

            correctAnswers.length === answerArr.length && correctAnswers.forEach((element, index) => {
                const currentDiv = results.querySelectorAll(".question__div")[index]
                const explanation = createElements("p", "explanation", "")
                appendElements(currentDiv, explanation)
                explanation.textContent = `Explanation: ${quizQuestionArr[index].explanation}`
                const allOptions = currentDiv.querySelectorAll(".option")
                if (element === answerArr[index]) {
                    Array.from(allOptions).find(el => {
                        if (el.textContent === answerArr[index]) {
                            el.style.border = "7px solid green"
                            currentDiv.style.border = "7px solid green"
                        }
                    })
                } else {
                    Array.from(allOptions).find(el => {
                        if (el.textContent === element) {
                            el.style.border = "7px solid green"
                        } else if (el.textContent === answerArr[index]) {
                            el.style.border = "7px solid red"
                        }
                    })
                    currentDiv.style.border = "7px solid red"
                }
            }
            )
        }


        containerElement.addEventListener("click", (event) => {
            if (event.target.textContent === "next") {
                loadNext()
            }
            if (event.target.textContent === "prev") {
                loadPrevious()
            }
            //when at the first quiz question, remove any previously added prev btn
            if (quizCount === 0) {
                // Remove the "prev" button
                const prevButton = document.querySelector(".prev");
                if (prevButton) {
                    prevButton.remove();
                }
            }
            //whatever is clicked on this containerelement, as soon as quizcount === quizquestions.lenght i.e you have exhausted all the question, call submit btn
            if (quizCount === quizQuestions.length) {
                displaySubmitBtn()
                const submitBtn = mainElement.querySelector(".submit")

                submitBtn.addEventListener("click", async () => {
                    const score = calculateScore(quizQuestions, answersArray);
                    displayScore();
                    evaluateResult(quizQuestions, answersArray);

                    //save score to db
                    const userId = localStorage.getItem("userId");
                    const quizTitle = localStorage.getItem("clickedQuizTitle");
                    const date = createDate();

                    // Prepare the user score to send to the server.
                    const userData = {
                        score,
                        userId,
                        date,
                        quizTitle
                    };

                    // Send a post request
                    const serverURL = 'https://busy-red-hummingbird-yoke.cyclic.app/score';

                    const response = await fetch(serverURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userData)
                    });

                    if (response.ok) {
                        // Registration successful
                        const userScoreResponse = await response.json();

                    } else {
                        const errorScore = await response.json();
                        console.error(errorScore);
                    }
                });

            }

        })

        if (window.location.pathname === "/quiz.html") {
            createExitBtn()
            loadQuiz(quizQuestions, quizCount)
            appendBtn("next")
        }

        const exitBtn = document.querySelector(".exit")
        exitBtn.addEventListener("click", () => {
            mainElement.textContent = ""
            if (quizCount < quizQuestions.length) {
                const warning = createElements("p", "warning", "Are you sure you want to exit the quiz, this action is not reversable")
                appendElements(mainElement, warning)
                const yesBtn = createBtn("yes")
                appendElements(mainElement, yesBtn)
                appendBtn("yes")
                const noBtn = createBtn("no")
                appendElements(mainElement, noBtn)
                appendBtn("no")
            } else {
                window.location.href = "quizCategories.html"
            }

            document.querySelector(".yes").addEventListener("click", () => {
                window.location.href = "quizCategories.html"
            })

            document.querySelector(".no").addEventListener("click", () => {
                containerElement.textContent = ""
                mainElement.textContent = ""
                createExitBtn()
                //load current question
                loadQuiz(quizQuestions, quizCount)
                appendBtn("prev") //prev btn created
                appendBtn("next")
            })
        })
    }
    else {
        window.location.href = "/authentication.html"
    }
}



