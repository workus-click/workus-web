import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type AuthPageShellProps = {
    children: ReactNode
}

export function AuthPageShell({ children }: AuthPageShellProps) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                bgcolor: 'background.default',
            }}
        >
            {children}
            <Stack spacing={0.5} alignItems='center' mt={4}>
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
