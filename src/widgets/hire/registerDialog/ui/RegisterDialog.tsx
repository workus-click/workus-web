import { Alert, AlertTitle, Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, styled, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { HTTPError } from 'ky'
import { WorkingHoursTable } from '../../workingHoursTable'
import { apiClient } from '../../../../shared/api'

export interface RegisterDialogProps {
    isOpen: boolean
    onClose: () => void
}

type ApiResponse<S, E> = {
    code: string
    message: string
    data: S
    error: E | null
}

type CreateInviteData = {
    inviteToken: string
    inviteUrl: string
    expiresAt: string
}

type FormState = {
    employeeName: string
    employeePhone: string
    residentNumber: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialFormState: FormState = {
    employeeName: '',
    employeePhone: '',
    residentNumber: '',
}

const MyTextField = styled(TextField)<{ customHeight?: number; useBorderRadius?: boolean }>(({ customHeight, useBorderRadius }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: useBorderRadius ? 4 : 0,
        height: customHeight,
    },
}))

const onlyDigits = (value: string) => value.replace(/\D/g, '')

const formatResidentNumber = (value: string) => {
    const digits = onlyDigits(value).slice(0, 13)
    if (digits.length <= 6) {
        return digits
    }
    return `${digits.slice(0, 6)}-${digits.slice(6)}`
}

const formatPhone = (value: string) => {
    const digits = onlyDigits(value).slice(0, 11)

    if (digits.length <= 3) {
        return digits
    }

    if (digits.length <= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`
    }

    if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export function RegisterDialog({ isOpen, onClose }: RegisterDialogProps) {
    const [step, setStep] = useState<number>(1)
    const [form, setForm] = useState<FormState>(initialFormState)
    const [errors, setErrors] = useState<FormErrors>({})

    const [selectedMethod, setSelectedMethod] = useState<'kakao' | 'direct' | null>(null)
    const [inviteUrl, setInviteUrl] = useState('')
    const [inviteLoading, setInviteLoading] = useState(false)
    const [inviteError, setInviteError] = useState<string | null>(null)

    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            return
        }

        setStep(1)
        setForm(initialFormState)
        setErrors({})
        setSelectedMethod(null)
        setInviteUrl('')
        setInviteLoading(false)
        setInviteError(null)
        setIsCopied(false)
    }, [isOpen])

    const employeeNameLabel = useMemo(() => {
        return form.employeeName.trim() || '-'
    }, [form.employeeName])

    const employeePhoneLabel = useMemo(() => {
        return form.employeePhone || '-'
    }, [form.employeePhone])

    const handleFormChange = (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value

        if (key === 'residentNumber') {
            value = formatResidentNumber(value)
        }

        if (key === 'employeePhone') {
            value = formatPhone(value)
        }

        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))

        setErrors((prev) => {
            const next = { ...prev }
            delete next[key]
            return next
        })
    }

    const validateStep1 = () => {
        const nextErrors: FormErrors = {}

        if (!form.employeeName.trim()) {
            nextErrors.employeeName = '이름을 입력해주세요.'
        }

        const phoneDigits = onlyDigits(form.employeePhone)
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            nextErrors.employeePhone = '연락처 형식이 올바르지 않습니다.'
        }

        if (onlyDigits(form.residentNumber).length !== 13) {
            nextErrors.residentNumber = '주민등록번호는 13자리 숫자여야 합니다.'
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleNext = () => {
        if (!validateStep1()) {
            return
        }
        setStep(2)
    }

    const handleSelectDirect = async () => {
        setSelectedMethod('direct')
        setInviteError(null)

        if (inviteUrl || inviteLoading) {
            return
        }

        setInviteLoading(true)

        try {
            const response = await apiClient.post('/api/store-invites', {
                json: {
                    employeeName: form.employeeName.trim(),
                    employeePhone: onlyDigits(form.employeePhone),
                    residentNumber: onlyDigits(form.residentNumber),
                },
            }).json<ApiResponse<CreateInviteData, string>>()

            const apiInviteUrl = response.data.inviteUrl.startsWith('/')
                ? response.data.inviteUrl
                : `/signup?invite=${response.data.inviteToken}`
            setInviteUrl(`${window.location.origin}${apiInviteUrl}`)
        } catch (err) {
            if (err instanceof HTTPError) {
                const body = await err.response.json<ApiResponse<unknown, string>>().catch(() => null)
                setInviteError(body?.message ?? '초대 링크 생성에 실패했습니다.')
            } else {
                setInviteError('초대 링크 생성에 실패했습니다.')
            }
        } finally {
            setInviteLoading(false)
        }
    }

    const handleCopy = async () => {
        if (!inviteUrl) {
            return
        }

        try {
            await navigator.clipboard.writeText(inviteUrl)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch {
            setInviteError('초대 링크 복사에 실패했습니다.')
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby='register-dialog-title'
            slotProps={{
                paper: {
                    sx: { width: '600px', maxWidth: '90vw' },
                },
            }}
        >
            <DialogTitle
                id='register-dialog-title'
                sx={{
                    m: 0,
                    p: 2,
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '22px',
                }}
            >
                직원등록
            </DialogTitle>
            <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#fff',
                }}
            >
                ✕
            </IconButton>

            <DialogContent dividers sx={{ px: 3, py: 4 }}>
                {step === 1 && (
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <Stack spacing={1} sx={{ mb: 2 }}>
                            <Typography fontSize={17} fontWeight={600}>📋 인적사항</Typography>
                            <Stack direction='row' spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                    <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>이름 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                    <MyTextField
                                        useBorderRadius
                                        customHeight={32}
                                        sx={{ flex: 1 }}
                                        value={form.employeeName}
                                        onChange={handleFormChange('employeeName')}
                                        error={!!errors.employeeName}
                                        helperText={errors.employeeName}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                    <Typography fontSize={15} sx={{ minWidth: 100, textAlign: 'right' }}>주민등록번호 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                    <MyTextField
                                        useBorderRadius
                                        customHeight={32}
                                        sx={{ flex: 1 }}
                                        value={form.residentNumber}
                                        onChange={handleFormChange('residentNumber')}
                                        error={!!errors.residentNumber}
                                        helperText={errors.residentNumber}
                                        placeholder='123456-1234567'
                                        slotProps={{
                                            htmlInput: {
                                                inputMode: 'numeric',
                                                maxLength: 14,
                                            },
                                        }}
                                    />
                                </Box>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                    <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>연락처 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                    <MyTextField
                                        useBorderRadius
                                        customHeight={32}
                                        sx={{ flex: 1 }}
                                        value={form.employeePhone}
                                        onChange={handleFormChange('employeePhone')}
                                        error={!!errors.employeePhone}
                                        helperText={errors.employeePhone}
                                        placeholder='010-1234-5678'
                                        slotProps={{
                                            htmlInput: {
                                                inputMode: 'numeric',
                                                maxLength: 13,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                    <Typography fontSize={15} sx={{ minWidth: 100, textAlign: 'right' }}>고용형태 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                    <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                                </Box>
                            </Stack>
                        </Stack>

                        <Stack spacing={1} sx={{ mb: 2 }}>
                            <Typography fontSize={17} fontWeight={600}>⏰ 근무정보</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>근무기간</Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                                <Typography>~</Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>근무시간</Typography>
                                <WorkingHoursTable variant='popover' />
                            </Box>
                        </Stack>

                        <Stack spacing={1} sx={{ mb: 2 }}>
                            <Typography fontSize={17} fontWeight={600}>💰 급여정보</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>급여형태 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>시간단가 <Box component='span' sx={{ color: 'red' }}>*</Box></Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>월급여</Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>사회보험</Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography fontSize={17} fontWeight={600}>📄 근로계약서</Typography>
                            <Box sx={{ height: 50, border: '1px solid', borderColor: 'divider', borderRadius: 0.5 }} />
                        </Stack>

                        <Stack direction='row' spacing={0.5} justifyContent='center' sx={{ pt: 3 }}>
                            <Button variant='contained' color='secondary' onClick={onClose}>
                                취소
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleNext}>
                                다음
                            </Button>
                        </Stack>
                    </Box>
                )}

                {step === 2 && (
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <Alert
                            severity='success'
                            sx={{
                                bgcolor: '#dfecfb',
                                color: '#333',
                                p: 2,
                                mb: 2,
                                borderRadius: 0.3,
                                '& .MuiAlert-icon': {
                                    color: '#6366F1',
                                    fontSize: 20,
                                },
                            }}
                        >
                            <AlertTitle sx={{ color: '#6366F1', fontSize: 15, fontWeight: 600 }}>
                                직원 등록 완료
                            </AlertTitle>
                            {employeeNameLabel}님에게 초대 링크를 보내주세요. <br />
                            초대 승인 시 임직원은 본인의 근무 스케줄 및 급여명세서를 조회할 수 있습니다.
                        </Alert>

                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0.5, p: 2 }}>
                            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                                <Typography sx={{ fontSize: 15 }}>이름</Typography>
                                <Typography sx={{ fontSize: 15 }}>{employeeNameLabel}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                                <Typography sx={{ fontSize: 15 }}>연락처</Typography>
                                <Typography sx={{ fontSize: 15 }}>{employeePhoneLabel}</Typography>
                            </Stack>

                            <Divider sx={{ width: '100%', mb: 2, borderColor: 'divider' }} />

                            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>초대 방법을 선택해주세요</Typography>
                            <Box
                                onClick={() => setSelectedMethod('kakao')}
                                sx={{
                                    px: 1,
                                    py: 1.5,
                                    my: 1,
                                    border: '2px solid',
                                    borderColor: 'divider',
                                    bgcolor: selectedMethod === 'kakao' ? '#dfecfb' : 'transparent',
                                    borderRadius: 0.5,
                                    alignItems: 'center',
                                    display: 'flex',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' },
                                }}
                            >
                                <Stack sx={{ ml: 1 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>카카오톡으로 초대 링크</Typography>
                                    <Typography sx={{ fontSize: 12, color: '#ADADAD' }}>초대 링크를 카카오톡 전송</Typography>
                                </Stack>
                            </Box>

                            <Box
                                onClick={() => {
                                    void handleSelectDirect()
                                }}
                                sx={{
                                    px: 1,
                                    py: 1.5,
                                    my: 1,
                                    border: '2px solid',
                                    borderColor: 'divider',
                                    bgcolor: selectedMethod === 'direct' ? '#dfecfb' : 'transparent',
                                    borderRadius: 0.5,
                                    alignItems: 'center',
                                    display: 'flex',
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' },
                                }}
                            >
                                <Stack sx={{ ml: 1 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>초대링크 직접 전달</Typography>
                                </Stack>
                            </Box>

                            {selectedMethod === 'direct' && (
                                <Stack spacing={1}>
                                    {inviteError && <Alert severity='error'>{inviteError}</Alert>}

                                    <Stack direction='row' sx={{ gap: 2, alignItems: 'flex-end' }}>
                                        <TextField
                                            variant='outlined'
                                            value={inviteLoading ? '초대 링크 생성 중...' : inviteUrl}
                                            sx={{
                                                flex: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 0,
                                                    height: 30,
                                                },
                                                '& input': {
                                                    fontSize: 13,
                                                },
                                            }}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                        <Button
                                            variant={isCopied ? 'contained' : 'outlined'}
                                            color={isCopied ? 'primary' : 'secondary'}
                                            onClick={() => {
                                                void handleCopy()
                                            }}
                                            size='small'
                                            disabled={!inviteUrl || inviteLoading}
                                            startIcon={isCopied ? <CheckIcon /> : <ContentCopyIcon />}
                                            sx={{
                                                borderRadius: 0.5,
                                                height: 30,
                                                width: 80,
                                                bgcolor: isCopied ? '#6366F1' : 'transparent',
                                                '&:hover': {
                                                    bgcolor: isCopied ? '#5558E3' : 'action.hover',
                                                },
                                            }}
                                        >
                                            {isCopied ? '복사됨' : '복사'}
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </Box>

                        <Stack direction='row' spacing={0.5} justifyContent='center' sx={{ pt: 3 }}>
                            <Button variant='contained' color='secondary' onClick={onClose}>
                                확인
                            </Button>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}
