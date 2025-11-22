import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'

type AppButtonProps = ButtonProps & {
    sx?: SxProps<Theme>
}

const baseSx: SxProps<Theme> = {
    borderRadius: 999,
    fontWeight: 600,
    px: 3,
    py: 1.2,
    letterSpacing: 0.2,
}

export function AppButton({ sx, variant = 'contained', color = 'primary', children, ...rest }: AppButtonProps) {
    const mergedSx: SxProps<Theme> = Array.isArray(sx)
        ? [baseSx, ...sx]
        : sx
          ? [baseSx, sx]
          : [baseSx]

    return (
        <Button disableElevation variant={variant} color={color} sx={mergedSx} {...rest}>
            {children}
        </Button>
    )
}
