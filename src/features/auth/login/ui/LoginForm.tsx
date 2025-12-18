import ky from 'ky'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Checkbox, FormControlLabel, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import { AppButton } from '../../../../shared/ui'
import { mockSignIn } from '../lib/mockSignIn'
import {AUTH_COMP_LIST, REMEMBER_ID_STORAGE_KEY} from '../constants'
import workusLogo from '../../../../assets/workUs.png'
import {companyStore} from "../../../../entities/company/model/companyStore.ts";
import {useNavigate} from "react-router";

type props = {
    nextStep : ()=>void,
}

type ServerTimeResponse = {
    serverTime: string
}

type FormState = {
    username: string
    password: string
    rememberId: boolean
}

const initialState: FormState = {
    username: '',
    password: '',
    rememberId: true,
}

export function LoginForm( {nextStep} : props) {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormState>(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [serverTime, setServerTime] = useState<string | null>(null)
    const {setCompanyList} = companyStore(state => state.actions)

    useEffect(() => {
        const savedId = localStorage.getItem(REMEMBER_ID_STORAGE_KEY)
        if (savedId) {
            setForm((prev) => ({ ...prev, username: savedId }))
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        ky.get('/api/time', { signal: controller.signal })
            .json<ServerTimeResponse>()
            .then((data) => setServerTime(data.serverTime))
            .catch((err) => {
                if (controller.signal.aborted) return
                console.error(err)
            })

        return () => controller.abort()
    }, [])

    const isSubmitDisabled = useMemo(() => {
        return !form.username || !form.password || loading
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
                username: form.username,
                password: form.password,
            })
            if (form.rememberId) {
                localStorage.setItem(REMEMBER_ID_STORAGE_KEY, form.username)
            } else {
                localStorage.removeItem(REMEMBER_ID_STORAGE_KEY)
            }

            //로그인 성공시 회사리스트 반환
            setCompanyList(AUTH_COMP_LIST);
            nextStep();

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
                {serverTime && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            서버 시간: {serverTime}
                        </Typography>
                    </Box>
                )}

                {error && <Alert severity="error">{error}</Alert>}

                <Stack spacing={2}>
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
                    <AppButton variant="outlined" color="inherit" type="button" onClick={()=>{navigate('/signup')}}>
                        회원가입
                    </AppButton>
                </Stack>
            </Stack>
        </Paper>
    )
}
