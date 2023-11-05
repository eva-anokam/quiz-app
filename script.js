const bars = document.querySelector(".bars");
const close = document.querySelector(".close");
const mobileMenu = document.querySelector(".header__mobile");


// Mobile Navigation

function toggleMobileMenu() {
    mobileMenu.classList.toggle("hide");
}

bars.addEventListener("click", () => {
    bars.classList.add("hide")
    close.classList.remove("hide")
    toggleMobileMenu()
})

close.addEventListener("click", () => {
    close.classList.add("hide")
    bars.classList.remove("hide")
    toggleMobileMenu()
})

mobileMenu.addEventListener("click", () => {
    toggleMobileMenu()
    close.classList.add("hide")
    bars.classList.remove("hide")
})

