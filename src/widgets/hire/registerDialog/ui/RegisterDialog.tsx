import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, styled, TextField, Typography } from '@mui/material';

export interface RegisterDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyTextField = styled(TextField)<{ customHeight?: number, useBorderRadius?: boolean }>(({ customHeight, useBorderRadius }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: useBorderRadius ? 4 : 0,
        height: customHeight,
    },
}));

export function RegisterDialog({ isOpen, onClose }: RegisterDialogProps) {
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
                직원등록
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
            <DialogContent dividers sx={{ px: 3, py: 3 }}>
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                        <Typography fontSize={17} fontWeight={600}>📋 인적사항</Typography>
                        <Stack direction='row' spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>이름 <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 100, textAlign: 'right' }}>주민등록번호 <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>연락처</Typography>
                                <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
                                <Typography fontSize={15} sx={{ minWidth: 100, textAlign: 'right' }}>고용형태 <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
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
                            <Box sx={{ height: 40, border: '1px solid', borderColor: 'divider', borderRadius: 0.5, flex: 1 }} />
                        </Box>
                    </Stack>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                        <Typography fontSize={17} fontWeight={600}>💰 급여정보</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>급여형태 <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
                            <MyTextField useBorderRadius customHeight={25} sx={{ flex: 1 }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontSize={15} sx={{ minWidth: 80, textAlign: 'right' }}>시간단가 <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
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
                    <Stack direction='row' spacing={0.5} justifyContent={'center'} sx={{ pt: 2 }}>
                        <Button variant='contained' color='secondary' >
                            취소
                        </Button>
                        <Button variant='contained' color='secondary'>
                            다음
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog >
    );
}