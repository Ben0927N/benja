const API_URL = 'http://localhost:3000'

// Servicio de autenticación
export const authService = {

    // Función para iniciar sesión
    async login(username, password) {
        try {
            const url = `${API_URL}/usuarios?username=${username}&password=${password}`
            const response = await fetch(url)
            const data = await response.json()

            if (data.length === 0) {
                throw new Error("Usuario o contraseña incorrectos")
            }
            const user = data[0]

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    },
    
    // Función para registrar un nuevo usuario
    async register(userData) {
        try {
            const existingUserResponse = await fetch(`${API_URL}/usuarios?username=${userData.username}&email=${userData.email}`)
            const existingUsers = await existingUserResponse.json()

            if (existingUsers.length > 0) {
                const userExists = existingUsers.some(user => user.username === userData.username)
                const emailExists = existingUsers.some(user => user.email === userData.email)
                
                if (userExists) throw new Error("El nombre de usuario ya está en uso.")
                if (emailExists) throw new Error("El email ya está registrado.")
            }
            
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                throw new Error("Error al registrar el usuario en el servidor.")
            }

            return await response.json()
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}