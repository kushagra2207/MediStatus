import fetchWrapper from "./fetchWrapper";

export const getAllDoctors = () => fetchWrapper('/doctors', 'GET', null, false)
export const getDoctorById = (id) => fetchWrapper(`/doctors/${id}`, 'GET', null, false)

export const doctorLogin = (credentials) => fetchWrapper('/doctor/login', 'POST', credentials, false)
export const doctorSignup = (data) => fetchWrapper('/doctor/signup', 'POST', data, false)