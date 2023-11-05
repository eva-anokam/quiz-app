import { listCategories, listQuizzesByCategory } from "./categories.js";


let category = null;
async function fetchQuizCategories() {
    const apiUrl = "https://gray-curious-lamb.cyclic.app/quiz"

    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Network response was not ok ")
        }

        const data = await response.json()
        listCategories(data)

        const categoriesList = document.querySelector(".categories__list")
        const mainElement = document.querySelector("main")

        categoriesList.addEventListener("click", (event) => {
            category = event.target.textContent
            const existingCategoriesContainer = mainElement.querySelector(".categories__container");
            if (existingCategoriesContainer) {
                mainElement.removeChild(existingCategoriesContainer);
            }
            fetchQuizByCategory()

        })
    } catch (error) {
        console.error("Error fetching quiz Categories", error)
        throw error
    }
}

async function fetchQuizByCategory() {
    const apiUrl = `https://gray-curious-lamb.cyclic.app/quiz/categories/${category}`

    try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Network response was not ok ")
        }

        const data = await response.json()
        listQuizzesByCategory(data)
        const quizzes__list = document.querySelector(".quizzes__list")

        quizzes__list.addEventListener("click", (event) => {
            const clickedQuiz = data.find(quizObj => quizObj.title === event.target.textContent)
            localStorage.setItem('clickedQuizId', clickedQuiz.quizId);
            console.log(clickedQuiz)
            localStorage.setItem("clickedQuizTitle", clickedQuiz.title)
            window.location.href = '../quiz.html';
        })

    } catch (error) {
        console.error("Error fetching quiz Categories", error)
        throw error
    }
}



fetchQuizCategories()
fetchQuizByCategory()

