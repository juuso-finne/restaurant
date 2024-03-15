import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from '../components/OrderSummary';
import { Container, Typography } from '@mui/material';

import { loginContext } from '../../users/context/LoginContextProvider';
import { CartContext } from '../../cart/context/CartProvider';

const Checkout = () => {

  const { user } = useContext(loginContext);
  const { cart, setCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [oldCart, setOldCart] = useState({});

  const history = useHistory();

  const submitHandler = async (customerData) => {
    const apiUrl = `http://localhost:5502/api/orders`;
    const orderData = {
      customerId: user.id,
      customer: customerData,
      items: cart.items
    };

    try {
      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${user.token}`
          },
          body: JSON.stringify(orderData)
        }
      )

      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const order = await response.json();
      setOldCart(order);
      setOrderPlaced(true);
      setCart({ ...cart, items: [] });
      window.scrollTo(0, 0);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {!orderPlaced ?
        <>
          <Typography variant='h2' component="h1">Checkout</Typography>
          {cart.items.length > 0 ?
            <>
              <Typography variant='h4' component="h3">Order summary:</Typography>
              <OrderSummary cart={cart} />
              <CheckoutForm submitHandler={submitHandler} user={user} />
            </> :
            <>
              <p>Your shopping cart is empty</p>
              <p><Link to='/Menu'>Back to Menu</Link></p>
            </>
          }
        </>
        :
        <>
          <Typography variant='h3'>Order successfully placed!</Typography>
          <OrderSummary cart={oldCart} />
        </>}
    </Container>
  )
}

export default Checkout;