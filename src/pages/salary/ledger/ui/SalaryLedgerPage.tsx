import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { EmployeeCardList, type Employee } from '../../../../widgets/salary/employeeCardList';
import styled from '@emotion/styled';
import { useState } from 'react';
import { SalaryLedgerDocumentDialog } from '../../../../widgets/salary/salaryLedgerDocumentDialog';

export function SalaryLedgerPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'print' | 'pdf'>('print');

    const handleOpenPrint = () => {
        setDialogType('print');
        setDialogOpen(true);
    };

    const handleOpenPdf = () => {
        setDialogType('pdf');
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const employees: Employee[] = [
        { storeUserId: 1, empName: '김훈이', payInfo: '알바 / 시급: 12,000' },
        { storeUserId: 2, empName: '김지원', payInfo: '직원 / 월급: 3,000,000' },
        { storeUserId: 3, empName: '김영희', payInfo: '알바 / 시급: 12,000' },
        { storeUserId: 4, empName: '이수진', payInfo: '직원 / 월급: 2,500,000' },
        { storeUserId: 5, empName: '박준혁', payInfo: '알바 / 시급: 15,000' },
        { storeUserId: 6, empName: '정현우', payInfo: '직원 / 월급: 2,800,000' },
        { storeUserId: 7, empName: '이은희', payInfo: '알바 / 시급: 13,000' },
        { storeUserId: 8, empName: '김태호', payInfo: '직원 / 월급: 3,200,000' },
        { storeUserId: 9, empName: '박소영', payInfo: '알바 / 시급: 12,000' },
        { storeUserId: 10, empName: '최준호', payInfo: '직원 / 월급: 2,700,000' }
    ];

    const paymentItems = [
        { name: '기본급', amount: '1,520,000 원', formula: '12,000 × 126.66' },
        { name: '주휴수당', amount: '72,000 원', formula: '12,000 × 6' },
        { name: '연장근무수당', amount: '180,000 원', formula: '12,000 × 10 × 1.5' },
        { name: '야간근무수당', amount: '72,000 원', formula: '12,000 × 6' },
        { name: '기타수당', amount: '72,000 원' },
    ];

    const deductionItems = [
        { name: '소득세', amount: '14,500 원' },
        { name: '지방소득세', amount: '1,450 원', formula: '14,500 × 10%' },
        { name: '국민연금', amount: '77,490 원', formula: '1,722,000 × 4.5%' },
        { name: '건강보험', amount: '61,040 원', formula: '1,722,000 × 3.545%' },
        { name: '고용보험', amount: '15,490 원', formula: '1,722,000원 × 0.9%' },
    ];

    const MyTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            height: 30,
            width: 150,
        },
    });

    const Font14Typo = styled(Typography)({
        fontSize: 14,
    });

    return (
        <Box>
            {/* 상단 */}
            <Stack spacing={{ xs: 1, sm: 2 }} direction='row' justifyContent='space-between' useFlexGap sx={{ flexWrap: 'wrap', mb: 3 }} >
                <Stack spacing={3} direction='row'>
                    <Typography variant='h4'>임금대장</Typography>
                    <Typography variant='subtitle1' sx={{ alignSelf: 'flex-end', color: '#6D6D6D' }}>
                        지급된 급여내역을 바탕으로 급여내역을 관리합니다.
                    </Typography>
                </Stack>
                <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                    <Button variant='contained' color='secondary' onClick={handleOpenPrint}>
                        출력하기
                    </Button>
                    <Button variant='contained' color='secondary' onClick={handleOpenPdf}>
                        PDF다운로드
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{
                border: '2px solid',
                borderColor: '#b2b2b2',
                borderRadius: 0.3,
                p: 2,
                mb: 3,
            }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 2, md: '50px' }}
                    alignItems={{ xs: 'stretch', md: 'center' }}
                >
                    <Stack direction='row' spacing='10px' alignItems='center'>
                        <Typography>연도</Typography>
                        <MyTextField type='year' size='small' sx={{ flex: 1 }} />
                    </Stack>

                    <Stack direction='row' spacing='10px' alignItems='center'>
                        <Typography>월</Typography>
                        <MyTextField type='month' size='small' sx={{ flex: 1 }} />
                    </Stack>

                    <Stack direction='row' spacing='10px' alignItems='center'>
                        <Typography>직원선택</Typography>
                        <MyTextField size='small' sx={{ flex: 1 }} />
                    </Stack>

                    <Box sx={{ flexGrow: 1 }} />

                    <Button variant='contained' color='secondary' sx={{ width: { xs: '100%', md: 100 } }} >
                        검색
                    </Button>
                </Stack>
            </Box>

            {/* 하단 */}
            <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: 'column', md: 'row' }}>
                {/* 좌측: 직원 목록 */}
                <Box sx={{ flex: 1, maxHeight: { xs: 'none', md: 'calc(100vh - 350px)' } }}>
                    <EmployeeCardList items={employees} />
                </Box>
                {/* 우측: 급여 내역 */}
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }} >
                    <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }} >
                        <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', minHeight: 48 }}>

                        </Stack>
                        <TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
                            <Table sx={{ '& .MuiTableCell-root': { textAlign: 'center' } }}>
                                <TableHead >
                                    <TableRow sx={{ backgroundColor: '#000' }}>
                                        <TableCell sx={{ color: '#fff' }}>고용형태</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>고용시작일</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>주민등록번호</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>급여형태</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>월급여</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>시간단가</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>직원(상용직)</TableCell>
                                        <TableCell>2025.01.10</TableCell>
                                        <TableCell>990418-1111111</TableCell>
                                        <TableCell>월급</TableCell>
                                        <TableCell>3,000,000원</TableCell>
                                        <TableCell>14,000원</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer sx={{ borderRadius: 1, overflow: 'hidden', mt: 2 }}>
                            <Table sx={{ '& .MuiTableCell-root': { textAlign: 'center' } }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#000' }}>
                                        <TableCell sx={{ color: '#fff' }}>근무일수</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>총근무시간</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>정상근무시간</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>연장근무시간</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>야간근무시간</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>휴일근무시간</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>2025.12.01~2025.12.31 (25일)</TableCell>
                                        <TableCell>209시간</TableCell>
                                        <TableCell>190시간</TableCell>
                                        <TableCell>5시간</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>14시간</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* 지급항목 / 공제항목 */}
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            {/* 지급항목 */}
                            <Box sx={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}>
                                {/* 헤더 */}
                                <Box sx={{ p: 1.5, px: 2, bgcolor: '#F5F5F5' }}>
                                    <Typography fontWeight='bold'>지급항목</Typography>
                                </Box>

                                {/* 항목 리스트 */}
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={1.5}>
                                        {paymentItems.map((item, index) => (
                                            <Stack key={index} direction='row' justifyContent='space-between' alignItems='center'>
                                                <Stack>
                                                    <Font14Typo>{item.name}</Font14Typo>
                                                    {item.formula && <Font14Typo color='text.secondary'>{item.formula}</Font14Typo>}
                                                </Stack>
                                                <Font14Typo fontWeight='bold'>{item.amount}</Font14Typo>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* 지급총액 */}
                                <Box sx={{ p: 1.5, px: 2, borderTop: '1px solid #e0e0e0' }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography fontWeight='bold'>지급총액</Typography>
                                        <Typography fontWeight='bold'>1,722,000 원</Typography>
                                    </Stack>
                                </Box>
                            </Box>

                            {/* 공제항목 */}
                            <Box sx={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}>
                                {/* 헤더 */}
                                <Box sx={{ p: 1.5, px: 2, bgcolor: '#F5F5F5' }}>
                                    <Typography fontWeight='bold'>공제항목</Typography>
                                </Box>

                                {/* 항목 리스트 */}
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={1.5}>
                                        {deductionItems.map((item, index) => (
                                            <Stack key={index} direction='row' justifyContent='space-between' alignItems='center'>
                                                <Stack>
                                                    <Font14Typo>{item.name}</Font14Typo>
                                                    {item.formula && <Font14Typo color='text.secondary'>{item.formula}</Font14Typo>}
                                                </Stack>
                                                <Font14Typo fontWeight='bold'>{item.amount}</Font14Typo>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>

                                {/* 공제총액 */}
                                <Box sx={{ p: 1.5, px: 2, borderTop: '1px solid #e0e0e0' }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography fontWeight='bold'>공제총액</Typography>
                                        <Typography fontWeight='bold'>177,890 원</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                        {/* 차인지급액 */}
                        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
                            <Stack direction='row' spacing={3} alignItems='center' justifyContent='center'>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>지급총액</Typography>
                                    <Typography fontWeight='bold' fontSize={25}>
                                        1,722,000
                                    </Typography>
                                </Stack>
                                <Typography variant='h4' color='text.secondary'>-</Typography>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>공제총액</Typography>
                                    <Typography fontWeight='bold' fontSize={25}>
                                        177,890
                                    </Typography>
                                </Stack>
                                <Typography variant='h4' color='text.secondary'>=</Typography>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>차인지급액</Typography>
                                    <Typography fontWeight='bold' fontSize={25}>
                                        1,544,110
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
            <SalaryLedgerDocumentDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                type={dialogType}
            />
        </Box >
    )
}
