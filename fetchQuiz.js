import { quizApp } from "./quiz.js";
const clickedQuizId = localStorage.getItem('clickedQuizId');

export async function fetchQuizQuestions() {
    const apiUrl = `https://gray-curious-lamb.cyclic.app/quiz/q/${clickedQuizId}/questions`

    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Network response was not ok ")
        }

        const data = await response.json()

        quizApp(data)
    } catch (error) {
        console.error("Error fetching quiz questions", error)
        throw error
    }
}

fetchQuizQuestions()

