import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorPage from './shared/pages/Errorpage'
import Home from './shared/pages/Home'
import ProductsList from './menu/pages/Menu'

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
