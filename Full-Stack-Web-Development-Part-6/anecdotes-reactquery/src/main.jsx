import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationProvider } from './NotificationContext';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <NotificationProvider>
  <QueryClientProvider client={queryClient}>
    <App />

  </QueryClientProvider>
  </NotificationProvider>
)