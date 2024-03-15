import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { loginContext } from '../../users/context/LoginContextProvider'
import { useContext, useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'


import Auth from '../../users/pages/Auth'
import Cart from '../../cart/pages/Cart'
import Checkout from '../../checkout/pages/Checkout'
import ErrorPage from '../pages/Errorpage'
import Home from '../pages/Home'
import MainNavigation from './MainNavigation'
import Menu from '../../menu/pages/Menu'



const Router = () => {
    const { isLoggedIn } = useContext(loginContext);


    const [loading, setLoading] = useState(true);
    // Introducing a delay to let isLoggedIn to get set properly
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
            clearTimeout(delay);
        }, 50);

        return () => clearTimeout(delay);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <BrowserRouter>
            <MainNavigation />
            <main style={{ margin: 0, padding: 0 }}>
                <Switch>

                    <Route path='/' exact>
                        <Home />
                    </Route>

                    {
                        !isLoggedIn &&
                        <Route path='/auth' exact>
                            <Auth />
                        </Route>
                    }

                    {
                        isLoggedIn &&
                        <Route path='/cart' exact>
                            <Cart />
                        </Route>
                    }

                    {
                        isLoggedIn &&
                        <Route path='/checkout' exact>
                            <Checkout />
                        </Route>
                    }

                    <Route path='/menu' exact>
                        <Menu />
                    </Route>

                    <Route path='/error' exact>
                        <ErrorPage />
                    </Route>

                    <Redirect to='/error' />

                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default Router