// This provider is meant to encapsulate all other context providers

import LoginContextProvider from '../users/context/LoginContextProvider';
import CartProvider from '../cart/context/CartProvider';

const GlobalContextProvider = ({ children }) => {
    return (
        <LoginContextProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </LoginContextProvider>
    )
}

export default GlobalContextProvider