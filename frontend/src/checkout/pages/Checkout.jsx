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
  const [orderState, setOrderState] = useState({})

  const submitHandler = async (customerData) => {
    const apiUrl = `http://localhost:5502/api/orders`;

    const orderData = {
      customerId: user.id,
      customer: customerData,
      items: cart.items
    }

    setOrderState(orderData);

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

      if (response.status === 201) {
        setOrderPlaced(true);
        setCart({ ...cart, items: [] });
        window.scrollTo(0, 0);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }



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
              <OrderSummary data={cart} />
              <CheckoutForm submitHandler={submitHandler} user={user} />
            </> :
            <>
              <Typography>Your shopping cart is empty</Typography>
              <Typography><Link to='/Menu'>Back to Menu</Link></Typography>
            </>
          }
        </>
        :
        <>
          <Typography variant='h3'>Order successfully placed!</Typography>
          <OrderSummary data={orderState} />
          <Typography>{orderState.customer.name}</Typography>
          <Typography>{orderState.customer.street}, {orderState.customer.postalcode} {orderState.customer.city}</Typography>
          <Typography><Link to='/'>Go to homepage</Link></Typography>
        </>}
    </Container>
  )
}

export default Checkout;