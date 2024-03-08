import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material/';
import { useState } from 'react'

const MenuItem = ({ product }) => {
  const [itemCount, setItemCount] = useState(0);

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
        <Button variant="contained" onClick={() => setItemCount(itemCount + 1)}
          style={{ position: 'static', zIndex: 0 }}
        >
          Add to cart
        </Button>
        {itemCount > 0 && <Typography variant="subtitle2">In cart: {itemCount}</Typography>}
        <Typography variant="subtitle1">{product.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default MenuItem;