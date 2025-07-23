import fetchWrapper from './fetchWrapper'

export const adminLogin = (credentials) => fetchWrapper('/admin/login', 'POST', credentials, false)
export const adminSignup = (data) => fetchWrapper('/admin/signup', 'POST', data, false)

export const getAdminById = (id) => fetchWrapper(`/admins/${id}`, 'GET', null, false);