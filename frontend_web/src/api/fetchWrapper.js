const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchWrapper = async (endpoint, method = 'GET', body = null, auth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    if (auth) {
        const token = localStorage.getItem('token')
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
            data: { msg: "Server down or unreachable. Please try again later" }
        }
    }
}

export default fetchWrapper
