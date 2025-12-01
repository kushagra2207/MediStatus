import fetchWrapper from "./fetchWrapper";

export const doctorLogin = (credentials) => fetchWrapper('/api/auth/doctor/login', 'POST', credentials, false)
export const doctorGetOtp = (email) => fetchWrapper('/api/auth/doctor/signup-getOtp', 'POST', email, false)
export const doctorVerifyOtp = (data) => fetchWrapper('/api/auth/doctor/signup-verifyOtp', 'POST', data, false)

export const getAllDoctors = () => fetchWrapper('/api/doctors', 'GET', null, false)
export const getDoctorByHospital = (hospitalId) => fetchWrapper(`/api/doctors/hospital/${hospitalId}`, 'GET', null, false)
export const getDoctorById = (id) => fetchWrapper(`/api/doctors/id/${id}`, 'GET', null, false)

export const addAvailability = (data) => fetchWrapper('/api/doctors/availability', 'POST', data)
export const editAvailability = (index, data) => fetchWrapper(`/api/doctors/availability/${index}`, 'PUT', data)
export const deleteAvailability = (index) => fetchWrapper(`/api/doctors/availability/${index}`, 'DELETE')