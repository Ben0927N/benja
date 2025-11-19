import { authService } from "../services/authService.js";
import { LoginUI } from "../view/login-ui.js";

document.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementById("login")

    form.addEventListener("submit", async (event) => {

        event.preventDefault()
        const usuario = document.getElementById('username').value
        const password = document.getElementById('password').value

        if (!usuario || !password) {
            LoginUI.showMessage("El usuario y la contraseña son obligatorios", "error")
        }

        try {
            const user = await authService.login(usuario, password)
            window.location.href = 'index.html'
        } catch (error) {
            LoginUI.showMessage(error.message, "error")
        }
    }
    )
}
)