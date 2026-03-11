import { redirect } from "react-router";
import { clearAuthToken, refreshMe } from "../../../shared/api/meSession.ts";

export async function redirectIfAuth({ request }: { request: Request }) {
    const { searchParams } = new URL(request.url)
    const inviteToken = searchParams.get('invite')

    if (searchParams.get('logout') === '1') {
        clearAuthToken()
        return null
    }

    const meResponse = await refreshMe()
    if (!meResponse) {
        return null;
    }
    if (inviteToken) {
        return redirect(`/invite/accept/${encodeURIComponent(inviteToken)}`)
    }

    return redirect(meResponse.companies.length === 0 ? '/onboarding' : '/');
}
