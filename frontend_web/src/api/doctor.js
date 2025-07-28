import fetchWrapper from "./fetchWrapper";

export const doctorLogin = (credentials) => fetchWrapper('/api/auth/doctor/login', 'POST', credentials, false)
export const doctorSignup = (data) => fetchWrapper('/api/auth/doctor/signup', 'POST', data, false)

export const getAllDoctors = () => fetchWrapper('/api/doctors', 'GET', null, false)
export const getDoctorById = (id) => fetchWrapper(`/api/doctors/${id}`, 'GET', null, false)