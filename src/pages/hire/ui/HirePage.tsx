import { Box, Button, Divider, Stack, styled, TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, Avatar, Chip } from '@mui/material'
import { RegisterDialog } from '../../../widgets/hire/registerDialog';
import { InviteDialog } from '../../../widgets/hire/inviteDialog';
import { useState } from 'react';

const MyTextField = styled(TextField)<{ customHeight?: number, useBorderRadius?: boolean }>(({ customHeight, useBorderRadius }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: useBorderRadius ? 4 : 0,
        height: customHeight,
    },
}));

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

interface Employee {
    id: number;
    name: string;
    position: string;
    phone: string;
    salary: string;
    workDays: string;
    startDate: string;
    endDate: string;
    status: '근무중' | '퇴사';
    avatar?: string;
}


export function HirePage() {
    const employees: Employee[] = [
        {
            id: 1,
            name: '김훈이',
            position: '홀알바',
            phone: '010-5818-9196',
            salary: '(시급) 10,500원',
            workDays: '토,일',
            startDate: '2024.01.01',
            endDate: '현재',
            status: '근무중',
        },
        {
            id: 2,
            name: '김지원',
            position: '매장직원',
            phone: '010-5818-9196',
            salary: '(월급) 10,500원',
            workDays: '평일',
            startDate: '2024.01.01',
            endDate: '2025.09.12',
            status: '퇴사',
        },
    ];

    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

    const handleRegisterDialogOpen = () => {
        setRegisterDialogOpen(true);
    };

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

    const handleInviteDialogOpen = () => {
        setInviteDialogOpen(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 300px)' }}>
            {/* 상단 */}
            <Stack spacing={{ xs: 1, sm: 2 }} direction='row' justifyContent='space-between' useFlexGap sx={{ flexWrap: 'wrap', mb: 3 }} >
                <Stack spacing={3} direction='row'>
                    <Typography variant='h4'>직원등록</Typography>
                    <Typography variant='subtitle1' sx={{ alignSelf: 'flex-end', color: '#6D6D6D' }}>
                        직원을 등록하고 근무일자 및 계약서를 관리하세요.
                    </Typography>
                </Stack>
            </Stack>

            {/* 하단 */}
            <Stack direction='row' spacing={2} sx={{ flex: 1 }}>
                {/* 좌측 영역 */}
                <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction='row' sx={{ gap: 2, alignItems: 'flex-end' }} >
                        <MyTextField customHeight={40} variant="outlined" placeholder="사원명을 검색하세요." sx={{ flex: 1 }} />
                        <Button variant='contained' color='secondary' sx={{ height: 40 }}>
                            검색
                        </Button>
                    </Stack>

                    <Box sx={{ flex: 1, mt: 2, border: '1px solid', borderColor: 'divider', overflow: 'auto', borderRadius: 1 }}>
                        <Table size="small" aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledHeaderCell>이름</StyledHeaderCell>
                                    <StyledHeaderCell>직책</StyledHeaderCell>
                                    <StyledHeaderCell>연락처</StyledHeaderCell>
                                    <StyledHeaderCell sx={{ width: 180 }}>급여</StyledHeaderCell>
                                    <StyledHeaderCell>근무요일</StyledHeaderCell>
                                    <StyledHeaderCell>근무기간</StyledHeaderCell>
                                    <StyledHeaderCell>재직상태</StyledHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id} hover sx={{ cursor: 'pointer' }}>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                                                <Avatar sx={{ width: 30, height: 30 }}>{employee.name[0]}</Avatar>
                                                {employee.name}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{employee.position}</StyledTableCell>
                                        <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{employee.phone}</StyledTableCell>
                                        <StyledTableCell sx={{ width: 180 }}>
                                            <Box sx={{ whiteSpace: 'nowrap' }}>
                                                {employee.salary.split(' ')[0]} <br />
                                                {employee.salary.split(' ')[1]}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>{employee.workDays}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box>
                                                {employee.startDate} <br />
                                                ~ <br />
                                                {employee.endDate}
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Chip
                                                label={employee.status}
                                                color={employee.status === '근무중' ? 'warning' : 'error'}
                                                size="small"
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box >
                </Box >

                <Divider orientation="vertical" flexItem />

                {/* 우측 영역 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction='row' sx={{ gap: 1, alignItems: 'flex-end' }} >
                        <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center' }}>
                            <Box component="span" sx={{ color: '#6366F1' }}>이름 </Box> 인사정보
                        </Typography>
                        <Button variant='contained' color='secondary' sx={{ height: 40 }} onClick={handleRegisterDialogOpen}>
                            직원등록
                        </Button>
                        <Button variant='contained' color='secondary' sx={{ height: 40 }} onClick={handleInviteDialogOpen}>
                            직원초대
                        </Button>
                    </Stack>

                    <Box sx={{ flex: 1, mt: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden', borderRadius: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ bgcolor: 'black', p: 2 }} />
                        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
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
                        </Box>
                    </Box>
                </Box >
            </Stack >

            {/* 직원등록 다이얼로그 */}
            <RegisterDialog
                isOpen={registerDialogOpen}
                onClose={() => setRegisterDialogOpen(false)}
            />

            {/* 직원초대 다이얼로그 */}
            <InviteDialog
                isOpen={inviteDialogOpen}
                onClose={() => setInviteDialogOpen(false)}
            />
        </Box >
    )
}
