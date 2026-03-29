import { useEffect, useMemo, useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { HTTPError } from 'ky'
import { AppButton, AuthForm, AuthPageShell } from '../../../shared/ui'
import { apiClient } from '../../../shared/api'

type ApiResponse<S, E> = {
    code: string
    message: string
    data: S
    error: E | null
}

type InviteStatus = 'PENDING' | 'ACCEPTED' | 'EXPIRED'

type ResolveInviteData = {
    storeName: string
    employeeName: string
    status: InviteStatus
    expiresAt: string
}

type AcceptInviteData = {
    storeId: number
    storeName: string
    acceptedAt: string
}

type ApiError = {
    status: number
    code: string | null
    message: string | null
}

export function InviteApprovalPage() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [invite, setInvite] = useState<ResolveInviteData | null>(null)

    useEffect(() => {
        const inviteToken = token?.trim()
        if (!inviteToken) {
            setLoading(false)
            setError('초대 토큰이 없습니다.')
            return
        }

        let mounted = true
        const run = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await apiClient.get('/api/store-invites/resolve', {
                    searchParams: {
                        token: inviteToken,
                    },
                }).json<ApiResponse<ResolveInviteData, string>>()

                if (!mounted) {
                    return
                }

                setInvite(response.data)
            } catch (err) {
                if (!mounted) {
                    return
                }

                const apiError = await extractApiError(err)
                setError(resolveErrorMessage(apiError))
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        void run()

        return () => {
            mounted = false
        }
    }, [token])

    const expiresAtLabel = useMemo(() => {
        if (!invite?.expiresAt) {
            return ''
        }
        const parsedDate = new Date(invite.expiresAt)
        if (Number.isNaN(parsedDate.getTime())) {
            return invite.expiresAt
        }

        return parsedDate.toLocaleString('ko-KR', { hour12: false })
    }, [invite?.expiresAt])

    const handleAccept = async () => {
        const inviteToken = token?.trim()
        if (!inviteToken) {
            setError('초대 토큰이 없습니다.')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            await apiClient.post(`/api/store-invites/${encodeURIComponent(inviteToken)}/accept`).json<ApiResponse<AcceptInviteData, string>>()
            navigate('/', { replace: true })
        } catch (err) {
            const apiError = await extractApiError(err)
            setError(resolveErrorMessage(apiError))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthPageShell>
            <AuthForm
                title='초대 승인'
                description='초대 정보를 확인한 뒤 승인 버튼을 눌러 합류하세요.'
            >
                <Stack spacing={2}>
                    {loading && (
                        <Typography variant='body2' color='text.secondary'>
                            초대 정보를 확인하고 있습니다.
                        </Typography>
                    )}

                    {!loading && error && <Alert severity='error'>{error}</Alert>}

                    {!loading && !error && invite && (
                        <Stack spacing={1.5}>
                            <Typography variant='body1'>
                                매장명: {invite.storeName}
                            </Typography>
                            <Typography variant='body1'>
                                초대 대상: {invite.employeeName}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                만료일시: {expiresAtLabel}
                            </Typography>

                            <AppButton
                                type='button'
                                onClick={handleAccept}
                                disabled={submitting}
                            >
                                {submitting ? '승인 중...' : '초대 승인'}
                            </AppButton>
                        </Stack>
                    )}
                </Stack>
            </AuthForm>
        </AuthPageShell>
    )
}

async function extractApiError(err: unknown): Promise<ApiError | null> {
    if (!(err instanceof HTTPError)) {
        return null
    }

    const body = await err.response.json<ApiResponse<unknown, string>>().catch(() => null)
    return {
        status: err.response.status,
        code: body?.error ?? null,
        message: body?.message ?? null,
    }
}

function resolveErrorMessage(error: ApiError | null) {
    if (!error) {
        return '초대 처리 중 오류가 발생했습니다.'
    }

    if (error.code === 'INVALID_TOKEN' || error.status === 404) {
        return '유효하지 않은 초대 링크입니다.'
    }

    if (error.code === 'EXPIRED_INVITE' || error.status === 410) {
        return '만료된 초대 링크입니다.'
    }

    if (error.code === 'ALREADY_ACCEPTED' || error.status === 409) {
        return '이미 승인된 초대 링크입니다.'
    }

    if (error.code === 'IDENTITY_MISMATCH' || error.status === 403) {
        return '로그인 사용자 정보가 초대 대상 정보와 일치하지 않습니다.'
    }

    if (error.code === 'ALREADY_MEMBER') {
        return '이미 매장에 소속된 사용자입니다.'
    }

    return error.message ?? '초대 처리 중 오류가 발생했습니다.'
}
