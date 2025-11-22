import { Box, Stack, Typography } from '@mui/material'

export function HrPage() {

    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h4">출퇴근 관리</Typography>
                <Box sx={{ height: 320, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }} />
            </Stack>
        </>
    )
}
