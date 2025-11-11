const API_URL = 'http://localhost:3000'

export const authService = {

    async login(username, password) {
        
        const response = await fetch(`${API_URL}/usuarios?username=${username}&password=${password}`) 
        const data = response.json()

        //Comprobamos si data trae valores
        if (data.length === 0){}
            //No nos viene info de usuario
        const user = data[0]

        return user
    }
}