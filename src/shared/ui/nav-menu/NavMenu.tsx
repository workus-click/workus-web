import { Box, Stack, Typography } from '@mui/material'

type MenuItem = {
    label: string
    isActive?: boolean
    onClick?: () => void
}

type NavMenuProps = {
    items: MenuItem[]
}

export function NavMenu({ items }: NavMenuProps) {
    return (
        <Box
            component="nav"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Stack direction="row" spacing={2} sx={{ px: { xs: 2, md: 4 }, py: 1.5 }}>
                {items.map((item) => (
                    <Typography
                        key={item.label}
                        variant="body2"
                        onClick={item.onClick}
                        sx={{
                            cursor: item.onClick ? 'pointer' : 'default',
                            fontWeight: item.isActive ? 600 : 400,
                            color: item.isActive ? 'text.primary' : 'text.secondary',
                        }}
                    >
                        {item.label}
                    </Typography>
                ))}
            </Stack>
        </Box>
    )
}
