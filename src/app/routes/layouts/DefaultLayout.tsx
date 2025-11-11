import type { PropsWithChildren } from 'react'
import workusLogo from "../../../assets/workUs.png";
import {Outlet, useLoaderData, useLocation, useNavigate} from "react-router";
import { AppShell } from "../../../shared/layout";
import {TOKEN_STORAGE_KEY} from "../../../features/auth/login/constants.ts";
import {createMainNavItems} from "../../../shared/config/navigation";

export function DefaultLayout({ children }: PropsWithChildren) {

    const navigate = useNavigate()
    const location = useLocation()
    const accountInfo = useLoaderData();
    const navItems = createMainNavItems(location.pathname, navigate)

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        navigate('/login');
    }

    return (
        <>
            <AppShell
                brand={{ logo: workusLogo, alt: 'WorkUs' }}
                accountInfo={accountInfo}
                onLogout={handleLogout}
                navItems={navItems}
            >
                <Outlet/>
                {children}
            </AppShell>
        </>
    )
}
