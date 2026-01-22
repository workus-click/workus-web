import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { TimeSettingContent } from './TimeSettingContent';

export interface TimeSettingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TimeSettingDialog({ isOpen, onClose }: TimeSettingDialogProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: { width: '450px', maxWidth: '90vw' }
                }
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    backgroundColor: '#000',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '22px',
                }}
            >
                근무시간설정
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#fff',
                }}
            >
                ✕
            </IconButton>
            <DialogContent dividers sx={{ p: 0 }}>
                <TimeSettingContent size="large" onConfirm={onClose} />
            </DialogContent>
        </Dialog>
    );
}
