import { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DAY_HEADER_HEIGHT } from '../../../shared/ui/calendar';
import type { CalendarEvent } from '../../../shared/ui/calendar';

interface WeeklySummaryProps {
    /** 캘린더에 표시된 이벤트 목록 (근무 스케줄) */
    events: CalendarEvent[];
    /** 표시할 연도 */
    year: number;
    /** 표시할 월 1~12 */
    month: number;
}

interface WeekData {
    /** 주차 번호 (1부터 시작) */
    weekNumber: number;
    /** 주 시작일 (M/D 형식) */
    startDate: string;
    /** 주 종료일 (M/D 형식) */
    endDate: string;
    /** 해당 주 총 근무시간 */
    totalHours: number;
    /** 해당 주 근무일수 */
    workDays: number;
    /** 주휴수당 해당 여부 (15시간 이상) */
    isEligibleForWeeklyHoliday: boolean;
}

/** 월의 주차별 근무 데이터를 계산 */
function calculateWeeklySummaries(
    events: CalendarEvent[],
    year: number,
    month: number
): WeekData[] {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const weeks: WeekData[] = [];

    // 해당 월 1일이 속한 주의 일요일부터 시작
    const currentWeekStart = new Date(firstDay);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

    let weekNumber = 1;

    while (currentWeekStart <= lastDay) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        // 해당 주에 속하는 스케줄 필터링
        const weekEvents = events.filter(event => {
            const eventDate = new Date(event.start);
            return eventDate >= currentWeekStart && eventDate <= weekEnd;
        });

        // 총 근무시간 계산 (밀리초 → 시간)
        const totalHours = weekEvents.reduce((sum, event) => {
            const start = new Date(event.start);
            const end = new Date(event.end);
            const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
            return sum + hours;
        }, 0);

        weeks.push({
            weekNumber,
            startDate: `${currentWeekStart.getMonth() + 1}/${currentWeekStart.getDate()}`,
            endDate: `${weekEnd.getMonth() + 1}/${weekEnd.getDate()}`,
            totalHours: Math.round(totalHours * 10) / 10,
            workDays: weekEvents.length,
            isEligibleForWeeklyHoliday: totalHours >= 15
        });

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        weekNumber++;
    }

    return weeks;
}

export function WeeklySummary({ events, year, month }: WeeklySummaryProps) {
    const weeks = useMemo(() =>
        calculateWeeklySummaries(events, year, month),
        [events, year, month]
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* 주차별 집계 타이틀 */}
            <Box sx={{ height: `${DAY_HEADER_HEIGHT}px`, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <Typography variant="body2" fontWeight="bold">주차별 집계</Typography>
            </Box>

            {/* 주차 행 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {weeks.map((week, index) => {
                    const isLastWeek = index === weeks.length - 1;

                    return (
                        <Box
                            key={week.weekNumber}
                            sx={{
                                flex: 1,
                                p: '8px 12px',
                                borderTop: '1px solid #e0e0e0',
                                borderRight: '1px solid #e0e0e0',
                                // 마지막 주차는 부모 컨테이너 border와 겹침 방지
                                borderBottom: isLastWeek ? 'none' : '1px solid #e0e0e0',
                                // 주휴수당 해당 여부에 따라 왼쪽 강조 색상 변경
                                borderLeft: week.isEligibleForWeeklyHoliday
                                    ? '4px solid #4caf50'
                                    : '4px solid #e0e0e0',
                                bgcolor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                overflow: 'hidden',
                            }}
                        >
                            {/* 주차 정보 */}
                            <Box>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: '4px' }}>
                                    <Typography variant="body2" fontWeight="bold">{week.weekNumber}주차</Typography>
                                    <Typography variant="caption" color="#999">
                                        {week.startDate} ~ {week.endDate}
                                    </Typography>
                                </Stack>

                                {/* 근무일수 / 총 근무시간 */}
                                <Box sx={{ fontSize: '12px', color: '#666', lineHeight: 1.4 }}>
                                    <Box>근무 <strong style={{ color: '#333' }}>{week.workDays}일</strong></Box>
                                    <Box>총 <strong style={{ color: '#333' }}>{week.totalHours}시간</strong></Box>
                                </Box>
                            </Box>

                            {/* 주휴수당 해당 여부 */}
                            <Typography variant="caption" fontWeight={600}>
                                {week.isEligibleForWeeklyHoliday ? (
                                    <Box component="span" sx={{ color: '#4caf50' }}>✅ 주휴수당</Box>
                                ) : (
                                    <Box component="span" sx={{ color: '#f44336' }}>❌ 미해당</Box>
                                )}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
