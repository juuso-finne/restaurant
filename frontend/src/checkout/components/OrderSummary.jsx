import { Typography, List, ListItemText } from '@mui/material';


const OrderSummary = ({ cart }) => {


    const totalPrice = () => {
        let total = 0;
        if (cart.items.length !== 0) {
            cart.items.forEach(cartItem => {
                total += cartItem.quantity * cartItem.price;
            });
        }
        return total.toFixed(2);
    }

    const getItemQuantity = (itemId) => {
        const item = cart.items.find((cartItem) => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };


    return (
        <>
            <List>
                {cart.items.map((cartItem) => {
                    return (
                        <li key={cartItem.id}>
                            <Typography variant='body1'>
                                {getItemQuantity(cartItem.id)} x {cartItem.name}
                            </Typography>
                        </li>
                    )
                })}
                <li><Typography variant='h6' component="p">Total: {totalPrice()} €</Typography></li>
            </List>
        </>
    )
}

export default OrderSummary;