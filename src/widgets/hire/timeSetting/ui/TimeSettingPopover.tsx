import { Popover } from '@mui/material';
import { TimeSettingContent } from './TimeSettingContent';

export interface TimeSettingPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

export function TimeSettingPopover({ isOpen, onClose, anchorEl }: TimeSettingPopoverProps) {
    return (
        <Popover
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            slotProps={{
                paper: {
                    sx: { width: '320px', maxWidth: '90vw', ml: 1 }
                }
            }}
        >
            <TimeSettingContent size="small" onConfirm={onClose} />
        </Popover>
    );
}
