import { Box, Stack, Typography } from '@mui/material'

export function HirePage() {

    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h4">알바생 등록</Typography>
                <Box sx={{ height: 320, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }} />
            </Stack>
        </>
    )
}
