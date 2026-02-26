import { LoginForm } from '../../../features/auth/login'
import { AuthPageShell } from '../../../shared/ui'

export function LoginPage() {

    return (
        <AuthPageShell>
            <LoginForm/>
        </AuthPageShell>
    )
}
