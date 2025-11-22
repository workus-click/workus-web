import { createBrowserRouter, RouterProvider } from 'react-router'
import { HomePage } from '../../pages/home'
import { HirePage } from '../../pages/hire'
import { HrPage } from '../../pages/hr'
import { SalaryPage } from '../../pages/salary'
import { LoginPage } from '../../pages/login'
import { DefaultLayout } from './layouts/DefaultLayout.tsx'
import { requireAuth } from "./loaders/requireAuth.ts";
import { redirectIfAuth } from "./loaders/redirectIfAuth.ts";

const router = createBrowserRouter([
    {
        path: '/login',
        loader : redirectIfAuth,
        element: <LoginPage />,
    },
    {
        element: <DefaultLayout />,
        loader: requireAuth,
        children: [
            {
                path: '/',
                element: <HomePage />,
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
        ]
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}
