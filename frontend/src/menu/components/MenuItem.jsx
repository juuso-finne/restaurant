import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material/';
import { loginContext } from '../../users/context/LoginContextProvider';
import { useState, useContext, useEffect } from 'react'

import { CartContext } from '../../cart/context/CartProvider';

const MenuItem = ({ product }) => {

  const { incrementItem, getItemQuantity, cart } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(getItemQuantity(product.id));
  const { id, name, price } = product;
  const shortProduct = { id, name, price };

  useEffect(() => {
    setItemCount(getItemQuantity(product.id))
  }, [cart]);

  return (
    <Card style={{ display: "flex", alignItems: "center", maxWidth: "100%", margin: "10px" }}>
      <CardMedia
        component='img'
        image={`http://localhost:5502/${product.image}`}
        alt={product.name}
        style={{ objectFit: 'cover', width: '100px', height: '100px' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}, {product.price} €
        </Typography>


        {useContext(loginContext).isLoggedIn &&
          <>
            <Button variant="contained" onClick={() => incrementItem(shortProduct)}
              style={{ position: 'static', zIndex: 0 }}
            >
              Add to cart
            </Button>

            {itemCount > 0 && <Typography variant="subtitle2">In cart: {itemCount}</Typography>}
          </>
        }
        <Typography variant="subtitle1">{product.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default MenuItem;