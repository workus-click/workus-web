/** 캘린더 요일 헤더 높이 (px) */
export const DAY_HEADER_HEIGHT = 31;

/** 캘린더 주차 행 높이 (px) */
export const WEEK_ROW_HEIGHT = 104;

/** 해당 월의 주차 수 계산 */
export function getWeekCount(year: number, month: number): number {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay()); // 첫째 주 일요일
    let count = 0;
    while (start <= lastDay) {
        count++;
        start.setDate(start.getDate() + 7);
    }
    return count;
}
