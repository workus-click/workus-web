import { redirect } from 'react-router'

export async function requireInviteAccess() {
    const response = await fetch('/api/auth/me', {
        credentials: 'include',
    })

    if (response.status === 401 || response.status === 403) {
        return redirect('/login')
    }

    if (!response.ok) {
        throw response
    }

    // API 결과는 사용하지 않되 인증 확인만 수행한다.
    await response.json()

    return null
}
