import { useContext } from 'react';
import MenuItem from "../components/MenuItem";
import {Stack, Typography} from '@mui/material/';

const ProductsList = () =>{

    const buildProductList = () =>{
        return(
            <ul style={{listStyleType: "none"}}>
                {products.map((product) =>{
                    return(<li key={product.id}>
                            <MenuItem product={product} />
                        </li>)
                })}
            </ul>
        )
    }

    return(
/*         <Stack alignItems="center">
            <Typography variant='h2' component="h1">Menu</Typography>
            {(!isLoading && !error) && buildProductList()}
        </Stack> */
        <>
        <Typography variant='h2' component="h1">Menu</Typography>
        <Typography variant='body1'>TBD</Typography>
        </>
    )
}

export default ProductsList;