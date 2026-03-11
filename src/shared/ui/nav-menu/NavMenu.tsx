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
                        variant="body1"
                        onClick={item.onClick}
                        sx={{
                            cursor: item.onClick ? 'pointer' : 'default',
                            fontWeight: item.isActive ? 1000 : 600,
                            color: item.isActive ? 'common.white' : 'grey.500',
                            transition: 'color 0.5s ease, font-weight 0.1s ease',
                            "&:hover": !item.isActive ? {
                                fontWeight: 800,
                                color: 'common.white'
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
