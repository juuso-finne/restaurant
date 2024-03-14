import { createContext, useCallback, useState, useEffect } from 'react'
import { DateTime, Interval, Duration } from 'luxon'

export const loginContext = createContext();
let logoutTimer;
const tokenValidityTime = Duration.fromObject({
    hours: 1
})

const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const [tokenExpiration, setTokenExpiration] = useState(DateTime.invalid("Not initalized"));

    const internalLogin = useCallback((userData, expiration = DateTime.now().plus(tokenValidityTime)) => {

        if (tokenExpiration.isValid) {
            setTokenExpiration(expiration)
        }
        setIsLoggedIn(true);
        setUser({ ...userData });
        localStorage.setItem(
            'userData',
            JSON.stringify(userData)
        );
        localStorage.setItem(
            'tokenExpiration',
            expiration.toISO()
        );
    }, []);

    const internalLogout = useCallback(() => {
        // TODO: Find out why the localStorage items
        // are not removed when function is called via timeout
        localStorage.removeItem('cart');
        localStorage.removeItem('userData');
        localStorage.removeItem('tokenExpiration');
        setIsLoggedIn(false);
        setUser({});
    }, []);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        const storedExpiration = localStorage.getItem('tokenExpiration');
        let tokenInterval = Interval.invalid("Not initialized");
        let expiration = DateTime.invalid("Not initialized");

        if (!!storedExpiration) {
            expiration = DateTime.fromISO(storedExpiration);
            tokenInterval = Interval.fromDateTimes(DateTime.now(), expiration)
        }

        if (storedUserData && tokenInterval.isValid && expiration.isValid) {
            internalLogin(storedUserData, expiration);
        }
    }, [internalLogin])

    useEffect(() => {
        if (user && tokenExpiration.isValid) {
            const timeRemaining = tokenExpiration.diffNow.toMillis()

            logoutTimer = setTimeout(internalLogout, timeRemaining)
        } else {
            clearTimeout(logoutTimer);
        }
    }, [internalLogout, user, tokenExpiration])

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