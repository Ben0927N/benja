export const RegistroUI = {
    /**
     * Muestra un mensaje en el párrafo de notificaciones del formulario de registro.
     * @param {string} message - El mensaje a mostrar.
     * @param {string} type - 'success' o 'error' (deben estar en login.css).
     */
    showMessage(message, type = 'error') {
        const msgElement = document.getElementById("registroMessage");
        // Asegúrate de que este ID ("registroMessage") existe en tu registro.html
        if (msgElement) { 
            msgElement.textContent = message;
            // La clase se usa para darle el color (rojo/verde)
            msgElement.className = `message ${type}`; 
        } else {
             console.error("Elemento 'registroMessage' no encontrado en el DOM.");
        }
    },
    
    /**
     * Limpia todos los campos del formulario de registro.
     */
    clearForm() {
        const form = document.getElementById("registroForm");
        if (form) {
            form.reset();
        }
    }
}