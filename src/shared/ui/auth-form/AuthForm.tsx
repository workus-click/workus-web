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
                maxWidth: 420,
                p: { xs: 3, md: 4 },
                borderRadius: 2,
            }}
        >
            <Stack spacing={2} sx={{ minHeight: 1 }}>
                <Stack alignItems='center' spacing={0.5}>
                    <Box component='img' src={workusLogo} alt='WorkUs logo' sx={{ height: 56 }} />
                    <Typography variant='h5' sx={{ fontWeight: 700, color: '#111' }}>
                        {title}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#666' }}>
                        {description}
                    </Typography>
                </Stack>
                <Box sx={{ mt: 3 }}>{content}</Box>
                {footer && <Box sx={{ mt: 'auto', pt: 4, textAlign: 'center' }}>{footer}</Box>}
            </Stack>
        </Paper>
    )
}
