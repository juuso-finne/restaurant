import MenuItem from "../components/MenuItem";
import { useQuery } from 'react-query'
import { useState, useEffect } from "react";
import { Stack, Typography } from '@mui/material/';

const Menu = () => {

    const [apiEnabled, setApiEnabled] = useState(true);

    const { isLoading, error, data } = useQuery("menuItems", async () => {
        const res = await fetch(`http://localhost:5502/api/menuitems`);
        return await res.json();
    },
        { enabled: apiEnabled }
    );

    // Prevent the page from making more API calls once the data is loaded

    useEffect(() => {
        if (data && data.length > 0) {
            setApiEnabled(false);
        }
    }, [data]);


    const buildProductList = () => {
        return (
            <ul style={{ listStyleType: "none" }}>
                {data.map((product) => {
                    return (
                        <li key={product.id}>
                            <MenuItem product={product} />
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (

        <Stack alignItems="center">
            <Typography variant='h2' component="h1">Menu</Typography>
            {(!isLoading && !error && buildProductList())}
        </Stack>
    );
}

export default Menu;