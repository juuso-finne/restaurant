// This provider is meant to encapsulate all other context providers

import LoginContextProvider from '../users/context/LoginContextProvider';

const GlobalContextProvider = ({ children }) => {
    return (
        <LoginContextProvider>
            {children}
        </LoginContextProvider>
    )
}

export default GlobalContextProvider