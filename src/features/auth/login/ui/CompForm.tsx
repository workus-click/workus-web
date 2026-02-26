import { Box, Stack, Typography } from '@mui/material'
import { AppButton, AuthForm } from '../../../../shared/ui'

type RoleCardProps = {
    title: string
    description: string
    onClick?: () => void
}

function RoleCard({ title, description, onClick }: RoleCardProps) {
    return (
        <AppButton
            variant='outlined'
            color='inherit'
            fullWidth
            onClick={onClick}
            sx={{
                py: 1.5,
                px: 2,
                borderRadius: 999,
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: '#d1d5db',
                boxShadow: 'none',
                '&:hover': {
                    borderColor: '#94a3b8',
                },
            }}
        >
            <Stack direction='row' alignItems='center' spacing={1}>
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        border: '1px solid #5a5a5a',
                        flexShrink: 0,
                    }}
                />
                <Box>
                    <Typography variant='subtitle2' sx={{ color: '#242424', lineHeight: 1.2 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{description}</Typography>
                </Box>
            </Stack>
        </AppButton>
    )
}

type CompFormProps = {
    onLogout: () => void
    onInvite: () => void
    onStoreRegister: () => void
}

export function CompForm({ onLogout, onInvite, onStoreRegister }: CompFormProps) {
    return (
        <AuthForm
            title='안녕하세요!'
            description='WorkUs와 함께 시작해봐요'
            footer={
                <Stack spacing={1}>
                    <Typography variant='body1' sx={{ color: '#333', fontWeight: 700, mb: 1.5 }}>
                        + 추가하기
                    </Typography>
                    <AppButton variant='contained' fullWidth onClick={onLogout}>
                        로그아웃
                    </AppButton>
                </Stack>
            }
        >
            <Stack spacing={2}>
                    <RoleCard
                        title='사장님이신가요?'
                        description='사업장 정보를 등록해주세요.'
                        onClick={onStoreRegister}
                    />
                    <RoleCard
                        title='직원이신가요?'
                        description='사장님의 초대를 수락해주세요.'
                        onClick={onInvite}
                    />
                </Stack>
        </AuthForm>
    )
}
