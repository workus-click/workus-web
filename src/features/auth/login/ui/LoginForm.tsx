import { useMemo, useState } from 'react'
import { Alert, Link, Stack, TextField } from '@mui/material'
import { HTTPError } from 'ky'
import { AppButton, AuthForm } from '../../../../shared/ui'
import { apiClient } from '../../../../shared/api'
import { useNavigate, useSearchParams } from 'react-router'
import { issueAuthToken } from '../../../../shared/api/meSession'

type FormState = {
    username: string
    password: string
}

const initialState: FormState = {
    username: '',
    password: '',
}

export function LoginForm() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const inviteToken = searchParams.get('invite')
    const [form, setForm] = useState<FormState>(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isSubmitDisabled = useMemo(() => {
        return !form.username || !form.password || loading
    }, [form, loading])

    const handleChange = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [key]: event.target.value }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await apiClient.post('/api/auth/login', {
                json: {
                    loginId: form.username,
                    password: form.password,
                },
            })
            issueAuthToken()

            if (inviteToken) {
                navigate(`/invite/accept/${encodeURIComponent(inviteToken)}`)
                return
            }

            navigate('/')
        } catch (err) {
            if (err instanceof HTTPError) {
                setError(err.response.status === 401 ? '아이디 또는 비밀번호가 올바르지 않습니다.' : '로그인에 실패했습니다.')
            } else {
                setError('로그인에 실패했습니다.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthForm
            title='안녕하세요!'
            description='WorkUs와 함께 시작해봐요'
            formProps={{ onSubmit: handleSubmit }}
        >
            <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>}

                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        label="아이디"
                        value={form.username}
                        onChange={handleChange('username')}
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        value={form.password}
                        onChange={handleChange('password')}
                    />
                </Stack>

                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Link component="button" type="button" underline="hover" sx={{ fontSize: 14 }}>
                        계정정보 찾기
                    </Link>
                </Stack>

                {inviteToken && (
                    <Alert severity='info'>
                        초대 승인 진행을 위해 로그인 후 초대 승인 페이지로 이동합니다.
                    </Alert>
                )}

                <Stack spacing={1.5}>
                    <AppButton fullWidth type="submit" disabled={isSubmitDisabled}>
                        {loading ? '로그인 중...' : '로그인'}
                    </AppButton>
                    <AppButton
                        fullWidth
                        variant="outlined"
                        color="inherit"
                        type="button"
                        onClick={() => { navigate(inviteToken ? `/signup?invite=${encodeURIComponent(inviteToken)}` : '/signup') }}
                    >
                        회원가입
                    </AppButton>
                </Stack>
            </Stack>
        </AuthForm>
    )
}
