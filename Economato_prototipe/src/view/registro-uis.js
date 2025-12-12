export const RegistroUI = {
    // Método para mostrar mensajes al usuario
    showMessage(message, type = 'error') {
        const msgElement = document.getElementById("registroMessage");
        
        if (msgElement) { 
            msgElement.textContent = message;
            msgElement.className = `message ${type}`; 
        } else {
             console.error("Elemento 'registroMessage' no encontrado en el DOM.");
        }
    },
    // Método para limpiar el formulario de registro
    clearForm() {
        const form = document.getElementById("registroForm");
        if (form) {
            form.reset();
        }
    }
}