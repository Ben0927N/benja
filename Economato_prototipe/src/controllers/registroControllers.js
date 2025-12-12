import { authService } from '../services/authService.js'; 
import { RegistroUI } from '../view/registro-uis.js';

// Controlador para manejar el registro de usuarios
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        // 1. Obtener valores del formulario
        const nombre = document.getElementById('reg_nombre').value.trim();
        const username = document.getElementById('reg_username').value.trim();
        const email = document.getElementById('reg_email').value.trim();
        const password = document.getElementById('reg_password').value;
        const passwordConfirm = document.getElementById('reg_password_confirm').value;

        // 2. Validaciones básicas
        if (!nombre || !username || !email || !password || !passwordConfirm) {
            RegistroUI.showMessage("Todos los campos son obligatorios", "error");
            return;
        }

        if (password !== passwordConfirm) {
            RegistroUI.showMessage("Las contraseñas no coinciden", "error");
            return;
        }
        
        if (password.length < 6) {
             RegistroUI.showMessage("La contraseña debe tener al menos 6 caracteres", "error");
             return;
        }

        // 3. Crear el objeto de nuevo usuario (Role por defecto: 'user')
        const nuevoUsuario = {
            username: username,
            password: password,
            nombre: nombre,
            email: email,
            role: "user" 
        };

        // 4. Llamar al servicio de registro
        try {
            await authService.register(nuevoUsuario);
            
            RegistroUI.showMessage("¡Registro exitoso! Redirigiendo a Iniciar Sesión...", "success");
            RegistroUI.clearForm();
            
            // Redirigir después de un pequeño retraso para que el usuario vea el mensaje
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); 

        } catch (error) {
            RegistroUI.showMessage(error.message, "error");
        }
    });
});