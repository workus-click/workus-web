import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, styled, TextField, Typography } from '@mui/material';

export interface SalaryFormulaSettingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const CaptionText = styled(Typography)({
    fontSize: '14px',
});

const BorderBox = styled(Box)({
    padding: '10px 15px',
    border: '1.5px solid #b2b2b2',
    borderRadius: '12px'
});

const StyledAutocompleteField = styled(TextField)({
    '& .MuiInputBase-input': {
        textAlign: 'center',
        fontSize: '14px',
        padding: '4px 8px'
    },
    '& .MuiInputBase-root': {
        height: '32px'
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '6px'
    }
});

const testData = [{
    label: '1.5배(법정가산율)',
    value: '1.5'
}, {
    label: '2.0배(법정가산율)',
    value: '2'
}];

export function SalaryFormulaSettingDialog({ isOpen, onClose }: SalaryFormulaSettingDialogProps) {
    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            slotProps={{
                paper: {
                    sx: { width: '500px', maxWidth: '90vw' }
                }
            }}
        >
            <DialogTitle
                id="customized-dialog-title"
                sx={{
                    m: 0,
                    p: 2,
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '22px',
                }}
            >
                계산식설정
            </DialogTitle>
            <IconButton
                aria-label="close"
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
            <DialogContent dividers sx={{ px: 7, py: 3 }}>
                <CaptionText align='center' fontWeight={'bold'}> 💡 근무수당별 가산율을 설정하여 급여를 자동계산하세요. </CaptionText>

                <Box sx={{ pt: 1.5 }}>
                    <Typography fontWeight='bold' sx={{ paddingBottom: 1 }}>기본급</Typography>
                    <BorderBox>
                        <Stack direction='row' justifyContent='space-between' sx={{ pb: 1 }}>
                            <CaptionText>직원</CaptionText>
                            <CaptionText>월급</CaptionText>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <CaptionText>알바</CaptionText>
                            <CaptionText>시간단가 x 정상근무시간</CaptionText>
                        </Stack>
                    </BorderBox>
                </Box>

                <Box sx={{ pt: 1.5 }}>
                    <Typography fontWeight='bold' sx={{ paddingBottom: 1 }}>야간근무수당</Typography>
                    <BorderBox>
                        <Stack direction='row' spacing={2} alignItems='center' sx={{ pb: 1.5 }}>
                            <CaptionText>가산율</CaptionText>
                            <Autocomplete
                                disablePortal
                                size="small"
                                options={testData}
                                getOptionLabel={(option) => option.label}
                                defaultValue={testData[0]}
                                sx={{ flex: 1 }}
                                renderInput={(params) => <StyledAutocompleteField {...params} />}
                            />
                        </Stack>
                        <Box sx={{ p: 0.7, bgcolor: '#EAEDF0', borderRadius: 1 }}>
                            <CaptionText align='center'>시간단가 x 야간근무시간 x 1.5</CaptionText>
                        </Box>
                    </BorderBox>
                </Box>

                <Box sx={{ pt: 1.5 }}>
                    <Typography fontWeight='bold' sx={{ paddingBottom: 1 }}>주휴수당</Typography>
                    <BorderBox>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ pb: 1 }}>
                            <CaptionText>알바</CaptionText>
                            <CaptionText>15시간</CaptionText>
                            <CaptionText>이상</CaptionText>
                        </Stack>
                        <Box sx={{ p: 0.7, bgcolor: '#EAEDF0', borderRadius: 1 }}>
                            <CaptionText align='center'>시간단가 x 야간근무시간 x 1.5</CaptionText>
                        </Box>
                    </BorderBox>
                </Box>

                <Box sx={{ pt: 1.5 }}>
                    <Typography fontWeight='bold' sx={{ paddingBottom: 1 }}>연장근무수당</Typography>
                    <BorderBox>
                        <Stack direction='row' spacing={2} alignItems='center' sx={{ pb: 1.5 }}>
                            <CaptionText>가산율</CaptionText>
                            <Autocomplete
                                disablePortal
                                size="small"
                                options={testData}
                                getOptionLabel={(option) => option.label}
                                defaultValue={testData[0]}
                                sx={{ flex: 1 }}
                                renderInput={(params) => <StyledAutocompleteField {...params} />}
                            />
                        </Stack>
                        <Box sx={{ p: 0.7, bgcolor: '#EAEDF0', borderRadius: 1 }}>
                            <CaptionText align='center'>시간단가 x 야간근무시간 x 1.5</CaptionText>
                        </Box>
                    </BorderBox>
                </Box>

                <Box sx={{ pt: 1.5 }}>
                    <Typography fontWeight='bold' sx={{ paddingBottom: 1 }}>휴일근무수당</Typography>
                    <BorderBox>
                        <Stack direction='row' spacing={2} alignItems='center' sx={{ pb: 1.5 }}>
                            <CaptionText>가산율</CaptionText>
                            <Autocomplete
                                disablePortal
                                size="small"
                                options={testData}
                                getOptionLabel={(option) => option.label}
                                defaultValue={testData[1]}
                                sx={{ flex: 1 }}
                                renderInput={(params) => <StyledAutocompleteField {...params} />}
                            />
                        </Stack>
                        <Box sx={{ p: 0.7, bgcolor: '#EAEDF0', borderRadius: 1 }}>
                            <CaptionText align='center'>시간단가 x 야간근무시간 x 1.5</CaptionText>
                        </Box>
                    </BorderBox>
                </Box>

                <Stack direction='row' spacing={0.5} justifyContent={'center'} sx={{ pt: 2 }}>
                    <Button variant='contained' color='secondary' >
                        취소
                    </Button>
                    <Button variant='contained' color='secondary'>
                        저장
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog >
    );
}
