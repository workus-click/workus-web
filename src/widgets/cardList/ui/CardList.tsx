import { Box, Stack, Typography, Checkbox } from '@mui/material'

export interface ListItem {
    id: string | number;
    title: string;
    subtitle: string;
}

interface CardListProps {
    items: ListItem[]
}

export function CardList({
    items,
}: CardListProps) {
    return (
        <Box sx={{ p: 1.5, height: '100%' }}>
            <Stack spacing={1.5}>
                {items.map((ListItem) => (
                    <Box
                        key={ListItem.id}
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
                            <Typography variant='h6' sx={{ fontWeight: 500 }}>{ListItem.title}</Typography>
                            <Typography variant='caption' color='text.secondary'>
                                {ListItem.subtitle}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
