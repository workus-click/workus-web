import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
import workusLogo from '../../../assets/workUs.png'

type AuthFormProps = {
    title: string
    description: string
    children: ReactNode
    footer?: ReactNode
    formProps?: ComponentProps<'form'>
}

export function AuthForm({ title, description, children, footer, formProps }: AuthFormProps) {
    const content = formProps ? (
        <Box component='form' {...formProps}>
            {children}
        </Box>
    ) : (
        children
    )

    return (
        <Paper
            component='section'
            elevation={0}
            variant='outlined'
            sx={{
                width: '100%',
                minWidth: { xs: 'auto', sm: 420 },
                maxWidth: 'min(560px, calc(100dvh - 160px))',
                minHeight: 'min(760px, calc(100dvh - 140px))',
                mx: 'auto',
                p: { xs: 4, md: 6 },
                borderRadius: 2,
                boxSizing: 'border-box',
            }}
        >
            <Stack sx={{ minHeight: 1 }}>
                <Stack
                    spacing={4}
                    sx={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Stack alignItems='center' spacing={1.5} sx={{ textAlign: 'center' }}>
                        <Box component='img' src={workusLogo} alt='WorkUs logo' sx={{ height: { xs: 72, md: 84 }, width: 'auto' }} />
                        <Typography variant='h4' sx={{ fontWeight: 700, color: '#111', lineHeight: 1.2 }}>
                            {title}
                        </Typography>
                        <Typography variant='body1' sx={{ color: '#666', lineHeight: 1.5 }}>
                            {description}
                        </Typography>
                    </Stack>
                    <Box sx={{ mx: 'auto', width: '100%', maxWidth: 420 }}>
                        {content}
                    </Box>
                </Stack>
                {footer && (
                    <Box sx={{ mt: 'auto', pt: 4, mx: 'auto', width: '100%', maxWidth: 420, textAlign: 'center' }}>
                        {footer}
                    </Box>
                )}
            </Stack>
        </Paper>
    )
}
