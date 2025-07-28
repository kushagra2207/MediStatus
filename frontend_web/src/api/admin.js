import fetchWrapper from './fetchWrapper'

export const adminLogin = (credentials) => fetchWrapper('/api/auth/admin/login', 'POST', credentials, false)
export const adminSignup = (data) => fetchWrapper('/api/auth/admin/signup', 'POST', data, false)

export const getAdminById = (id) => fetchWrapper(`/api/admins/${id}`, 'GET', null, false);