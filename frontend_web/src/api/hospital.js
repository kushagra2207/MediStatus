import fetchWrapper from "./fetchWrapper";

export const getAllHospitals = () => fetchWrapper('/api/hospitals', 'GET', null, false)
export const addHospital = (hospitalData) => fetchWrapper('/api/hospitals', 'POST', hospitalData, false)