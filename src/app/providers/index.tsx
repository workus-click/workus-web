import type { PropsWithChildren } from 'react'
import { AppThemeProvider } from './theme'

export function AppProviders({ children }: PropsWithChildren) {
    return <AppThemeProvider>{children}</AppThemeProvider>
}
