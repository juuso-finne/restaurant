import { QueryClient, QueryClientProvider } from 'react-query'

import Router from './shared/components/Router'
import GlobalContextProvider from './shared/GlobalContextProvider';


const queryClient = new QueryClient();

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
