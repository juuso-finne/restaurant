import { createContext, useState } from 'react'

export const loginContext = createContext();

const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    return (
        <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </loginContext.Provider>
    )
}

export default LoginContextProvider