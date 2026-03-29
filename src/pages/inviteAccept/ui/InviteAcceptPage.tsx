import { ArrowBack } from '@mui/icons-material'
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material'
import { AuthForm, AuthPageShell } from '../../../shared/ui'
import { useNavigate } from 'react-router'

export function InviteAcceptPage() {
    const navigate = useNavigate()
    const inviteItems: Array<{ id: number; storeName: string; invitedAt: string; status: string }> = []

    return (
        <AuthPageShell>
            <AuthForm
                title='초대 목록'
                description='받은 초대 내역을 확인할 수 있습니다.'
                footer={
                    <Button
                        onClick={() => navigate(-1)}
                        variant='text'
                        startIcon={<ArrowBack />}
                        sx={{ maxWidth: 160, mx: 'auto' }}
                    >
                        뒤로가기
                    </Button>
                }
            >
                <Stack spacing={1.5} alignItems='stretch'>
                    {inviteItems.length === 0 ? (
                        <Stack spacing={1} alignItems='center' sx={{ py: 2 }}>
                            <Typography variant='body1' sx={{ color: '#111', textAlign: 'center' }}>
                                초대 목록이 없습니다.
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                사장님께 초대 링크를 요청하세요.
                            </Typography>
                        </Stack>
                    ) : (
                        <Paper elevation={0} variant='outlined'>
                            <List disablePadding>
                                {inviteItems.map((invite) => (
                                    <div key={invite.id}>
                                        <ListItem sx={{ alignItems: 'center' }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'grey.300' }}>
                                                    사
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={invite.storeName}
                                                secondary={`${invite.invitedAt} · ${invite.status}`}
                                            />
                                        </ListItem>
                                        <Divider component='li' />
                                    </div>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Stack>
            </AuthForm>
        </AuthPageShell>
    )
}
