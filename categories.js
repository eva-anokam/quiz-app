
const mainElement = document.querySelector(`.main--categories`)

function createElements(tagName, className, textContent) {
    let element = document.createElement(tagName);
    element.classList.add(className)
    element.textContent = textContent
    return element
}
function appendElements(parent, child) {
    parent.appendChild(child)
}

export function listCategories(data) {
    
    const categoriesContainer = createElements("div", "categories__container", "")
    appendElements(mainElement, categoriesContainer)
    const categoriesText = createElements("div", "categories__text", "")
    const categoryHeading = createElements("h2", "categories__heading", "Pick a Quiz Category")
    appendElements(categoriesText, categoryHeading)
    appendElements(categoriesContainer, categoriesText)
    const categoriesList = createElements("ul", "categories__list", "")

    data.forEach(element => {
        const listItem = createElements("li", "list", element)
        appendElements(categoriesList, listItem)
    });

    appendElements(categoriesContainer, categoriesList)
}

export function listQuizzesByCategory(data) {

    const firstQuizzesContainer = mainElement.querySelector('.quizzes__container');

    if (firstQuizzesContainer) {
        mainElement.removeChild(firstQuizzesContainer);
    }

    // Now you can create a new .quizzes__container and add your quizzes to it.

   
    const quizzesContainer = createElements("div", "quizzes__container", "");
    appendElements(mainElement, quizzesContainer);
    const quizzesList = createElements("div", "quizzes__list", "")
    appendElements(quizzesContainer, quizzesList)
    // Loop through the quiz data and create elements
    data.forEach(quiz => {
        const quizItem = createElements("details", "quiz__item", "");

        // Customize the structure for each quiz item based on the new data structure
        // For example:
        const quizTitle = createElements("summary", "quiz__title", quiz.title);
        const quizDescription = createElements("p", "quiz__description", quiz.description);

        // Append elements
        appendElements(quizItem, quizTitle);
        appendElements(quizItem, quizDescription);
        appendElements(quizzesList, quizItem);
    });
}


document.querySelector(".logout__btn").addEventListener("click", () => {
    localStorage.removeItem('token')
    window.location.href = "/authentication.html"
})