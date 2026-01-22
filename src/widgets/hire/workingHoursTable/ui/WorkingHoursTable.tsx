import { Box, IconButton, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TimeSettingPopover, TimeSettingDialog } from '../../timeSetting';
import { useState } from 'react';

interface WorkingHoursTableProps {
    variant?: 'dialog' | 'popover';
    onChange?: (hours: Record<string, string>) => void;
}

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export function WorkingHoursTable({ variant = 'popover', onChange }: WorkingHoursTableProps) {
    const [selectedHours, setSelectedHours] = useState<Record<string, string>>({
        월: '오전1',
        화: '오전1',
        수: '오전1',
        목: '오전1',
        금: '',
        토: '',
        일: '오전1',
    });

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (variant === 'popover') {
            setAnchorEl(event.currentTarget);
        } else {
            setDialogOpen(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDialogOpen(false);
    };

    return (
        <Box sx={{
            width: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 0.5,
            overflow: 'hidden',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* 요일 헤더 행 */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                px: 1,
                columnGap: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}>
                {WEEKDAYS.map((day) => (
                    <Box
                        key={`header-${day}`}
                        sx={{
                            textAlign: 'center',
                            py: 0.5,
                            fontWeight: 600,
                            fontSize: 12,
                        }}
                    >
                        {day}
                    </Box>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 0.5 }}>
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={handleOpen}>
                        <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* 시간 행 */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                px: 1,
                columnGap: 1,
            }}>
                {WEEKDAYS.map((day) => (
                    <Box
                        key={`time-${day}`}
                        sx={{
                            textAlign: 'center',
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography fontSize={12}>
                            {selectedHours[day] || ''}
                        </Typography>
                    </Box>
                ))}
                <Box />
            </Box>

            {variant === 'popover' ? (
                <TimeSettingPopover
                    isOpen={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                />
            ) : (
                <TimeSettingDialog
                    isOpen={dialogOpen}
                    onClose={handleClose}
                />
            )}
        </Box>
    );
}
