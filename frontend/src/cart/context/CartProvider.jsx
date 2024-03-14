import { useState, createContext, useEffect, useContext } from 'react'
import { loginContext } from '../../users/context/LoginContextProvider';

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const { user, isLoggedIn } = useContext(loginContext);
    const defaultCart = { userId: "", items: [] }

    const [cart, setCart] = useState({ ...defaultCart });
    const [localCart, setLocalCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart ? storedCart : { ...defaultCart }
    })

    useEffect(() => {
        if (isLoggedIn) {
            if (user.id === localCart.userId) {
                setCart(localCart);
            } else {
                setCart(() => ({ ...defaultCart, userId: user.id }));
            }
        }
    }, [isLoggedIn]);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    // Return the amount of a given item in cart
    const getItemQuantity = (itemId) => {
        const item = cart.items.find((cartItem) => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };

    // Remove all items of given id from cart
    const removeItem = (itemId) => {
        setCart((oldCart) => ({ ...oldCart, items: oldCart.items.filter((item) => item.id !== itemId) }));
    }

    // Reduce the quantity of a given item by 1
    const decrementItem = (itemId) => {
        const itemQuantity = getItemQuantity(itemId)
        if (itemQuantity === 1)
            removeItem(itemId)
        else if (itemQuantity !== 0) {
            setCart((oldCart) => ({
                ...oldCart, items: oldCart.items.map((item) => {
                    if (item.id === itemId)
                        return { ...item, quantity: item.quantity - 1 }
                    else
                        return item
                })
            }));
        }
    }

    // Increase the quantity of a given item by 1
    const incrementItem = (item) => {
        const itemQuantity = getItemQuantity(item.id)
        if (itemQuantity === 0) {
            setCart((oldCart) => ({ ...oldCart, items: [...oldCart.items, { ...item, quantity: 1 }] }));
        }
        else {
            setCart((oldCart) => ({
                ...oldCart, items: oldCart.items.map((item) => {
                    if (item.id === item.id)
                        return { ...item, quantity: item.quantity + 1 };
                    else
                        return item;
                })
            }));
        }
    }

    // Return the price total
    const totalPrice = () => {
        let total = 0;
        if (cart.items.length !== 0) {
            cart.items.forEach(cartItem => {
                total += cartItem.quantity * cartItem.price;
            });
        }
        return total.toFixed(2);
    }

    return (
        <CartContext.Provider
            value={{ getItemQuantity, removeItem, decrementItem, incrementItem, totalPrice, cart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;