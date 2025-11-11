import { useMemo } from 'react'
import { defaultThemeTokens } from './constants'

// Later we can fetch remote theme tokens and memoize them here.
export function useThemeTokens() {
    return useMemo(() => defaultThemeTokens, [])
}
