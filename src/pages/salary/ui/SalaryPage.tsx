import { Box, Stack, Typography } from '@mui/material'

export function SalaryPage() {

    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h4">급여 관리</Typography>
                <Box sx={{ height: 320, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }} />
            </Stack>
        </>
    )
}
