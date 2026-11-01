const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Lock to prevent multiple simultaneous refresh calls
let isRefreshing = false
let refreshPromise = null

const attemptTokenRefresh = async () => {
    // If a refresh is already in progress, wait for it
    if (isRefreshing) {
        return refreshPromise
    }

    isRefreshing = true
    refreshPromise = (async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error('Refresh failed')
            }

            const data = await res.json()
            localStorage.setItem('accessToken', data.accessToken)
            return true
        }
        catch {
            // Refresh failed — clear auth state
            localStorage.removeItem('accessToken')
            window.dispatchEvent(new Event('auth:logout'))
            return false
        }
        finally {
            isRefreshing = false
            refreshPromise = null
        }
    })()

    return refreshPromise
}

const fetchWrapper = async (endpoint, method = 'GET', body = null, auth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    if (auth) {
        const token = localStorage.getItem('accessToken')
        if (token) headers['Authorization'] = `Bearer ${token}`
    }

    const options = {
        method,
        headers,
        credentials: 'include'
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options)

        // If 401 on an authenticated request, try to refresh the token
        if (res.status === 401 && auth) {
            const refreshed = await attemptTokenRefresh()

            if (refreshed) {
                // Retry the original request with the new access token
                const newToken = localStorage.getItem('accessToken')
                if (newToken) {
                    options.headers['Authorization'] = `Bearer ${newToken}`
                }

                const retryRes = await fetch(`${BASE_URL}${endpoint}`, options)
                const retryData = await retryRes.json()

                if (!retryRes.ok) {
                    throw new Error(retryData?.msg || "API Error")
                }

                return {
                    status: retryRes.status,
                    data: retryData
                }
            }

            // Refresh failed — return the original 401
            const data = await res.json()
            return {
                status: res.status,
                data: data
            }
        }

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data?.msg || "API Error")
        }

        return {
            status: res.status,
            data: data
        }
    }
    catch (error) {
        return {
            status: null,
            data: { msg: error.message || "Server down or unreachable. Please try again later" }
        }
    }
}

export default fetchWrapper
