import type { NavigateFunction } from 'react-router'

export const MAIN_NAV_LINKS = [
    { label: '대시보드', path: '/' },
    { label: '알바생 등록', path: '/hire' },
    { label: '출퇴근 관리', path: '/hr' },
    { label: '급여 관리', path: '/salary' },
]

export function createMainNavItems(currentPath: string, navigate: NavigateFunction) {
    return MAIN_NAV_LINKS.map((item) => ({
        label: item.label,
        isActive: currentPath === item.path,
        onClick: () => navigate(item.path),
    }))
}
