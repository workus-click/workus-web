import { createBrowserRouter, RouterProvider } from 'react-router'
import { HomePage } from '../../pages/home'
import { HirePage } from '../../pages/hire'
import { HrPage } from '../../pages/hr'
import { SalaryManagePage, SalaryLedgerPage } from '../../pages/salary'
import { LoginPage } from '../../pages/login'

import { OnboardingPage } from '../../pages/onboarding'
import { InviteAcceptPage, InviteApprovalPage } from '../../pages/inviteAccept'
import { StoreRegisterPage } from '../../pages/storeRegister'

import { DefaultLayout } from './layouts/DefaultLayout.tsx'
import { requireAuth } from "./loaders/requireAuth.ts";
import { requireInviteAccess } from "./loaders/requireInviteAccess.ts";
import { redirectIfAuth } from "./loaders/redirectIfAuth.ts";
import { SignupPage } from "../../pages/signup/SignupPage.tsx";

const router = createBrowserRouter([
    {
        path: '/login',
        loader: redirectIfAuth,
        element: <LoginPage />,
    },
    {
        path: '/signup',
        loader: redirectIfAuth,
        element: <SignupPage />,
    },
    {
        path: '/onboarding',
        loader: requireAuth,
        element: <OnboardingPage />,
    },
    {
        path: '/invite/list',
        loader: requireInviteAccess,
        element: <InviteAcceptPage />,
    },
    {
        path: '/invite/accept/:token',
        loader: requireInviteAccess,
        element: <InviteApprovalPage />,
    },
    {
        path: '/store/register',
        loader: requireAuth,
        element: <StoreRegisterPage />,
    },
    {
        path: '/payslip',
        element: <PayslipPage />,
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
                path: '/salary/manage',
                element: <SalaryManagePage />,
            },
            {
                path: '/salary/ledger',
                element: <SalaryLedgerPage />,
            },
        ]
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}
