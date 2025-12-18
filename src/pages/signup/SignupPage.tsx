import {Box} from "@mui/material";
import {SignupForm} from "../../features/auth/signup";

export function SignupPage() {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                bgcolor: 'background.default',
            }}
        >
            <SignupForm />
        </Box>
    )
}