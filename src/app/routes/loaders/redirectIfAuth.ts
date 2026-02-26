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

export async function redirectIfAuth({ request }: { request: Request }) {
    const { searchParams } = new URL(request.url)

    if (searchParams.get('logout') === '1') {
        return null
    }

    const response = await fetch('/api/auth/me', {
        credentials: 'include',
    });

    if (response.status === 401 || response.status === 403) {
        return null;
    }

    if (!response.ok) {
        throw response;
    }

    const meResponse = await response.json() as ApiResponse<MeResponse, boolean>;
    return redirect(meResponse.data.companies.length === 0 ? '/onboarding' : '/');
}
