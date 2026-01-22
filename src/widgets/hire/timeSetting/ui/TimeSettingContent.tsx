import { Box, Button, MenuItem, Select, Stack, Typography } from '@mui/material';

export interface TimeSettingContentProps {
    size?: 'small' | 'large';
    onConfirm?: () => void;
}

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export function TimeSettingContent({ size = 'small', onConfirm }: TimeSettingContentProps) {
    const isSmall = size === 'small';

    const styles = {
        padding: isSmall ? { px: 2.5, py: 2.5 } : { px: 3, py: 3 },
        titleFontSize: isSmall ? 13 : 17,
        labelFontSize: isSmall ? 12 : 14,
        inputHeight: isSmall ? 32 : 40,
        buttonHeight: isSmall ? 28 : 36,
        buttonFontSize: isSmall ? 12 : 14,
        rowHeight: isSmall ? 28 : 40,
        gap: isSmall ? 0.75 : 1,
        sectionGap: isSmall ? 2 : 3,
    };

    return (
        <Box sx={styles.padding}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: styles.gap, mb: styles.sectionGap }}>
                <Typography fontSize={styles.titleFontSize} fontWeight={600}>⏰ 근무시간선택</Typography>
                <Select size="small" defaultValue="am1" sx={{ width: '100%', height: styles.inputHeight, fontSize: styles.labelFontSize }}>
                    <MenuItem value="am1">오전 1 ( 09:00 ~ 12:00 )</MenuItem>
                    <MenuItem value="pm3">오후 3 ( 15:00 ~ 18:00 )</MenuItem>
                    <MenuItem value="night1">야간 1 ( 00:00 ~ 02:00 )</MenuItem>
                </Select>
                <Box sx={{
                    display: 'flex',
                    height: styles.inputHeight,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0.5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                }}>
                    <Typography fontSize={styles.labelFontSize}>오전 09:00</Typography>
                    <Typography fontSize={styles.labelFontSize}>~</Typography>
                    <Typography fontSize={styles.labelFontSize}>오후 12:00</Typography>
                </Box>
            </Box>

            <Box sx={{ mb: styles.sectionGap }}>
                <Typography fontSize={styles.titleFontSize} fontWeight={600}>📅 적용요일설정</Typography>
                <Stack direction='row' spacing={0.5} sx={{ pt: styles.gap }}>
                    <Button variant='outlined' color='primary' sx={{ flex: 1, py: 0, minHeight: styles.buttonHeight, fontSize: styles.buttonFontSize }}>전체</Button>
                    <Button variant='outlined' color='primary' sx={{ flex: 1, py: 0, minHeight: styles.buttonHeight, fontSize: styles.buttonFontSize }}>평일만</Button>
                    <Button variant='outlined' color='primary' sx={{ flex: 1, py: 0, minHeight: styles.buttonHeight, fontSize: styles.buttonFontSize }}>주말만</Button>
                </Stack>
                <Stack direction='row' spacing={0.5} sx={{ pt: styles.gap, width: '100%' }}>
                    {WEEKDAYS.map((day) => (
                        <Button key={day} variant='outlined' color='primary' sx={{ flex: 1, minWidth: 0, px: 0.5, py: 0, minHeight: styles.buttonHeight, fontSize: styles.buttonFontSize }}>
                            {day}
                        </Button>
                    ))}
                </Stack>
                <Button variant='outlined' color='primary' sx={{ mt: styles.gap, width: '100%', py: 0, minHeight: styles.buttonHeight, fontSize: styles.buttonFontSize }}>적용하기</Button>
            </Box>

            <Box>
                <Typography fontSize={styles.titleFontSize} fontWeight={600}>📋 설정된 근무시간</Typography>
                {WEEKDAYS.map((day) => (
                    <Box key={day} sx={{
                        height: styles.rowHeight,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: styles.gap,
                        px: 2,
                    }}>
                        <Typography fontSize={styles.labelFontSize} fontWeight={600}>{day}</Typography>
                        <Typography fontSize={styles.labelFontSize} color="text.secondary">-</Typography>
                    </Box>
                ))}
            </Box>

            <Stack direction='row' justifyContent={'center'} sx={{ pt: styles.sectionGap }}>
                <Button variant='contained' color='secondary' size={isSmall ? 'small' : 'medium'} onClick={onConfirm} sx={{ fontSize: styles.buttonFontSize, py: isSmall ? 0.5 : 1 }}>
                    확인
                </Button>
            </Stack>
        </Box>
    );
}
