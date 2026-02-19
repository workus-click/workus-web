import type { PropsWithChildren, ReactNode } from 'react'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import {AppBar, Avatar, Box, Button, Container, Divider, Menu, Paper, Stack, Toolbar, Typography,  IconButton} from '@mui/material'
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
    const companyList = [ {
        company: 'workus',
        compName : 'workus',
        compAddr : '서울특별시 중구 동호로 10길 30'
    },
        {
            company: 'globalKorea',
            compName : '글로벌코리아',
            compAddr : '서울특별시 중랑구 상봉로 134'
        }]


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
        <Typography variant="body2" color="white">
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
                    bgcolor: 'black',
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
                    {navItems && <NavMenu items={navItems} />}
                    <Box sx={{ flexGrow: 1 }} />
                    {accountInfo && (
                        <>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    marginRight : 1,
                                    color: 'common.white',
                                    fontWeight : 1000
                                }}
                            >
                                {`사장님 안녕하세요!`}
                            </Typography>

                            <Avatar
                                src={accountInfo.avatarUrl}
                                sx={{ ml: 1, width: 30, height: 30, bgcolor : 'common.white', color: 'black', cursor: 'pointer' }}
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
                                slotProps={{
                                    paper: {
                                        sx: {
                                            mt: 1,
                                            width: 300,
                                        }
                                    }
                                }}
                            >
                                <Stack spacing={0.5} sx={{ px: 2, py: 1.5  }}>
                                    <Typography variant="h5" sx={{fontWeight : 500}}>
                                        {accountInfo.name} 사장님
                                    </Typography>
                                    {accountInfo.compName && (
                                        <Typography variant='subtitle1' color="text.secondary"  sx={{fontWeight : 500}}>
                                            {accountInfo.compName}
                                        </Typography>
                                    )}
                                </Stack>
                                <Divider sx={{mb : 1, mx: 2, borderBottomWidth: 2.5}}/>
                                <Stack spacing={0.5} sx={{ px: 2, py: 1.5 }}>
                                    <Typography variant='subtitle1' sx={{fontWeight : 500}}>
                                        매장계정전환
                                    </Typography>

                                    {companyList?.map((companyInfo) => (
                                        <Paper
                                            key={companyInfo.company}
                                            elevation={0}
                                        >
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Avatar
                                                    src={accountInfo.avatarUrl}
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                        bgcolor : 'white',
                                                        color: 'black',
                                                        border: '1px solid',
                                                        borderColor: 'grey.400',
                                                        cursor: 'pointer',
                                                        fontSize: 14
                                                    }}
                                                    onClick={handleAvatarClick}
                                                >
                                                    {companyInfo.compName.charAt(0).toUpperCase()}
                                                </Avatar>

                                                <Stack sx={{ flexGrow: 1 }}>
                                                    <Typography variant="subtitle2">
                                                        {companyInfo.compName}
                                                    </Typography>

                                                    <Typography
                                                        variant="overline"
                                                        color="text.secondary"
                                                        sx={{ fontSize: 11 }}
                                                    >
                                                        {companyInfo.compAddr}
                                                    </Typography>
                                                </Stack>
                                                {
                                                companyInfo.company === 'workus'   &&
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: 30,
                                                        minWidth: 50,
                                                        height : 20,
                                                        fontSize: 10,
                                                        bgcolor : '#667EEA'
                                                    }}
                                                >
                                                    현재
                                                </Button>
                                                }
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                                <Divider sx={{mb : 1, mx: 2, borderBottomWidth: 2.5}}/>
                                <Stack direction="row" spacing={1} sx={{ px: 2, py: 1}}>
                                    <IconButton
                                        sx={{
                                            bgcolor: 'grey.200',
                                            width: 30,
                                            height: 30
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <Typography
                                        variant='subtitle2'
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        새 매장 추가
                                    </Typography>
                                </Stack>
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
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flexGrow: 1, width: '100%' }}>
                {children}
            </Container>
            <Box
                component="footer"
                sx={{
                    bgcolor: 'black',
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
