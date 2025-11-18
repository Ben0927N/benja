import { authService } from "../services/authService.js";

document.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementsByClassName("login")

    form.addEventListener("submit", async(event) => {

        event.preventDefault()
        const usuario = document.getElementById('username').value
        const password = document.getElementById('password').value

        try {
            const user = await authService.login(username, password)
            window.location.href = 'index.html'
        } catch (error) {
            console.log("Error")
        }
    }
    )
}
)