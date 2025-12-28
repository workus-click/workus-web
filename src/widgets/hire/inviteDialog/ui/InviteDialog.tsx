import styled from '@emotion/styled';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Alert, AlertTitle, Avatar, TextField, Table, TableHead, TableRow, TableBody, TableCell, Chip, Checkbox } from '@mui/material';

interface Employee {
    id: number;
    name: string;
    position: string;
    phone: string;
}

export interface InviteDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const StyledHeaderCell = styled(TableCell)({
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 4,
    paddingBottom: 4,
    whiteSpace: 'nowrap',  // 헤더 텍스트 줄바꿈 방지
    textAlign: 'center',
});

const StyledTableCell = styled(TableCell)({
    textAlign: 'center',
});

export function InviteDialog({ isOpen, onClose }: InviteDialogProps) {
    const employees: Employee[] = [
        {
            id: 1,
            name: '김훈이',
            position: '홀알바',
            phone: '010-5818-9196',
        },
        {
            id: 2,
            name: '김지원',
            position: '매장직원',
            phone: '010-5818-9196',
        },
    ];

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
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
                직원초대
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
                    <Alert
                        severity="info"
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
                            초대할 직원을 선택해주세요
                        </AlertTitle>
                        아직 초대를 받지 않은 직원에게 링크를 발송합니다. <br />
                        초대를 승인하면 근무스케줄 및 급여명세서를 조회할 수 있습니다.
                    </Alert>

                    <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1, mb: 1 }}>
                        <Avatar sx={{ height: 30, width: 30 }} />
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>초대 미발송 직원 목록</Typography>
                    </Stack>

                    <Stack direction='row' sx={{ gap: 2, alignItems: 'flex-end' }} >
                        <TextField
                            variant="outlined"
                            placeholder="사원명을 검색하세요."
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                    height: 30
                                },
                                '& input::placeholder': {
                                    fontSize: 13,
                                }
                            }}
                        />
                        <Button variant='contained' color='secondary' sx={{ height: 30 }}>
                            검색
                        </Button>
                    </Stack>

                    <Box sx={{ flex: 1, mt: 2, border: '1px solid', borderColor: 'divider', overflow: 'auto', borderRadius: 1 }}>
                        <Table size="small" aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledHeaderCell></StyledHeaderCell>
                                    <StyledHeaderCell>이름</StyledHeaderCell>
                                    <StyledHeaderCell>고용형태</StyledHeaderCell>
                                    <StyledHeaderCell>연락처</StyledHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell padding="checkbox"> <Checkbox size="small" /> </TableCell>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}> {employee.name} </StyledTableCell>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}> {employee.position} </StyledTableCell>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}> {employee.phone} </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box >

                    <Box sx={{ my: 2 }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>초대 방법을 선택해주세요</Typography>
                        <Box sx={{ px: 1, py: 1.5, my: 1, border: '1px solid', borderColor: 'divider', borderRadius: 0.5, alignItems: 'center', display: 'flex', }}>
                            <Checkbox size="small" />
                            <Stack >
                                <Typography sx={{ fontSize: 13, fontWeight: 500 }}> 카카오톡으로 초대 링크 </Typography>
                                <Typography sx={{ fontSize: 12, color: '#ADADAD' }}> 초대 링크를 카카오톡 전송 </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ px: 1, py: 1.5, my: 1, border: '1px solid', borderColor: 'divider', borderRadius: 0.5, alignItems: 'center', display: 'flex', }}>
                            <Checkbox size="small" />
                            <Stack >
                                <Typography sx={{ fontSize: 13, fontWeight: 500 }}> 초대링크 직접 전달 </Typography>
                                <Typography sx={{ fontSize: 12, color: '#ADADAD' }}> 초대 링크를 카카오톡 전송 </Typography>
                            </Stack>
                        </Box>
                    </Box>

                    <Stack direction='row' spacing={0.5} justifyContent={'center'} sx={{ pt: 2 }}>
                        <Button variant='contained' color='secondary' >
                            취소
                        </Button>
                        <Button variant='contained' color='secondary'>
                            확인
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog >
    );
}