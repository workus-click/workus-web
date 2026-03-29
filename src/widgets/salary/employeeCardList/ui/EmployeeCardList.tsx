import { Box, Stack, Typography, Checkbox, Chip } from '@mui/material'

export interface Employee {
    storeUserId: string | number;
    empName: string;
    payInfo: string;
}

export interface EmployeeCardListProps {
    items: Employee[]
}

export function EmployeeCardList({ items }: EmployeeCardListProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* 헤더 */}
            <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', minHeight: 48 }}>
                <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>직원목록</Typography>
                <Stack direction='row' spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                    <Chip label='전체 선택' size='small' clickable />
                    <Chip label='알바생만' size='small' color='primary' clickable />
                    <Chip label='직원만' size='small' color='success' clickable />
                    <Chip label='선택 해제' size='small' variant='outlined' clickable />
                </Stack>
            </Stack>

            {/* 직원 리스트 */}
            <Box sx={{ border: '1px solid', borderColor: 'divider', flex: 1, overflow: 'auto', minHeight: 0 }}>
                <Box sx={{ p: 1.5 }}>
                    <Stack spacing={1.5}>
                        {items.map((employee) => (
                            <Box
                                key={employee.storeUserId}
                                sx={{
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Checkbox size='small' />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant='h6' sx={{ fontWeight: 500 }}>{employee.empName}</Typography>
                                    <Typography variant='caption' color='text.secondary'>
                                        {employee.payInfo}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
