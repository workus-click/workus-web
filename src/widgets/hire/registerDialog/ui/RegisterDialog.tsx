import { Alert, AlertTitle, Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, styled, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

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

    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleClose = () => {
        onClose();
    };

    const [selectedMethod, setSelectedMethod] = useState<'kakao' | 'direct' | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            slotProps={{
                paper: {
                    sx: { width: '600px', maxWidth: '90vw' }
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
            <DialogContent dividers sx={{ px: 3, py: 4 }}>
                {step == 1 && (
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
                        <Stack direction='row' spacing={0.5} justifyContent={'center'} sx={{ pt: 3 }}>
                            <Button variant='contained' color='secondary' onClick={handleClose}>
                                취소
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleNext}>
                                다음
                            </Button>
                        </Stack>
                    </Box>
                )}
                {step == 2 && (
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <Alert
                            severity="success"
                            sx={{
                                bgcolor: '#dfecfb',
                                color: '#333',
                                p: 2,
                                mb: 2,
                                borderRadius: 0.3,
                                '& .MuiAlert-icon': {
                                    color: '#6366F1',
                                    fontSize: 20
                                }
                            }}
                        >
                            <AlertTitle sx={{ color: '#6366F1', fontSize: 15, fontWeight: 600 }}>
                                직원 등록 완료
                            </AlertTitle>
                            김훈이님에게 초대 링크를 보내주세요. <br />
                            초대 승인 시 임직원은 본인의 근무 스케줄 및 급여명세서를 조회할 수 있습니다.
                        </Alert>

                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0.5, p: 2 }}>
                            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                                <Typography sx={{ fontSize: 15, }}>이름</Typography>
                                <Typography sx={{ fontSize: 15, }}>김훈이</Typography>
                            </Stack>
                            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                                <Typography sx={{ fontSize: 15, }}>연락처</Typography>
                                <Typography sx={{ fontSize: 15, }}>010-5818-9196</Typography>
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
                                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}> 카카오톡으로 초대 링크 </Typography>
                                    <Typography sx={{ fontSize: 12, color: '#ADADAD' }}> 초대 링크를 카카오톡 전송 </Typography>
                                </Stack>
                            </Box>
                            <Box
                                onClick={() => setSelectedMethod('direct')}
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
                                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}> 초대링크 직접 전달 </Typography>
                                </Stack>
                            </Box>
                            {selectedMethod === 'direct' && (
                                <Stack direction='row' sx={{ gap: 2, alignItems: 'flex-end' }} >
                                    <TextField
                                        variant="outlined"
                                        sx={{
                                            flex: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 0,
                                                height: 30
                                            },
                                            '& input': {
                                                fontSize: 13,
                                            }
                                        }}
                                    />
                                    <Button
                                        variant={isCopied ? 'contained' : 'outlined'}
                                        color={isCopied ? 'primary' : 'secondary'}
                                        onClick={handleCopy}
                                        size='small'
                                        startIcon={isCopied ? <CheckIcon /> : <ContentCopyIcon />}
                                        sx={{
                                            borderRadius: 0.5,
                                            height: 30,
                                            width: 80,
                                            bgcolor: isCopied ? '#6366F1' : 'transparent',
                                            '&:hover': {
                                                bgcolor: isCopied ? '#5558E3' : 'action.hover'
                                            }
                                        }}
                                    >
                                        {isCopied ? '복사됨' : '복사'}
                                    </Button>
                                </Stack>
                            )}
                        </Box>

                        <Stack direction='row' spacing={0.5} justifyContent={'center'} sx={{ pt: 3 }}>
                            <Button variant='contained' color='secondary' onClick={onClose}>
                                확인
                            </Button>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
        </Dialog >
    );
}