import { authService } from "../services/authService";

document.addEventListener("DOMContentLoaded"), () => {

    const form = document.getElementById('loginForm')

    form.addEventListener("submit", xxxxx => {

        
        const usuario = document.getElementById('username').value
        const password = document.getElementById('password').value

        try{
            const user = authService.login(username, password)
            window.location.href = 'index.html'
        } catch(error) {
            console.log("Error")
        }
    }

    )
}