import type { PropsWithChildren, ReactNode } from 'react'
import { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, Divider, Menu, Stack, Toolbar, Typography } from '@mui/material'
import { NavMenu } from '../../ui'

type AppShellProps = PropsWithChildren<{
    brand: {
        logo?: string
        alt?: string
    }
    sectionLabel?: string
    headerActions?: ReactNode
    accountInfo?: {
        name: string
        detail?: string
        avatarUrl?: string
    }
    footer?: ReactNode
    onLogout?: () => void
}>

type AppShellPropsExtended = AppShellProps & {
    navItems?: Array<{
        label: string
        isActive?: boolean
        onClick?: () => void
    }>
}

export function AppShell({ brand, sectionLabel, headerActions, footer, accountInfo, onLogout, children, navItems }: AppShellPropsExtended) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const menuOpen = Boolean(anchorEl)

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogoutClick = () => {
        handleMenuClose()
        onLogout?.()
    }

    const defaultFooter = (
        <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} WorkUs. All rights reserved.
        </Typography>
    )

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            <AppBar
                position="fixed"
                elevation={0}
                color="transparent"
                sx={{
                    borderBottom: navItems ? 'none' : '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                }}
            >
                <Toolbar disableGutters sx={{ px: { xs: 2, md: 4 }, minHeight: 48 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {brand.logo && (
                            <Box
                                component="img"
                                src={brand.logo}
                                alt={brand.alt ?? 'brand-logo'}
                                sx={{ height: 44, width: 'auto' }}
                            />
                        )}
                        {sectionLabel && (
                            <Typography variant="subtitle1" fontWeight={600}>
                                {sectionLabel}
                            </Typography>
                        )}
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    {accountInfo && (
                        <>
                            <Avatar
                                src={accountInfo.avatarUrl}
                                sx={{ width: 40, height: 40, bgcolor: 'primary.main', cursor: 'pointer' }}
                                onClick={handleAvatarClick}
                            >
                                {accountInfo.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Menu
                                anchorEl={anchorEl}
                                open={menuOpen}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <Stack spacing={0.5} sx={{ px: 2, py: 1.5 }}>
                                    <Typography variant="subtitle1">{accountInfo.name}</Typography>
                                    {accountInfo.detail && (
                                        <Typography variant="body2" color="text.secondary">
                                            {accountInfo.detail}
                                        </Typography>
                                    )}
                                </Stack>
                                <Divider />
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Button variant="contained" color="inherit" fullWidth onClick={handleLogoutClick}>
                                        로그아웃
                                    </Button>
                                </Box>
                            </Menu>
                        </>
                    )}
                    {headerActions}
                </Toolbar>
            </AppBar>

            <Toolbar sx={{ minHeight: 48 }} />
            {navItems && <NavMenu items={navItems} />}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flexGrow: 1, width: '100%' }}>
                {children}
            </Container>
            <Box
                component="footer"
                sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 3,
                }}
            >
                <Container maxWidth="lg">{footer ?? defaultFooter}</Container>
            </Box>
        </Box>
    )
}
