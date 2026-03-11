type ApiResponse<S, E> = {
    code: string
    message: string
    data: S
    error: E | null
}

export type MeCompany = {
    storeId: number
    storeName: string
    storeAddress: string
}

export type MeResponse = {
    userId: number
    loginId: string
    name: string
    companies: MeCompany[]
}

// authToken is an in-memory marker for "server auth call allowed" state.
let authToken: string | null | undefined
let refreshPromise: Promise<MeResponse | null> | null = null

export async function refreshMe() {
    if (authToken === null) {
        return null
    }

    if (refreshPromise) {
        return refreshPromise
    }

    refreshPromise = (async () => {
        const response = await fetch('/api/auth/me', {
            credentials: 'include',
        })

        if (response.status === 401 || response.status === 403) {
            clearAuthToken()
            return null
        }

        if (!response.ok) {
            throw response
        }

        const body = await response.json() as ApiResponse<MeResponse, boolean>
        if (authToken === undefined) {
            issueAuthToken()
        }

        return body.data
    })().finally(() => {
        refreshPromise = null
    })

    return refreshPromise
}

export function issueAuthToken() {
    authToken = createInMemoryToken()
}

export function clearAuthToken() {
    authToken = null
    refreshPromise = null
}

function createInMemoryToken() {
    return crypto.randomUUID().replace(/-/g, '')
}
