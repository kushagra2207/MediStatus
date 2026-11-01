import fetchWrapper from './fetchWrapper'

export const authLogout = () => fetchWrapper('/api/auth/logout', 'POST', null, false)

