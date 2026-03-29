import { Box, IconButton, Stack, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarHeaderProps {
    year: number;
    month: number;
    onNavigate: (year: number, month: number) => void;
}

export function CalendarHeader({
    year,
    month,
    onNavigate,
}: CalendarHeaderProps) {
    const handlePrevMonth = () => {
        if (month === 1) {
            onNavigate(year - 1, 12);
        } else {
            onNavigate(year, month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            onNavigate(year + 1, 1);
        } else {
            onNavigate(year, month + 1);
        }
    };

    const handleToday = () => {
        const today = new Date();
        onNavigate(today.getFullYear(), today.getMonth() + 1);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handlePrevMonth} size="small">
                    <ChevronLeftIcon />
                </IconButton>

                <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 150, textAlign: 'center' }}>
                    {year}년 {month}월
                </Typography>

                <IconButton onClick={handleNextMonth} size="small">
                    <ChevronRightIcon />
                </IconButton>
            </Stack>

            <Button
                variant="outlined"
                size="small"
                onClick={handleToday}
                sx={{ minWidth: 80 }}
            >
                오늘
            </Button>
        </Box>
    );
}
