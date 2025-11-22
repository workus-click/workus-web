import { Box, Stack, Typography } from '@mui/material'


type MenuItem = {
    label: string
    isActive?: boolean
    onClick?: () => void
}

type NavMenuProps = {
    items: MenuItem[]
}

function NavMenu({ items }: NavMenuProps) {

    return (
        <Box
            component="nav"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {items.map((item) => (
                    <Typography
                        key={item.label}
                        variant="body2"
                        onClick={item.onClick}
                        sx={{
                            cursor: item.onClick ? 'pointer' : 'default',
                            fontWeight: item.isActive ? 800 : 400,
                            color: item.isActive ? 'text.primary' : 'text.secondary',
                            transition: 'color 0.5s ease, font-weight 0.1s ease',
                            "&:hover": !item.isActive ? {
                                fontWeight: 600,
                                color: 'text.primary'
                            } : {}
                        }}
                    >
                        {item.label}
                    </Typography>
                ))}
            </Stack>
        </Box>
    )
}

export default NavMenu
