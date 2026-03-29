import { redirect } from "react-router";
import { refreshMe } from "../../../shared/api/meSession.ts";

type MeCompany = {
    storeId: number
    storeName: string
    storeAddress: string
}

export interface accountInfo {
    name : string,
    detail : string,
    compName : string,
    currentStoreId: number,
    companies: MeCompany[],
}

export async function requireAuth(
    { request }: { request: Request }
) {
    const meResponse = await refreshMe()
    if (!meResponse) {
        return redirect('/login');
    }

    const pathname = new URL(request.url).pathname;

    if (meResponse.companies.length === 0) {
        if (pathname !== '/onboarding' && pathname !== '/store/register') {
            return redirect('/onboarding');
        }
        return null;
    }

    const currentStore = meResponse.companies[0];

    return {
        name: meResponse.name,
        detail: meResponse.loginId,
        compName: currentStore.storeName,
        currentStoreId: currentStore.storeId,
        companies: meResponse.companies,
    } satisfies accountInfo;
}
