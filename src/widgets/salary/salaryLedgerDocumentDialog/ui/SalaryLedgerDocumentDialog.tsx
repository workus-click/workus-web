import { useRef } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface SalaryLedgerDocumentDialogProps {
    open: boolean;
    onClose: () => void;
    type: 'print' | 'pdf';
}

const StyledTableCell = styled(TableCell)({
    border: '1px solid #e0e0e0',
    textAlign: 'center',
    padding: '8px 4px',
    fontSize: '11px',
    whiteSpace: 'nowrap',
});

const StyledTableHeadCell = styled(StyledTableCell)({
    backgroundColor: '#1E293B',
    color: '#fff',
    fontWeight: 'bold',
});

const SummaryTableCell = styled(StyledTableCell)({
    color: '#0d6efd',
    backgroundColor: '#f8f9fa',
});

// --- Data Models based on DB Schema ---
// 13. 월별급여대상자 (monthly_salary_target), 11. 출퇴근결과 집계테이블 (attendance_monthly_result) 등 참조
export interface LedgerDataModel {
    store_user_id: number;
    user_name: string; // 성명
    job_type_code_id: string; // 고용형태
    pay_type_code_id: string; // 급여구분

    total_work_days: number;
    total_work_min: number;
    normal_work_days: number;
    total_normal_min: number;
    overtime_days: number;
    total_overtime_min: number;
    night_days: number; // custom for view
    total_night_min: number;
    holiday_days: number;
    total_holiday_min: number;

    base_pay_amount: number;
    weekly_holiday_allowance: number;
    overtime_allowance: number;
    night_allowance: number;
    total_payment_amount: number; // Total Payment_amount

    income_tax: number;
    local_tax: number;
    national_pension: number;
    health_insurance: number;
    total_deduction_amount: number;

    net_pay_amount: number;
}

const DUMMY_LEDGER_DATA: LedgerDataModel[] = [
    {
        store_user_id: 1,
        user_name: '김지원',
        job_type_code_id: '직원(상용\n직)',
        pay_type_code_id: '월급',
        total_work_days: 25,
        total_work_min: 209 * 60,
        normal_work_days: 22,
        total_normal_min: 190 * 60,
        overtime_days: 1,
        total_overtime_min: 5 * 60,
        night_days: 0,
        total_night_min: 0,
        holiday_days: 2,
        total_holiday_min: 14 * 60,
        base_pay_amount: 1520000,
        weekly_holiday_allowance: 72000,
        overtime_allowance: 180000,
        night_allowance: 72000,
        total_payment_amount: 1722000,
        income_tax: 14500,
        local_tax: 1450,
        national_pension: 77490,
        health_insurance: 76530,
        total_deduction_amount: 177890,
        net_pay_amount: 1544110,
    },
    {
        store_user_id: 2,
        user_name: '김훈이',
        job_type_code_id: '직원(상용\n직)',
        pay_type_code_id: '월급/시\n급',
        total_work_days: 22,
        total_work_min: 176 * 60,
        normal_work_days: 22,
        total_normal_min: 176 * 60,
        overtime_days: 0,
        total_overtime_min: 0,
        night_days: 0,
        total_night_min: 0,
        holiday_days: 0,
        total_holiday_min: 0,
        base_pay_amount: 2112000,
        weekly_holiday_allowance: 0,
        overtime_allowance: 0,
        night_allowance: 0,
        total_payment_amount: 2112000,
        income_tax: 18960,
        local_tax: 1896,
        national_pension: 95040,
        health_insurance: 93830,
        total_deduction_amount: 218646,
        net_pay_amount: 1893354,
    },
    {
        store_user_id: 3,
        user_name: '김훈이',
        job_type_code_id: '직원(상용\n직)',
        pay_type_code_id: '월급/시\n급',
        total_work_days: 6,
        total_work_min: 48 * 60,
        normal_work_days: 6,
        total_normal_min: 48 * 60,
        overtime_days: 0,
        total_overtime_min: 0,
        night_days: 0,
        total_night_min: 0,
        holiday_days: 0,
        total_holiday_min: 0,
        base_pay_amount: 576000,
        weekly_holiday_allowance: 0,
        overtime_allowance: 0,
        night_allowance: 0,
        total_payment_amount: 576000,
        income_tax: 5180,
        local_tax: 518,
        national_pension: 25920,
        health_insurance: 25588,
        total_deduction_amount: 59616,
        net_pay_amount: 516384,
    },
];

const renderMultilineText = (text: string) => {
    return text.split('\n').map((str, idx) => (
        <span key={idx}>
            {str}
            {idx < text.split('\n').length - 1 && <br />}
        </span>
    ));
};

const formatMinToHours = (mins: number) => {
    if (!mins) return '-';
    return (
        <>
            {Math.floor(mins / 60)}
            <br />
            시간
        </>
    );
};

const formatDays = (days: number) => {
    if (!days) return '-';
    return `${days}일`;
};

const formatMoney = (amount: number) => {
    if (!amount) return '-';
    return amount.toLocaleString();
};

export function SalaryLedgerDocumentDialog({
    open,
    onClose,
    type,
}: SalaryLedgerDocumentDialogProps) {
    // PDF 캡처 대상 영역 ref
    const contentRef = useRef<HTMLDivElement>(null);

    // html2canvas 캡처 > jsPDF로 PDF 생성
    const generatePdf = async () => {
        const element = contentRef.current;
        if (!element) return null;

        // DOM > Canvas 변환 (scale: 4 고해상도)
        const canvas = await html2canvas(element, {
            scale: 4,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        // Canvas > PNG 이미지 데이터 변환
        const imgData = canvas.toDataURL('image/png');

        // A4 가로 방향 PDF 생성
        const pdf = new jsPDF('landscape', 'mm', 'a4');

        // PDF 페이지 크기
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // 이미지가 PDF 페이지에 맞도록 비율 계산
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // 이미지를 PDF 중앙에 배치
        const x = (pdfWidth - imgWidth * ratio) / 2;
        const y = 0;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth * ratio, imgHeight * ratio);
        return pdf;
    };

    // 인쇄 핸들러 - PDF를 생성한 뒤 브라우저 인쇄 (PDF 다운로드와 동일한 출력물)
    const handlePrint = async () => {
        const pdf = await generatePdf();
        if (!pdf) return;

        // PDF를 blob URL로 변환 후 새 창에서 인쇄
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);

        const printWindow = window.open(url, '_blank');
        if (!printWindow) return;

        printWindow.onload = () => {
            printWindow.print();
            URL.revokeObjectURL(url);
        };
    };

    // PDF 다운로드 핸들러
    const handleDownloadPdf = async () => {
        const pdf = await generatePdf();
        if (!pdf) return;

        pdf.save('임금대장.pdf');
    };

    // 계산식
    const totals = DUMMY_LEDGER_DATA.reduce(
        (acc, curr) => ({
            total_work_days: acc.total_work_days + curr.total_work_days,
            total_work_min: acc.total_work_min + curr.total_work_min,
            normal_work_days: acc.normal_work_days + curr.normal_work_days,
            total_normal_min: acc.total_normal_min + curr.total_normal_min,
            overtime_days: acc.overtime_days + curr.overtime_days,
            total_overtime_min: acc.total_overtime_min + curr.total_overtime_min,
            night_days: acc.night_days + curr.night_days,
            total_night_min: acc.total_night_min + curr.total_night_min,
            holiday_days: acc.holiday_days + curr.holiday_days,
            total_holiday_min: acc.total_holiday_min + curr.total_holiday_min,
            base_pay_amount: acc.base_pay_amount + curr.base_pay_amount,
            weekly_holiday_allowance: acc.weekly_holiday_allowance + curr.weekly_holiday_allowance,
            overtime_allowance: acc.overtime_allowance + curr.overtime_allowance,
            night_allowance: acc.night_allowance + curr.night_allowance,
            total_payment_amount: acc.total_payment_amount + curr.total_payment_amount,
            income_tax: acc.income_tax + curr.income_tax,
            local_tax: acc.local_tax + curr.local_tax,
            national_pension: acc.national_pension + curr.national_pension,
            health_insurance: acc.health_insurance + curr.health_insurance,
            total_deduction_amount: acc.total_deduction_amount + curr.total_deduction_amount,
            net_pay_amount: acc.net_pay_amount + curr.net_pay_amount,
        }),
        {
            total_work_days: 0,
            total_work_min: 0,
            normal_work_days: 0,
            total_normal_min: 0,
            overtime_days: 0,
            total_overtime_min: 0,
            night_days: 0,
            total_night_min: 0,
            holiday_days: 0,
            total_holiday_min: 0,
            base_pay_amount: 0,
            weekly_holiday_allowance: 0,
            overtime_allowance: 0,
            night_allowance: 0,
            total_payment_amount: 0,
            income_tax: 0,
            local_tax: 0,
            national_pension: 0,
            health_insurance: 0,
            total_deduction_amount: 0,
            net_pay_amount: 0,
        }
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
                임금대장
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
                <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ p: 4 }} ref={contentRef}>
                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" mb={2}>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            회사명: 글로벌코리아
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            귀속연월: 2025년 12월
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            지급일: 2025.01.10
                        </Typography>
                    </Stack>
                </Stack>

                <Box sx={{ borderTop: '2px solid #000', mb: 2 }} />

                <TableContainer sx={{ border: 'none', mb: 4, overflowX: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 1000, borderCollapse: 'collapse' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableHeadCell rowSpan={2}>성명</StyledTableHeadCell>
                                <StyledTableHeadCell rowSpan={2}>고용형태</StyledTableHeadCell>
                                <StyledTableHeadCell rowSpan={2}>급여구분</StyledTableHeadCell>
                                <StyledTableHeadCell colSpan={10}>근무현황</StyledTableHeadCell>
                                <StyledTableHeadCell colSpan={5}>지급내역</StyledTableHeadCell>
                                <StyledTableHeadCell colSpan={5}>공제내역</StyledTableHeadCell>
                                <StyledTableHeadCell rowSpan={2}>실수령액</StyledTableHeadCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableHeadCell>
                                    총근무
                                    <br />
                                    일수
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    총근무
                                    <br />
                                    시간
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    정상
                                    <br />
                                    일수
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    정상
                                    <br />
                                    시간
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    연장
                                    <br />
                                    일수
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    연장
                                    <br />
                                    시간
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    야간
                                    <br />
                                    일수
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    야간
                                    <br />
                                    시간
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    휴일
                                    <br />
                                    일수
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    휴일
                                    <br />
                                    시간
                                </StyledTableHeadCell>

                                <StyledTableHeadCell>기본급</StyledTableHeadCell>
                                <StyledTableHeadCell>주휴수당</StyledTableHeadCell>
                                <StyledTableHeadCell>연장수당</StyledTableHeadCell>
                                <StyledTableHeadCell>야간수당</StyledTableHeadCell>
                                <StyledTableHeadCell>지급총액</StyledTableHeadCell>

                                <StyledTableHeadCell>소득세</StyledTableHeadCell>
                                <StyledTableHeadCell>지방세</StyledTableHeadCell>
                                <StyledTableHeadCell>국민연금</StyledTableHeadCell>
                                <StyledTableHeadCell>건강보험</StyledTableHeadCell>
                                <StyledTableHeadCell>공제총액</StyledTableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DUMMY_LEDGER_DATA.map((row, idx) => (
                                <TableRow key={idx}>
                                    <StyledTableCell>{row.user_name}</StyledTableCell>
                                    <StyledTableCell>{renderMultilineText(row.job_type_code_id)}</StyledTableCell>
                                    <StyledTableCell>{renderMultilineText(row.pay_type_code_id)}</StyledTableCell>

                                    <StyledTableCell>{formatDays(row.total_work_days)}</StyledTableCell>
                                    <StyledTableCell>{formatMinToHours(row.total_work_min)}</StyledTableCell>
                                    <StyledTableCell>{formatDays(row.normal_work_days)}</StyledTableCell>
                                    <StyledTableCell>{formatMinToHours(row.total_normal_min)}</StyledTableCell>
                                    <StyledTableCell>{formatDays(row.overtime_days)}</StyledTableCell>
                                    <StyledTableCell>{formatMinToHours(row.total_overtime_min)}</StyledTableCell>
                                    <StyledTableCell>{formatDays(row.night_days)}</StyledTableCell>
                                    <StyledTableCell>{formatMinToHours(row.total_night_min)}</StyledTableCell>
                                    <StyledTableCell>{formatDays(row.holiday_days)}</StyledTableCell>
                                    <StyledTableCell>{formatMinToHours(row.total_holiday_min)}</StyledTableCell>

                                    <StyledTableCell>{formatMoney(row.base_pay_amount)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.weekly_holiday_allowance)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.overtime_allowance)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.night_allowance)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.total_payment_amount)}</StyledTableCell>

                                    <StyledTableCell>{formatMoney(row.income_tax)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.local_tax)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.national_pension)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.health_insurance)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.total_deduction_amount)}</StyledTableCell>
                                    <StyledTableCell>{formatMoney(row.net_pay_amount)}</StyledTableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <SummaryTableCell colSpan={3}>합계 ({DUMMY_LEDGER_DATA.length}명)</SummaryTableCell>
                                <SummaryTableCell>{formatDays(totals.total_work_days)}</SummaryTableCell>
                                <SummaryTableCell>{formatMinToHours(totals.total_work_min)}</SummaryTableCell>
                                <SummaryTableCell>{formatDays(totals.normal_work_days)}</SummaryTableCell>
                                <SummaryTableCell>{formatMinToHours(totals.total_normal_min)}</SummaryTableCell>
                                <SummaryTableCell>{formatDays(totals.overtime_days)}</SummaryTableCell>
                                <SummaryTableCell>{formatMinToHours(totals.total_overtime_min)}</SummaryTableCell>
                                <SummaryTableCell>{formatDays(totals.night_days)}</SummaryTableCell>
                                <SummaryTableCell>{formatMinToHours(totals.total_night_min)}</SummaryTableCell>
                                <SummaryTableCell>{formatDays(totals.holiday_days)}</SummaryTableCell>
                                <SummaryTableCell>{formatMinToHours(totals.total_holiday_min)}</SummaryTableCell>

                                <SummaryTableCell>{formatMoney(totals.base_pay_amount)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.weekly_holiday_allowance)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.overtime_allowance)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.night_allowance)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.total_payment_amount)}</SummaryTableCell>

                                <SummaryTableCell>{formatMoney(totals.income_tax)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.local_tax)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.national_pension)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.health_insurance)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.total_deduction_amount)}</SummaryTableCell>
                                <SummaryTableCell>{formatMoney(totals.net_pay_amount)}</SummaryTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        발행일: 2025년 1월 10일
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        © 2025 WorkUs. All rights reserved.
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
                {type === 'print' ? (
                    <Button
                        variant="contained"
                        onClick={handlePrint}
                        sx={{ width: 120, bgcolor: '#0d6efd', '&:hover': { bgcolor: '#0b5ed7' } }}
                    >
                        인쇄하기
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleDownloadPdf}
                        sx={{ width: 120, bgcolor: '#dc3545', '&:hover': { bgcolor: '#bb2d3b' } }}
                    >
                        PDF 다운로드
                    </Button>
                )}
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{ width: 80, bgcolor: '#6c757d', color: '#fff', '&:hover': { bgcolor: '#5c636a' } }}
                >
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
}
