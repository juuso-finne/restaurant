export const login = async ({ email, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

export const signup = async ({ name, email, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name, email, password
            })
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}