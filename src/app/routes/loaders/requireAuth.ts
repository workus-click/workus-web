import {redirect} from "react-router";
import {TOKEN_STORAGE_KEY} from "../../../features/auth/login/constants.ts";

export interface accountInfo {
    name : string,
    detail : string,
    compName : string,
}

export async function requireAuth(
) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
        return redirect(`/login`,)
    }else{
        return { name: 'admin', detail: '시스템 관리자', compName : "workUs" } satisfies accountInfo;
    }
}