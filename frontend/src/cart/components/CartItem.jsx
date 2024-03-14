import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableRow, TableCell, Button } from '@mui/material';
import { useContext } from 'react';

import { CartContext } from '../context/CartProvider';

const CartItem = ({ cartItem }) => {
    const { decrementItem, incrementItem, removeItem } = useContext(CartContext);
    return (
        <TableRow>
            <TableCell>{cartItem.name}</TableCell>
            <TableCell>{cartItem.price} €</TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    onClick={() => decrementItem(cartItem.id)}
                >
                    <RemoveIcon />
                </IconButton>

                {cartItem.quantity}

                <IconButton
                    color="primary"
                    onClick={() => incrementItem(cartItem)}
                >
                    <AddIcon />
                </IconButton>
            </TableCell>
            <TableCell>{(cartItem.price * cartItem.quantity).toFixed(2)} €</TableCell>
            <TableCell>
                <Button variant='contained' onClick={() => removeItem(cartItem.id)}>Remove all</Button>
            </TableCell>
        </TableRow>)
}

export default CartItem;