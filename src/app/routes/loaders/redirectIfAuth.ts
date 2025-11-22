import { redirect } from "react-router";
import { TOKEN_STORAGE_KEY } from "../../../features/auth/login/constants.ts";

export async function redirectIfAuth() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
        return redirect("/");
    }
    return null;
}