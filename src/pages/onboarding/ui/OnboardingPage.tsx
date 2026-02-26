import { CompForm } from '../../../features/auth/login'
import { useNavigate } from 'react-router'
import { AuthPageShell } from '../../../shared/ui'
import { apiClient } from '../../../shared/api'

export function OnboardingPage() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await apiClient.post('/api/auth/logout')
        navigate('/login', { replace: true })
    }

    const handleInvite = () => {
        navigate('/invite/list')
    }

    const handleStoreRegister = () => {
        navigate('/store/register')
    }

    return (
        <AuthPageShell>
            <CompForm onLogout={handleLogout} onInvite={handleInvite} onStoreRegister={handleStoreRegister} />
        </AuthPageShell>
    )
}
