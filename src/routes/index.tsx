import { createBrowserRouter, RouterProvider } from 'react-router'
import { HomePage } from '../pages/home'
import { HirePage } from '../pages/hire'
import { HrPage } from '../pages/hr'
import { SalaryPage } from '../pages/salary'
import { LoginPage } from '../pages/login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/hire',
        element: <HirePage />,
    },
    {
        path: '/hr',
        element: <HrPage />,
    },
    {
        path: '/salary',
        element: <SalaryPage />,
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}
