export type ThemeTone = 'light' | 'dark'

export type ThemeTokens = {
    id: string
    name: string
    tone: ThemeTone
    colors: {
        primary: string
        secondary: string
        background: string
        surface: string
        border: string
        text: {
            primary: string
            secondary: string
            inverse: string
        }
    }
}
