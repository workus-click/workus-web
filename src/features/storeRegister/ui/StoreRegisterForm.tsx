import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Alert, Stack, TextField } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { HTTPError } from 'ky'
import { AddressInput, AppButton, AuthForm } from '../../../shared/ui'
import { apiClient } from '../../../shared/api'
import { issueAuthToken } from '../../../shared/api/meSession'
import type { AddressValue } from '../../../shared/ui/address/AddressInput'

type StoreAddressValue = AddressValue

type StoreRegistrationFormState = {
    storeName: string
    businessNumber: string
    representativeName: string
    businessType: string
    contactPhoneNumber: string
    storeAddress: StoreAddressValue
}

const initialFormState: StoreRegistrationFormState = {
    storeName: '',
    businessNumber: '',
    representativeName: '',
    businessType: '',
    contactPhoneNumber: '',
    storeAddress: {
        zoneCode: '',
        address: '',
        detailAddress: '',
        fullAddress: '',
    },
}

type APIResponseMessage = {
    message?: string
}

type FormFieldKey = keyof StoreRegistrationFormState
type TextFieldKey = Exclude<FormFieldKey, 'storeAddress'>

type FormErrors = {
    storeName?: string
    businessNumber?: string
    representativeName?: string
    businessType?: string
    contactPhoneNumber?: string
    storeAddress?: string
}

const onlyDigits = (value: string) => value.replace(/\D/g, '')

const formatBusinessNumber = (value: string) => {
    const digits = onlyDigits(value).slice(0, 10)
    if (digits.length <= 3) {
        return digits
    }
    if (digits.length <= 5) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

const requiredTextFieldLabels: Record<TextFieldKey, string> = {
    storeName: '매장명',
    businessNumber: '사업자등록번호',
    representativeName: '대표자명',
    businessType: '업종',
    contactPhoneNumber: '대표전화',
}

export function StoreRegisterForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState<StoreRegistrationFormState>(initialFormState)
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const isSubmitDisabled = useMemo(() => {
        return loading ||
            !form.storeName.trim() ||
            !form.businessNumber.trim() ||
            !form.representativeName.trim() ||
            !form.businessType.trim() ||
            !form.contactPhoneNumber.trim() ||
            !form.storeAddress.fullAddress.trim()
    }, [form, loading])

    const resolveErrorMessage = async (err: unknown, fallback: string) => {
        if (err instanceof HTTPError) {
            const body = await err.response.json<APIResponseMessage | null>().catch(() => null)
            if (body?.message) {
                return body.message
            }
        }

        return fallback
    }

    const validate = () => {
    const nextErrors: FormErrors = {}

        ;(Object.keys(requiredTextFieldLabels) as TextFieldKey[]).forEach((key) => {
            const fieldLabel = requiredTextFieldLabels[key]
            if (!form[key].trim()) {
                nextErrors[key] = `${fieldLabel}은(는) 필수입니다.`
            }
        })

        if (!form.storeAddress.fullAddress.trim()) {
            nextErrors.storeAddress = '사업장주소는 필수입니다.'
        }

        if (!nextErrors.businessNumber && onlyDigits(form.businessNumber).length !== 10) {
            nextErrors.businessNumber = '사업자등록번호 형식이 올바르지 않습니다.'
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const handleChange = (name: TextFieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value

        if (name === 'businessNumber') {
            value = formatBusinessNumber(value)
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorMessage('')
        setSuccessMessage('')

        if (!validate()) {
            return
        }

        setLoading(true)

        try {
            await apiClient.post('/api/stores', {
                json: {
                    storeName: form.storeName,
                    businessNumber: onlyDigits(form.businessNumber),
                    representativeName: form.representativeName,
                    businessType: form.businessType,
                    contactPhoneNumber: form.contactPhoneNumber,
                    storeZipCode: form.storeAddress.zoneCode,
                    storeAddress: form.storeAddress.fullAddress,
                },
            }).json<APIResponseMessage>()

            setSuccessMessage('매장 정보가 등록되었습니다.')
            issueAuthToken()
            navigate('/', { replace: true })
        } catch (err) {
            const message = await resolveErrorMessage(err, '매장 등록에 실패했습니다.')
            setErrorMessage(message)
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/onboarding')
    }

    const handleStoreAddressChange = (nextAddress: StoreAddressValue) => {
        setForm((prev) => ({
            ...prev,
            storeAddress: nextAddress,
        }))
        setErrors((prev) => {
            const next = { ...prev }
            delete next.storeAddress
            return next
        })
    }

    return (
        <AuthForm
            title='매장 등록'
            description='매장 정보를 입력해주세요.'
            formProps={{ onSubmit: handleSubmit }}
            footer={
                <Stack spacing={1} alignItems='stretch'>
                    <AppButton
                        type='button'
                        color='inherit'
                        variant='contained'
                        onClick={handleBack}
                        startIcon={<ArrowBack />}
                        sx={{ borderRadius: 999 }}
                    >
                        뒤로가기
                    </AppButton>
                </Stack>
            }
        >
            <Stack spacing={2}>
                {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
                {successMessage && <Alert severity='success'>{successMessage}</Alert>}

                <TextField
                    label='매장명'
                    value={form.storeName}
                    onChange={handleChange('storeName')}
                    error={!!errors.storeName}
                    helperText={errors.storeName}
                    required
                />
                <TextField
                    label='사업자등록번호'
                    value={form.businessNumber}
                    onChange={handleChange('businessNumber')}
                    error={!!errors.businessNumber}
                    helperText={errors.businessNumber}
                    placeholder='123-45-67890'
                    slotProps={{
                        htmlInput: {
                            inputMode: 'numeric',
                            maxLength: 12,
                        },
                    }}
                    required
                />
                <TextField
                    label='대표자명'
                    value={form.representativeName}
                    onChange={handleChange('representativeName')}
                    error={!!errors.representativeName}
                    helperText={errors.representativeName}
                    required
                />
                <TextField
                    label='업종'
                    value={form.businessType}
                    onChange={handleChange('businessType')}
                    error={!!errors.businessType}
                    helperText={errors.businessType}
                    required
                />
                <TextField
                    label='대표전화'
                    value={form.contactPhoneNumber}
                    onChange={handleChange('contactPhoneNumber')}
                    error={!!errors.contactPhoneNumber}
                    helperText={errors.contactPhoneNumber}
                    required
                />
                <AddressInput
                    label=''
                    addressLabel='사업장주소'
                    value={form.storeAddress}
                    onChange={handleStoreAddressChange}
                    error={!!errors.storeAddress}
                    helperText={errors.storeAddress}
                    required
                />

                <AppButton type='submit' disabled={isSubmitDisabled}>
                    {loading ? '매장등록 중...' : '매장등록'}
                </AppButton>
            </Stack>
        </AuthForm>
    )
}
