import { registerUser } from './register.js';
import { loginUser } from './login.js';

const register__btn = document.querySelector(".register__btn")

register__btn.addEventListener("click", () => {
    registerUser();
})

// Call the loginUser function when needed
loginUser();
