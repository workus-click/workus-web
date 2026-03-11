import { redirect } from 'react-router'
import { refreshMe } from '../../../shared/api/meSession.ts'

export async function requireInviteAccess(
    { params }: { params: Record<string, string | undefined> }
) {
    const meResponse = await refreshMe()
    if (!meResponse) {
        const token = params.token
        if (token) {
            return redirect(`/login?invite=${encodeURIComponent(token)}`)
        }
        return redirect('/login')
    }

    return null
}
