import { Paper, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type InfoCardProps = {
    label: string
    value: string
    helperText?: string
    icon?: ReactNode
    action?: ReactNode
}

export function InfoCard({ label, value, helperText, icon, action }: InfoCardProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1.5}>
                {icon}
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Stack>
            <Typography variant="h4" component="p">
                {value}
            </Typography>
            {helperText && (
                <Typography variant="body2" color="text.secondary">
                    {helperText}
                </Typography>
            )}
            {action}
        </Paper>
    )
}
