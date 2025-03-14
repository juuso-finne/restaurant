import { createContext, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Auth from './users/pages/Auth'
import Cart from './cart/pages/Cart'
import Checkout from './checkout/pages/Checkout'
import ErrorPage from './shared/pages/Errorpage'
import Home from './shared/pages/Home'
import MainNavigation from './shared/components/MainNavigation'
import Menu from './menu/pages/Menu'


const RouterProvider = ({ children }) => {

    const router =
        <Router>
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
        </Router>

    return (
        <RouterContext.Provider value={Router}>
            {children}
        </RouterContext.Provider>
    )
}

export default RouterProvider