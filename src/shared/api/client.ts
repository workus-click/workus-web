import ky from 'ky'

const SESSION_EXCLUDED_PATHS = new Set([
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/check-id',
])

export const apiClient = ky.create({
    credentials: 'include',
    hooks: {
        afterResponse: [
            (request, _options, response) => {
                if (response.status !== 401 && response.status !== 403) {
                    return
                }

                const pathname = new URL(request.url).pathname
                if (SESSION_EXCLUDED_PATHS.has(pathname)) {
                    return
                }

                if (window.location.pathname !== '/login') {
                    window.location.assign('/login')
                }
            },
        ],
    },
})
