import { Box, Stack, Typography, Checkbox } from '@mui/material'

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
        <Box sx={{ p: 1.5, height: '100%' }}>
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
    )
}
