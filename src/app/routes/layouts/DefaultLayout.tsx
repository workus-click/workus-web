import type { PropsWithChildren } from 'react'
import workusLogo from "../../../assets/workUs.png";
import {Outlet, useLoaderData, useLocation, useNavigate} from "react-router";
import { AppShell } from "../../../shared/layout";
import {createMainNavItems} from "../../../shared/config/navigation";
import { apiClient } from "../../../shared/api";
import type { accountInfo } from "../loaders/requireAuth.ts";
import { clearAuthToken } from "../../../shared/api/meSession.ts";

export function DefaultLayout({ children }: PropsWithChildren) {

    const navigate = useNavigate()
    const location = useLocation()
    const accountInfo = useLoaderData<accountInfo>();
    const navItems = createMainNavItems(location.pathname, navigate)

    const handleLogout = async () => {
        await apiClient.post('/api/auth/logout')
        clearAuthToken()
        navigate('/login', { replace: true });
    }

    const handleAddStore = () => {
        navigate('/onboarding')
    }

    return (
        <>
            <AppShell
                brand={{ logo: workusLogo, alt: 'WorkUs' }}
                accountInfo={accountInfo}
                onAddStore={handleAddStore}
                onLogout={handleLogout}
                navItems={navItems}
            >
                <Outlet context={accountInfo} />
                {children}
            </AppShell>
        </>
    )
}
