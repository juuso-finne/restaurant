import { QueryClient, QueryClientProvider } from 'react-query'
import { createContext, useState } from 'react'

import Router from './shared/components/Router'
import GlobalContextProvider from './shared/GlobalContextProvider';


const queryClient = new QueryClient();
export const loginContext = createContext();


function App() {

  return (
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </GlobalContextProvider>
  )
}

export default App
