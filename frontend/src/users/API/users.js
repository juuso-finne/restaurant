export const login = async ({ email, password }) => {
    try {
        const response = await fetch('http://localhost:5502/api/users/login', {
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