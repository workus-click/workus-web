import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Checkbox, FormControlLabel, Link, Paper, Stack, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { AppButton } from '../../../../shared/ui'
import { mockSignIn } from '../lib/mockSignIn'
import { REMEMBER_ID_STORAGE_KEY } from '../constants'
import workusLogo from '../../../../assets/workUs.png'

type FormState = {
    company: string
    username: string
    password: string
    rememberId: boolean
}

const initialState: FormState = {
    company: '',
    username: '',
    password: '',
    rememberId: true,
}

export function LoginForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState<FormState>(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const savedId = localStorage.getItem(REMEMBER_ID_STORAGE_KEY)
        if (savedId) {
            setForm((prev) => ({ ...prev, username: savedId }))
        }
    }, [])

    const isSubmitDisabled = useMemo(() => {
        return !form.company || !form.username || !form.password || loading
    }, [form, loading])

    const handleChange = (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = key === 'rememberId' ? event.target.checked : event.target.value
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await mockSignIn({
                company: form.company,
                username: form.username,
                password: form.password,
            })
            if (form.rememberId) {
                localStorage.setItem(REMEMBER_ID_STORAGE_KEY, form.username)
            } else {
                localStorage.removeItem(REMEMBER_ID_STORAGE_KEY)
            }
            navigate('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Paper
            elevation={0}
            variant="outlined"
            sx={{ width: '100%', maxWidth: 420, p: { xs: 3, md: 4 } }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Stack spacing={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box component="img" src={workusLogo} alt="WorkUs logo" sx={{ height: 56 }} />
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                <Stack spacing={2}>
                    <TextField label="회사" placeholder="workus" value={form.company} onChange={handleChange('company')} />
                    <TextField
                        label="아이디"
                        placeholder="admin"
                        value={form.username}
                        onChange={handleChange('username')}
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        placeholder="••••"
                        value={form.password}
                        onChange={handleChange('password')}
                    />
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                        control={<Checkbox checked={form.rememberId} onChange={handleChange('rememberId')} />}
                        label="아이디 저장"
                    />
                    <Link component="button" type="button" underline="hover" sx={{ fontSize: 14 }}>
                        계정정보 찾기
                    </Link>
                </Stack>

                <Stack spacing={1.5}>
                    <AppButton type="submit" disabled={isSubmitDisabled}>
                        {loading ? '로그인 중...' : '로그인'}
                    </AppButton>
                    <AppButton variant="outlined" color="inherit" type="button">
                        회원가입
                    </AppButton>
                </Stack>
            </Stack>
        </Paper>
    )
}
