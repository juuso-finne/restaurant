import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Auth from '../../users/pages/Auth'
import Cart from '../../cart/pages/Cart'
import Checkout from '../../checkout/pages/Checkout'
import ErrorPage from '../pages/Errorpage'
import Home from '../pages/Home'
import MainNavigation from './MainNavigation'
import Menu from '../../menu/pages/Menu'


const Router = () => {
    return (
        <BrowserRouter>
            <MainNavigation />
            <main style={{ margin: 0, padding: 0 }}>
                <Switch>

                    <Route path='/' exact>
                        <Home />
                    </Route>

                    <Route path='/auth' exact>
                        <Auth />
                    </Route>

                    <Route path='/cart' exact>
                        <Cart />
                    </Route>

                    <Route path='/checkout' exact>
                        <Checkout />
                    </Route>

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