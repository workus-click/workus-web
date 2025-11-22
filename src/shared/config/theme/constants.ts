import type { ThemeTokens } from './types'

export const defaultThemeTokens: ThemeTokens = {
    id: 'default-mono',
    name: 'Default Monochrome',
    tone: 'light',
    colors: {
        primary: '#111111',
        secondary: '#0f172a',
        background: '#ffffff',
        surface: '#f7f7f7',
        border: '#e5e7eb',
        text: {
            primary: '#0f172a',
            secondary: '#4b5563',
            inverse: '#ffffff',
        },
    },
}
