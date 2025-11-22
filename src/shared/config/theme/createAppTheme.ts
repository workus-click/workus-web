import { createTheme } from '@mui/material/styles'
import type { ThemeTokens } from './types'

export function createAppTheme(tokens: ThemeTokens) {
    return createTheme({
        palette: {
            mode: tokens.tone,
            primary: {
                main: tokens.colors.primary,
            },
            secondary: {
                main: tokens.colors.secondary,
            },
            background: {
                default: tokens.colors.background,
                paper: tokens.colors.surface,
            },
            text: {
                primary: tokens.colors.text.primary,
                secondary: tokens.colors.text.secondary,
            },
        },
        shape: {
            borderRadius: 12,
        },
        typography: {
            fontFamily: '"Pretendard GOV","Pretendard",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
            h1: { fontWeight: 600, letterSpacing: '-0.02em' },
            h2: { fontWeight: 600, letterSpacing: '-0.02em' },
            h3: { fontWeight: 600, letterSpacing: '-0.02em' },
            button: {
                textTransform: 'none',
                fontWeight: 500,
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        borderColor: tokens.colors.border,
                    },
                },
            },
        },
    })
}
