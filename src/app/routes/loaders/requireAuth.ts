import { redirect } from "react-router";

type ApiResponse<S, E> = {
    code: string
    message: string
    data: S
    error: E | null
}

type MeCompany = {
    storeId: number
    storeName: string
}

type MeResponse = {
    userId: number
    loginId: string
    name: string
    companies: MeCompany[]
}

export interface accountInfo {
    name : string,
    detail : string,
    compName : string,
}

export async function requireAuth(
    { request }: { request: Request }
) {
    const response = await fetch('/api/auth/me', {
        credentials: 'include',
    });

    if (response.status === 401 || response.status === 403) {
        return redirect('/login');
    }

    if (!response.ok) {
        throw response;
    }

    const meResponse = await response.json() as ApiResponse<MeResponse, boolean>;
    const pathname = new URL(request.url).pathname;

    if (meResponse.data.companies.length === 0) {
        if (pathname !== '/onboarding' && pathname !== '/store/register') {
            return redirect('/onboarding');
        }
        return null;
    }

    return {
        name: meResponse.data.name,
        detail: meResponse.data.loginId,
        compName: meResponse.data.companies[0].storeName,
    } satisfies accountInfo;
}
