import { Box, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import workusLogo from '../../../assets/workUs.png'
import { AppShell } from '../../../shared/layout'
import { createMainNavItems } from '../../../shared/config/navigation'
import { TOKEN_STORAGE_KEY } from '../../../features/auth/login/constants'

export function HrPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const navItems = createMainNavItems(location.pathname, navigate)

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        navigate('/login')
    }

    return (
        <AppShell
            brand={{ logo: workusLogo, alt: 'WorkUs' }}
            sectionLabel="출퇴근 관리"
            accountInfo={{ name: 'admin', detail: '시스템 관리자' }}
            onLogout={handleLogout}
            navItems={navItems}
        >
            <Stack spacing={2}>
                <Typography variant="h4">출퇴근 관리</Typography>
                <Box sx={{ height: 320, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }} />
            </Stack>
        </AppShell>
    )
}
