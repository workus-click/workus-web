import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type AuthPageShellProps = {
    children: ReactNode
}

export function AuthPageShell({ children }: AuthPageShellProps) {
    return (
        <Box
            sx={{
                minHeight: '100dvh',
                display: 'grid',
                gridTemplateRows: '1fr auto',
                px: 2,
                py: 4,
                boxSizing: 'border-box',
                bgcolor: 'background.default',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {children}
            </Box>
            <Stack spacing={0.5} alignItems='center' pt={4}>
                <Typography variant='body2' color='text.secondary'>
                    © {new Date().getFullYear()} WorkUs. All rights reserved.
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                    문의: contact@workus.com
                </Typography>
            </Stack>
        </Box>
    )
}
