import { createContext, useCallback, useState } from 'react'

export const loginContext = createContext();

const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    const internalLogin = useCallback((user) => {
        setIsLoggedIn(true);
        setUser({ ...user });
        localStorage.setItem(
            'userData',
            JSON.stringify(user)
        );
    }, []);

    const internalLogout = useCallback(() => {
        setIsLoggedIn(false);
        setUser({});
        localStorage.removeItem('userData');
    }, []);

    return (
        <loginContext.Provider value={{
            isLoggedIn, user,
            internalLogin, internalLogout
        }}>
            {children}
        </loginContext.Provider>
    )
}

export default LoginContextProvider