import { CompForm } from '../../../features/auth/login'
import { useLoaderData, useNavigate } from 'react-router'
import { AuthPageShell } from '../../../shared/ui'
import { apiClient } from '../../../shared/api'
import { clearAuthToken } from '../../../shared/api/meSession'

type MeCompany = {
    storeId: number
    storeName: string
    storeAddress: string
}

type LoaderMeData = {
    companies: MeCompany[]
} | null

export function OnboardingPage() {
    const navigate = useNavigate()
    const accountInfo = useLoaderData<LoaderMeData>()
    const hasStore = (accountInfo?.companies ?? []).length > 0

    const handleLogout = async () => {
        await apiClient.post('/api/auth/logout')
        clearAuthToken()
        navigate('/login', { replace: true })
    }

    const handleInvite = () => {
        navigate('/invite/list')
    }

    const handleStoreRegister = () => {
        navigate('/store/register')
    }

    const handleBackOrLogout = () => {
        if (hasStore) {
            navigate(-1)
            return
        }
        void handleLogout()
    }

    const actionLabel = hasStore ? '돌아가기' : '로그아웃'

    return (
        <AuthPageShell>
            <CompForm
                actionLabel={actionLabel}
                onAction={handleBackOrLogout}
                onInvite={handleInvite}
                onStoreRegister={handleStoreRegister}
            />
        </AuthPageShell>
    )
}
