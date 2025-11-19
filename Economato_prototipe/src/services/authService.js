const API_URL = 'http://localhost:3000'

export const authService = {

    async login(username, password) {

        try {
            const url = `${API_URL}/usuarios?username=${username}&password=${password}`
            const response = await fetch(`${API_URL}/usuarios?username=${username}&password=${password}`)
            const data = await response.json()

            //Comprobamos si data trae valores
            if (data.length === 0) {
                //No nos viene info del usuario
                throw new Error("Usuario o contraseña incorrectos")
            }
            const user = data[0]

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }
}    