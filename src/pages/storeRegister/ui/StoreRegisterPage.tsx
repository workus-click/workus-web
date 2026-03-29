import { AuthPageShell } from '../../../shared/ui'
import { StoreRegisterForm } from '../../../features/storeRegister'

export function StoreRegisterPage() {
    return (
        <AuthPageShell>
            <StoreRegisterForm />
        </AuthPageShell>
    )
}
