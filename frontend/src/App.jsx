import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Auth from './users/pages/Auth'
import Cart from './cart/pages/Cart'
import Checkout from './checkout/pages/Checkout'
import ErrorPage from './shared/pages/Errorpage'
import Home from './shared/pages/Home'
import MainNavigation from './shared/components/MainNavigation'
import Menu from './menu/pages/Menu'


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
