import fetchWrapper from './fetchWrapper'

export const adminLogin = (credentials) => fetchWrapper('/api/auth/admin/login', 'POST', credentials, false)
export const adminGetOtp = (email) => fetchWrapper('/api/auth/admin/signup-getOtp', 'POST', email, false)
export const adminVerifyOtp = (data) => fetchWrapper('/api/auth/admin/signup-verifyOtp', 'POST', data, false)

export const getAdminById = (id) => fetchWrapper(`/api/admins/${id}`, 'GET', null, false);