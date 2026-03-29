import { useCallback, useMemo, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import { KakaoPostcodeEmbed } from 'react-daum-postcode'
import type { Address } from 'react-daum-postcode'

export type AddressValue = {
    zoneCode: string
    address: string
    detailAddress: string
    fullAddress: string
}

type AddressInputProps = {
    label?: string
    value: AddressValue
    onChange: (nextValue: AddressValue) => void
    required?: boolean
    disabled?: boolean
    error?: boolean
    helperText?: string
    zoneCodeLabel?: string
    addressLabel?: string
    detailAddressLabel?: string
}

const emptyAddress: AddressValue = {
    zoneCode: '',
    address: '',
    detailAddress: '',
    fullAddress: '',
}

const formatExtraAddress = (data: Address) => {
    if (data.addressType !== 'R') {
        return ''
    }

    const extraParts: string[] = []

    if (data.bname) {
        extraParts.push(data.bname)
    }

    if (data.buildingName) {
        extraParts.push(data.buildingName)
    }

    return extraParts.length > 0 ? ` (${extraParts.join(', ')})` : ''
}

const composeFullAddress = (zoneCode: string, address: string, detailAddress: string) => {
    const withAddress = detailAddress ? `${address} ${detailAddress}` : address
    return zoneCode ? `${zoneCode} ${withAddress}`.trim() : withAddress
}

export function AddressInput({
    label = '주소',
    value,
    onChange,
    required,
    disabled,
    error,
    helperText,
    zoneCodeLabel = '우편번호',
    addressLabel,
    detailAddressLabel = '상세주소',
}: AddressInputProps) {
    const [isAddressLayerOpen, setIsAddressLayerOpen] = useState(false)

    const safeValue = useMemo(() => ({
        ...emptyAddress,
        ...value,
    }), [value])

    const handleAddressSelect = useCallback((data: Address) => {
        const fullAddress = `${data.address}${formatExtraAddress(data)}`
        const nextValue = {
            ...safeValue,
            zoneCode: data.zonecode,
            address: fullAddress,
            fullAddress: composeFullAddress(data.zonecode, fullAddress, safeValue.detailAddress),
        }

        onChange(nextValue)
        setIsAddressLayerOpen(false)
    }, [onChange, safeValue])

    const handleOpenPostcode = () => {
        setIsAddressLayerOpen(true)
    }

    const handleClosePostcode = () => {
        setIsAddressLayerOpen(false)
    }

    const handleDetailAddressChange = (nextDetailAddress: string) => {
        onChange({
            ...safeValue,
            detailAddress: nextDetailAddress,
            fullAddress: composeFullAddress(safeValue.zoneCode, safeValue.address, nextDetailAddress),
        })
    }

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems={{ xs: 'stretch', sm: 'flex-start' }}
        >
            {label ? (
                <Box
                    sx={{
                        width: { xs: '100%', sm: 72 },
                        minHeight: 56,
                        display: 'flex',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        pt: { xs: 0, sm: 0.75 },
                    }}
                >
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                        {label}
                    </Typography>
                </Box>
            ) : null}
            <Stack spacing={1} sx={{ flex: 1, width: '100%' }}>
                <Stack direction='row' spacing={1} alignItems='flex-start'>
                    <TextField
                        value={safeValue.zoneCode}
                        placeholder={zoneCodeLabel}
                        InputProps={{
                            readOnly: true,
                        }}
                        required={required}
                        disabled={disabled}
                        sx={{ width: 100, flexShrink: 0 }}
                    />
                    <TextField
                        fullWidth
                        value={safeValue.address}
                        placeholder={addressLabel ?? label}
                        InputProps={{
                            readOnly: true,
                        }}
                        required={required}
                        disabled={disabled}
                        error={error}
                    />
                    <Button
                        variant='contained'
                        onClick={handleOpenPostcode}
                        disabled={disabled}
                        sx={{
                            minWidth: 96,
                            height: 56,
                            flexShrink: 0,
                            borderRadius: 1,
                            boxShadow: 'none',
                            backgroundColor: '#111827',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: '#111827',
                            },
                        }}
                    >
                        주소검색
                    </Button>
                </Stack>
                <TextField
                    fullWidth
                    value={safeValue.detailAddress}
                    onChange={(event) => handleDetailAddressChange(event.target.value)}
                    placeholder={`${detailAddressLabel}를 입력해주세요.`}
                    error={error}
                    helperText={helperText}
                    disabled={disabled}
                    slotProps={{
                        htmlInput: {
                            maxLength: 100,
                        },
                    }}
                />
            </Stack>
            <Dialog
                open={isAddressLayerOpen}
                onClose={handleClosePostcode}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>주소 검색</DialogTitle>
                <DialogContent dividers>
                    <KakaoPostcodeEmbed
                        onComplete={handleAddressSelect}
                        onClose={handleClosePostcode}
                        style={{ width: '100%', height: 400 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={handleClosePostcode}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}
