import { createBrowserRouter, RouterProvider } from 'react-router'
import App from "./pages/main/App.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}