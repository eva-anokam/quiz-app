
const registerBtn = document.querySelector(".register__btn")
const close = document.querySelector(".close__btn")
const popup = document.querySelector(".popup")
const form = document.querySelector(".form")

export function displayPopup() {
    popup.classList.add("open-popup")
}
function togglePopup() {

    const inputElements = form.querySelectorAll("input");

    inputElements.forEach((element) => {
        element.value = "";
    });

}

function closePopup() {
    togglePopup()
    popup.classList.remove("open-popup")
}

close.addEventListener("click", closePopup);