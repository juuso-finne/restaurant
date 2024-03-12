import { QueryClient, QueryClientProvider } from 'react-query'
import { createContext, useState } from 'react'

import Auth from './users/pages/Auth'
import Cart from './cart/pages/Cart'
import Checkout from './checkout/pages/Checkout'
import ErrorPage from './shared/pages/Errorpage'
import Home from './shared/pages/Home'
import MainNavigation from './shared/components/MainNavigation'
import Menu from './menu/pages/Menu'
import Router from './shared/components/Router'


const queryClient = new QueryClient();
export const loginContext = createContext();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState("")
  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </loginContext.Provider>
  )
}

export default App
