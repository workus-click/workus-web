import { Box, Button, Stack, TextField, Typography, Chip, Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
import { EmployeeCardList, type Employees } from '../../../widgets/salary/employeeCardList';
import CalculatorIcon from '../assets/calculator.svg';
import DeadlineIcon from '../assets/floppy-disk.svg';
import CloseIcon from '../assets/close.svg';


const MyTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 0,
        height: 30,
        wstoreUserIdth: 150,
    },
});


export function SalaryPage() {
    const employees: Employees[] = [
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

    return (
        <Box sx={{ mx: { md: -13 } }}>
            {/* 상단 */}
            <Stack spacing={{ xs: 1, sm: 2 }} direction='row' useFlexGap sx={{ flexWrap: 'wrap', mb: 3 }} >
                <Typography variant='h4'>급여입력</Typography>
                <Typography variant='subtitle1' sx={{ alignSelf: 'flex-end', color: '#6D6D6D' }}>
                    직원의 급여를 계산하고 급여명세서를 전송합니다.
                </Typography>

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
                        <Typography>귀속월</Typography>
                        <MyTextField type='month' size='small' sx={{ flex: 1 }} />
                    </Stack>

                    <Stack direction='row' spacing='10px' alignItems='center'>
                        <Typography>지급일</Typography>
                        <MyTextField type='date' size='small' sx={{ flex: 1 }} />
                    </Stack>

                    <Stack direction='row' spacing='10px' alignItems='center'>
                        <Typography>직원</Typography>
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
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: { xs: 'none', md: 'calc(100vh - 350px)' } }}>
                    {/* 헤더 */}
                    <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', minHeight: 48 }}>
                        <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>직원목록</Typography>
                        <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                            <Chip label='전체 선택' size='small' clickable />
                            <Chip label='알바생만' size='small' color='primary' clickable />
                            <Chip label='직원만' size='small' color='success' clickable />
                            <Chip label='선택 해제' size='small' variant='outlined' clickable />
                        </Stack>
                    </Stack>

                    {/* 직원 리스트 */}
                    <Box sx={{ border: '1px solid', borderColor: 'divider', flex: 1, overflow: 'auto', minHeight: 0 }}>
                        <EmployeeCardList items={employees} />
                    </Box>
                </Box>

                {/* 우측: 출퇴근내역 + 지급항목/공제항목 */}
                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }} >
                    <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', minHeight: 48 }}>
                        <Typography variant='h6' sx={{ whiteSpace: 'nowrap' }}>출퇴근내역</Typography>
                        <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                            <Button
                                variant='contained'
                                color='secondary'
                                sx={{ minWidth: 110, whiteSpace: 'nowrap', justifyContent: 'space-between', px: 2 }}
                            >
                                <img src={CalculatorIcon} style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} alt="" />
                                급여계산
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                sx={{ minWidth: 110, whiteSpace: 'nowrap', justifyContent: 'space-between', px: 2 }}
                            >
                                <img src={DeadlineIcon} style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} alt="" />
                                마감
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                sx={{ minWidth: 110, whiteSpace: 'nowrap', justifyContent: 'space-between', px: 2 }}
                            >
                                <img src={CloseIcon} style={{ width: 18, height: 18 }} alt="" />
                                마감취소
                            </Button>
                        </Stack>
                    </Stack>

                    {/* 캘린더 영역 */}
                    <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2, minHeight: 500 }}>
                        <Typography color="text.secondary">캘린더 영역</Typography>
                    </Box>

                    {/* 지급항목 / 공제항목 */}
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            {/* 지급항목 */}
                            <Box sx={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* 헤더 */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Typography variant='h6' fontWeight='bold'>지급항목</Typography>
                                </Box>
                                <Divider sx={{ width: '95%', mx: 'auto', borderColor: '#94A3B8' }} />

                                {/* 항목 리스트 */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Stack spacing={2}>
                                        {/* 기본급 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>기본급</Typography>
                                                <Typography fontWeight='bold'>1,520,000 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                12,000 × 126.66
                                            </Typography>
                                        </Stack>

                                        {/* 연장근무수당 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>연장근무수당</Typography>
                                                <Typography fontWeight='bold'>180,000 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                12,000 × 10 × 1.5
                                            </Typography>
                                        </Stack>

                                        {/* 주휴수당 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>주휴수당</Typography>
                                                <Typography fontWeight='bold'>72,000 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                12,000 × 6
                                            </Typography>
                                        </Stack>

                                        {/* 휴일근무수당 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>휴일근무수당</Typography>
                                                <Typography fontWeight='bold'>72,000 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                12,000 × 6
                                            </Typography>
                                        </Stack>

                                        {/* 야간근무수당 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>야간근무수당</Typography>
                                                <Typography fontWeight='bold'>72,000 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                12,000 × 6
                                            </Typography>
                                        </Stack>

                                        {/* 기타수당 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Stack direction='row' spacing={1} alignItems='center'>
                                                    <Typography fontWeight='medium'>기타수당</Typography>
                                                </Stack>
                                                <Typography fontWeight='bold'>72,000 원</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Divider sx={{ width: '95%', mx: 'auto', borderColor: '#94A3B8' }} />
                                {/* 지급총액 (하단 고정) */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='h6' fontWeight='bold'>지급총액</Typography>
                                        <Typography variant='h6' fontWeight='bold' color='#3B82F6'>
                                            1,722,000 원
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>

                            {/* 공제항목 */}
                            <Box sx={{
                                flex: 1,
                                border: '1px solid #e0e0e0',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* 헤더 */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Typography variant='h6' fontWeight='bold'>공제항목</Typography>
                                </Box>
                                <Divider sx={{ width: '95%', mx: 'auto', borderColor: '#94A3B8' }} />

                                {/* 항목 리스트 */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Stack spacing={2}>
                                        {/* 소득세 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>소득세</Typography>
                                                <Typography fontWeight='bold'>14,500 원</Typography>
                                            </Stack>
                                        </Stack>

                                        {/* 지방소득세 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>지방소득세</Typography>
                                                <Typography fontWeight='bold'>1,450 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                14,500 × 10%
                                            </Typography>
                                        </Stack>

                                        {/* 국민연금 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>국민연금</Typography>
                                                <Typography fontWeight='bold'>77,490 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                1,722,000 × 4.5%
                                            </Typography>
                                        </Stack>

                                        {/* 건강보험 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>건강보험</Typography>
                                                <Typography fontWeight='bold'>61,040 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                1,722,000 × 3.545%
                                            </Typography>
                                        </Stack>

                                        {/* 장기요양보험 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>장기요양보험</Typography>
                                                <Typography fontWeight='bold'>7,900 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                1,722,000 × 0.4591%
                                            </Typography>
                                        </Stack>

                                        {/* 고용보험 */}
                                        <Stack>
                                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                <Typography fontWeight='medium'>고용보험</Typography>
                                                <Typography fontWeight='bold'>15,490 원</Typography>
                                            </Stack>
                                            <Typography variant='caption' color='text.secondary'>
                                                1,722,000원×0.9%
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Divider sx={{ width: '95%', mx: 'auto', borderColor: '#94A3B8' }} />
                                {/* 공제총액 (하단 고정) */}
                                <Box sx={{ p: 2, px: 3 }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='h6' fontWeight='bold'>공제총액</Typography>
                                        <Typography variant='h6' fontWeight='bold' color='#FF1717'>
                                            177,890 원
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>

                        {/* 차인지급액 */}
                        <Box sx={{ bgcolor: '#C0C2F64D', border: '1px solid #e0e0e0', p: 3, }}>
                            <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>지급총액</Typography>
                                    <Typography variant='h5' fontWeight='bold' color='#3B82F6'>
                                        1,722,000
                                    </Typography>
                                </Stack>
                                <Typography variant='h4' color='text.secondary'>-</Typography>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>공제총액</Typography>
                                    <Typography variant='h5' fontWeight='bold' color='#FF1717'>
                                        177,890
                                    </Typography>
                                </Stack>
                                <Typography variant='h4' color='text.secondary'>=</Typography>
                                <Stack alignItems='center'>
                                    <Typography variant='caption' color='text.secondary'>차인지급액</Typography>
                                    <Typography variant='h5' fontWeight='bold'>
                                        1,544,110
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box >
    )
}
