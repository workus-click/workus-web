import { Paper, Stack, Typography, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import workusLogo from '../../../assets/workUs.png'
import { AppShell } from '../../../shared/layout'
import { AppButton } from '../../../shared/ui'
import { TOKEN_STORAGE_KEY } from '../../../features/auth/login/constants'
import { createMainNavItems } from '../../../shared/config/navigation'

const storeStats = [
    { label: '직원 수', value: '20명' },
    { label: '오늘 출근 직원', value: '8명' },
    { label: '이번 달 총 근무시간', value: '100시간' },
    { label: '이번 달 예상 인건비', value: '2,500,000원' },
]

export function HomePage() {
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
            sectionLabel="메인"
            accountInfo={{ name: 'admin', detail: '시스템 관리자' }}
            onLogout={handleLogout}
            navItems={navItems}
        >
            <Stack spacing={5}>
                <Stack spacing={1}>
                    <Typography variant="h3" component="h1">
                        우리 매장 현황
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 2,
                    }}
                >
                    {storeStats.map((stat) => (
                        <Paper
                            key={stat.label}
                            variant="outlined"
                            sx={{ p: 3, minHeight: 140, display: 'flex', flexDirection: 'column', gap: 1 }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {stat.label}
                            </Typography>
                            <Typography variant="h4">{stat.value}</Typography>
                        </Paper>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 2,
                    }}
                >
                    <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h6">알바생 등록</Typography>
                            </Box>
                            <AppButton onClick={() => navigate('/hire')}>바로가기</AppButton>
                        </Stack>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h6">출퇴근 관리</Typography>
                            </Box>
                            <AppButton onClick={() => navigate('/hr')}>바로가기</AppButton>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </AppShell>
    )
}
