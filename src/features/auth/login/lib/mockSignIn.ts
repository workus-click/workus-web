import { AUTH_CREDENTIALS, TOKEN_STORAGE_KEY } from '../constants'

export type LoginParams = {
    username: string
    password: string
}

export async function mockSignIn(params: LoginParams) {
    return new Promise<{ token: string }>((resolve, reject) => {
        setTimeout(() => {
            const isValid =
                params.username.trim() === AUTH_CREDENTIALS.username &&
                params.password === AUTH_CREDENTIALS.password

            if (!isValid) {
                reject(new Error('올바르지 않은 로그인 정보입니다.'))
                return
            }

            const token = btoa(`${params.username}:${Date.now()}`)
            localStorage.setItem(TOKEN_STORAGE_KEY, token)
            resolve({ token })
        }, 600)
    })
}
