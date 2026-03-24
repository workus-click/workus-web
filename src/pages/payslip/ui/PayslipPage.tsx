import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'

const mockPayslip = {
    year: 2025,
    month: 11,
    employeeName: '유지현',
    payDate: '2025년 12월 10일',
    payPeriod: '2025-11-01 ~ 2025-11-31',
    payType: '시급 / 15,000원',
    payments: [
        { name: '기본급', amount: 4_500_000 },
        { name: '연장근무수당', amount: 100_000 },
        { name: '야간근무수당', amount: 50_000 },
        { name: '휴일근무수당', amount: 30_000 },
        { name: '주휴수당', amount: 120_000 },
        { name: '기타수당', amount: 0 },
    ],
    deductions: [
        { name: '소득세', amount: 14_155 },
        { name: '지방소득세', amount: 41_200 },
        { name: '국민연금', amount: 370_100 },
        { name: '건강보험', amount: 37_010 },
        { name: '장기요양보험', amount: 218_700 },
        { name: '고용보험', amount: 166_345 },
    ],
    formulas: [
        { name: '연장근무수당', formula: '시간단가 × 1.5 × 연장근무시간' },
        { name: '야간근무수당', formula: '시간단가 × 0.5 × 야간근무시간' },
        { name: '휴일근무수당', formula: '시간단가 × 1.5 × 휴일근무시간' },
        { name: '주휴수당', formula: '1주 소정근로시간 × 시간단가' },
    ],
    companyName: '(주) 현대모비스',
}

function formatAmount(amount: number) {
    return amount.toLocaleString('ko-KR')
}

export function PayslipPage() {
    const data = mockPayslip
    const totalPayment = data.payments.reduce((sum, p) => sum + p.amount, 0)
    const totalDeduction = data.deductions.reduce((sum, d) => sum + d.amount, 0)
    const netPay = totalPayment - totalDeduction

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Paper sx={{ p: { xs: 3, md: 5 } }}>
                    {/* 제목 */}
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{ mb: 3 }}
                    >
                        {data.year}년 {data.month}월 급여명세서
                    </Typography>

                    {/* 기본 정보 테이블 */}
                    <TableContainer sx={{ mb: 3 }}>
                        <Table size="small" sx={{ border: '1px solid #ddd' }}>
                            <TableBody>
                                <TableRow>
                                    <HeaderCell>지급일자</HeaderCell>
                                    <ValueCell>{data.payDate}</ValueCell>
                                    <HeaderCell>사원명</HeaderCell>
                                    <ValueCell>{data.employeeName}</ValueCell>
                                </TableRow>
                                <TableRow>
                                    <HeaderCell>급여기간</HeaderCell>
                                    <ValueCell>{data.payPeriod}</ValueCell>
                                    <HeaderCell>급여형태 / 시간단가</HeaderCell>
                                    <ValueCell>{data.payType}</ValueCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* 지급내역 / 공제내역 */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        sx={{ mb: 3 }}
                    >
                        {/* 지급내역 */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                textAlign="center"
                                sx={{ mb: 1 }}
                            >
                                지급내역
                            </Typography>
                            <Divider sx={{ borderColor: '#222', borderWidth: 1 }} />
                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                {data.payments.map((item) => (
                                    <Stack
                                        key={item.name}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatAmount(item.amount)}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>

                        {/* 공제내역 */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                textAlign="center"
                                sx={{ mb: 1 }}
                            >
                                공제내역
                            </Typography>
                            <Divider sx={{ borderColor: '#222', borderWidth: 1 }} />
                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                {data.deductions.map((item) => (
                                    <Stack
                                        key={item.name}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatAmount(item.amount)}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    {/* 합계 */}
                    <Divider sx={{ borderColor: '#222', borderWidth: 1, mb: 2 }} />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                    >
                        <Typography fontWeight="bold">지급합계</Typography>
                        <Typography fontWeight="bold">
                            {formatAmount(totalPayment)}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 2 }}
                    >
                        <Typography fontWeight="bold">공제합계</Typography>
                        <Typography fontWeight="bold" textAlign="right">
                            {formatAmount(totalDeduction)}
                        </Typography>
                    </Stack>

                    {/* 실지급액 */}
                    <Box
                        sx={{
                            bgcolor: '#f9f9f9',
                            border: '2px solid #222',
                            p: 2,
                            mb: 4,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6" fontWeight="bold">
                                실지급액
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                {formatAmount(netPay)}
                            </Typography>
                        </Stack>
                    </Box>

                    {/* 계산 방법 */}
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{ mb: 2 }}
                    >
                        계산 방법
                    </Typography>
                    <TableContainer sx={{ mb: 4 }}>
                        <Table size="small" sx={{ border: '1px solid #ddd' }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#222' }}>
                                    <TableCell
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            width: '25%',
                                        }}
                                    >
                                        지급항목명
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        산출식 또는 산출방법
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            width: '20%',
                                        }}
                                    >
                                        금액
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.formulas.map((f) => {
                                    const matched = data.payments.find(
                                        (p) => p.name === f.name
                                    )
                                    return (
                                        <TableRow key={f.name}>
                                            <TableCell
                                                sx={{
                                                    textAlign: 'center',
                                                    borderRight:
                                                        '1px solid #ddd',
                                                }}
                                            >
                                                {f.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    textAlign: 'center',
                                                    borderRight:
                                                        '1px solid #ddd',
                                                }}
                                            >
                                                {f.formula}
                                            </TableCell>
                                            <TableCell
                                                sx={{ textAlign: 'right' }}
                                            >
                                                {matched
                                                    ? formatAmount(
                                                          matched.amount
                                                      )
                                                    : ''}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* 하단 인사말 + 회사명 */}
                    <Divider sx={{ mb: 3 }} />
                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{ mb: 1 }}
                    >
                        귀하의 노고에 감사드립니다.
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {data.companyName}
                    </Typography>
                </Paper>
            </Container>
        </Box>
    )
}

function HeaderCell({ children }: { children: React.ReactNode }) {
    return (
        <TableCell
            sx={{
                bgcolor: '#f0f0f0',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                width: '18%',
                borderRight: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
            }}
        >
            {children}
        </TableCell>
    )
}

function ValueCell({ children }: { children: React.ReactNode }) {
    return (
        <TableCell
            sx={{
                fontSize: '0.85rem',
                width: '32%',
                borderRight: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
            }}
        >
            {children}
        </TableCell>
    )
}
