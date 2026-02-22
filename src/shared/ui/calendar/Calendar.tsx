import { useEffect, useRef } from 'react';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { CalendarHeader } from './CalendarHeader';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date | string;
    end: Date | string;
    employeeType?: 'P' | 'E';  // 알바생(P) 또는 직원(E)
}

export interface CalendarProps {
    /** 표시할 연도 (기본값: 현재 연도) */
    year?: number;
    /** 표시할 월 1~12 (기본값: 현재 월) */
    month?: number;
    /** 캘린더에 표시할 이벤트 목록 (스케줄) */
    events?: CalendarEvent[];
    /** true면 이벤트 드래그/수정 가능 (기본값: false) */
    editable?: boolean;
    /** 이벤트 클릭 시 호출되는 콜백 */
    onEventClick?: (event: CalendarEvent) => void;
    /** 이벤트 드래그로 시간 변경 시 호출되는 콜백 */
    onEventUpdate?: (event: { id: string; start: Date; end: Date }) => void;
    /** 빈 날짜/시간 선택 시 호출되는 콜백 */
    onSelectDateTime?: (event: { start: Date; end: Date }) => void;
    /** true면 상단 월 이동 헤더 표시 (기본값: false) */
    showHeader?: boolean;
    /** 헤더에서 월 변경 시 호출되는 콜백 */
    onNavigate?: (year: number, month: number) => void;
}

export function ToastCalendar({
    year: propYear,
    month: propMonth,
    events = [],
    editable = false,
    onEventClick,
    onEventUpdate,
    onSelectDateTime,
    showHeader = false,
    onNavigate,
}: CalendarProps) {
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const instanceRef = useRef<Calendar | null>(null);

    // 콜백을 객체로 묶어서 ref로 관리하여 인스턴스 재생성 방지 (클로저 문제)
    const callbackRefs = useRef({
        onEventClick,
        onEventUpdate,
        onSelectDateTime,
    });

    // 매 렌더마다 최신 콜백으로 갱신
    callbackRefs.current = {
        onEventClick,
        onEventUpdate,
        onSelectDateTime,
    };

    // year, month props가 없으면 현재 날짜 사용
    const today = new Date();
    const year = propYear ?? today.getFullYear();
    const month = propMonth ?? today.getMonth() + 1;

    // 캘린더 인스턴스 생성
    useEffect(() => {
        if (!calendarRef.current) return;

        instanceRef.current = new Calendar(calendarRef.current, {
            defaultView: 'month',
            usageStatistics: false,
            isReadOnly: !editable,
            useDetailPopup: false,
            useFormPopup: false,
            month: {
                isAlways6Weeks: false,
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            },
            calendars: [
                {
                    id: 'cal1',
                    name: 'calendar',
                },
            ],
            template: {
                time(event: CalendarEvent) {
                    const start = typeof event.start === 'string' ? new Date(event.start) : event.start;
                    const end = typeof event.end === 'string' ? new Date(event.end) : event.end;
                    const startTime = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
                    const endTime = `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
                    const fullText = `${event.title} (${startTime}-${endTime})`;
                    return `<div style="font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 2px;" title="${fullText}">${fullText}</div>`;
                },
            },
        });

        // 이벤트 클릭
        instanceRef.current.on('clickEvent', (eventObj) => {
            callbackRefs.current.onEventClick?.(eventObj.event as CalendarEvent);
        });

        // 이벤트 드래그앤드롭
        instanceRef.current.on('beforeUpdateEvent', (eventObj) => {
            const { event, changes } = eventObj;
            const start = changes.start ? new Date(changes.start as Date) : new Date(event.start as Date);
            const end = changes.end ? new Date(changes.end as Date) : new Date(event.end as Date);

            instanceRef.current?.updateEvent(event.id, event.calendarId, changes);
            callbackRefs.current.onEventUpdate?.({ id: event.id, start, end });
        });

        // 날짜/시간 선택
        instanceRef.current.on('selectDateTime', (eventObj) => {
            callbackRefs.current.onSelectDateTime?.(eventObj);
            instanceRef.current?.clearGridSelections();
        });

        return () => {
            instanceRef.current?.destroy();
            instanceRef.current = null;
        };
    }, [editable]);

    // year, month props 변경 시 캘린더 날짜 업데이트
    useEffect(() => {
        if (!instanceRef.current) return;
        instanceRef.current.setDate(new Date(year, month - 1, 1));
    }, [year, month]);

    // events props 변경 시 이벤트 업데이트
    useEffect(() => {
        if (!instanceRef.current) return;
        instanceRef.current.clear();
        const eventsWithReadOnly = events.map(event => {
            const color = event.employeeType === 'E'
                ? '#24AE60'  // 직원 - 초록색
                : '#3498DB'; // 알바생 - 파란색

            return {
                ...event,
                category: 'time' as const,
                backgroundColor: color,
                borderColor: color,
                isReadOnly: !editable
            };
        });
        instanceRef.current.createEvents(eventsWithReadOnly);
    }, [events, editable]);

    // 헤더에서 월 변경 시
    const handleNavigate = (newYear: number, newMonth: number) => {
        onNavigate?.(newYear, newMonth);
    };

    return (
        <>
            {/* 월 변경 버튼 */}
            {showHeader && (
                <CalendarHeader
                    year={year}
                    month={month}
                    onNavigate={handleNavigate}
                />
            )}
            {/* 캘린더 */}
            <div
                ref={calendarRef}
                style={{
                    height: '550px',
                    width: '100%'
                }}
            />
        </>
    );
}