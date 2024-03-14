import { Table, TableBody, TableRow, TableHead, TableCell } from '@mui/material';
import { Container, Typography, Button } from '@mui/material';
import { useContext } from 'react';

import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartProvider';
import CartItem from '../components/CartItem';


const Cart = () => {
    const { totalPrice, cart, setCart } = useContext(CartContext);
    const buildTable = () => {
        return (
            <Container
                style={{ overflowX: 'auto' }}>
                <Link to='/Checkout' style={{ color: "blue", display: 'flex', justifyContent: 'center' }}><Typography variant='h5' component="p">To checkout</Typography></Link>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >Amount</TableCell>
                            <TableCell >Subtotal</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cart.items.map((item) => (
                            <CartItem key={item.id} cartItem={item} />
                        ))}

                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell>{totalPrice()} €</TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={() =>
                                    setCart((oldCart => ({ ...oldCart, items: [] })))}
                                >
                                    Empty cart
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Link style={{ color: "blue", display: 'flex', justifyContent: 'center' }} to='/Checkout'><Typography variant='h5' component="p">To checkout</Typography></Link>
            </Container>
        )
    }

    return (
        <>
            <Typography variant='h2' component="h1" style={{ textAlign: "center" }}>Cart</Typography>
            {cart.items.length > 0 ? buildTable() :
                <>
                    <p>Your shopping cart is empty</p>
                    <p><Link style={{ color: "blue" }} to='/Menu'>Back to Menu</Link></p>
                </>
            }

        </>)
}

export default Cart;