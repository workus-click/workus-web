import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createAppTheme, useThemeTokens } from '../../../shared/config/theme'

export function AppThemeProvider({ children }: PropsWithChildren) {
    const tokens = useThemeTokens()
    const theme = useMemo(() => createAppTheme(tokens), [tokens])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
