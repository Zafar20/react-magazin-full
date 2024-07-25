import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './scss/main.scss'

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
)
