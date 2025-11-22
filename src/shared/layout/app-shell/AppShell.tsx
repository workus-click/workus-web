import type { PropsWithChildren, ReactNode } from 'react'
import { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, Divider, Menu, Stack, Toolbar, Typography } from '@mui/material'
import { NavMenu } from '../../ui'
import {useNavigate} from "react-router";

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
        compName?: string
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

export function AppShell({ brand, headerActions, footer, accountInfo, onLogout, children, navItems }: AppShellPropsExtended) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const navigate = useNavigate()
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
                    padding: '8',
                }}
            >
                <Toolbar disableGutters sx={{ px: { xs: 2, md: 4 }, minHeight: 48 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {brand.logo && (
                            <Box
                                component="img"
                                src={brand.logo}
                                onClick={()=>navigate('/')}
                                alt={brand.alt ?? 'brand-logo'}
                                sx={{ height: 64, width: 'auto' }}
                            />
                        )}
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    {accountInfo && (
                        <>
                            <Typography
                                variant="subtitle2"
                                sx={{marginRight : 1}}
                            >
                                {`${accountInfo.name}님 안녕하세요!`}
                            </Typography>
                            <Avatar
                                src={accountInfo.avatarUrl}
                                sx={{ width: 30, height: 30, bgcolor: 'primary.main', cursor: 'pointer' }}
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
                                sx={{marginTop : 1}}
                            >
                                <Stack spacing={0.5} sx={{ px: 2, py: 1.5 }}>
                                    <Typography variant="subtitle1">{accountInfo.name}</Typography>
                                    {accountInfo.compName && (
                                        <Typography variant="body2" color="text.secondary">
                                            {accountInfo.compName}
                                        </Typography>
                                    )}{accountInfo.detail && (
                                        <Typography variant="body2" color="text.secondary">
                                            {accountInfo.detail}
                                        </Typography>
                                    )}
                                </Stack>
                                <Divider sx={{marginBottom : 1}}/>
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Button variant="contained" color="inherit" fullWidth onClick={()=>{}}>
                                        회사변경
                                    </Button>
                                </Box>
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Button variant="contained" color="inherit" fullWidth onClick={()=>{}}>
                                        회원정보 수정
                                    </Button>
                                </Box>
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
