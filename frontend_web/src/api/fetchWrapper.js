const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchWrapper = async (endpoint, method = 'GET', body = null, auth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    if (auth) {
        const token = sessionStorage.getItem('token')
        if (token) headers['Authorization'] = `Bearer ${token}`
    }

    const options = {
        method,
        headers
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, options)
        const data = await res.json()

        if (res.status === 401) {
            sessionStorage.removeItem("token")
            window.location.href = "/"
            throw new Error("Session expired. Please log in again.")
        }


        if (!res.ok) {
            throw new Error(data?.msg || "API Error")
        }

        return data
    }
    catch (error) {
        throw error
    }
}

export default fetchWrapper
