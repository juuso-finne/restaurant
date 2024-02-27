import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import ErrorPage from './shared/pages/Errorpage'
import Home from './shared/pages/Home'
import ProductsList from './menu/pages/Menu'

function App() {


  return (
    <Router>
      <Switch>

        <Route path='/' exact>
          <Home/>
        </Route>

        <Route path='/menu' exact>
          <ProductsList/>
        </Route>

        <Route path='/error' exact>
          <ErrorPage/>
        </Route>

        <Redirect to='/error' />

      </Switch>
    </Router>

  )
}

export default App
