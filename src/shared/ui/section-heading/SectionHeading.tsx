import type { ReactNode } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type SectionHeadingProps = {
    eyebrow?: string
    title: string
    description?: string
    action?: ReactNode
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                {eyebrow && (
                    <Typography variant="overline" color="primary">
                        {eyebrow}
                    </Typography>
                )}
                <Typography variant="h3" component="h1">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body1" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </Stack>
            {action && (
                <Box>
                    {action}
                </Box>
            )}
        </Stack>
    )
}
