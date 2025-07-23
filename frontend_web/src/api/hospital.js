import fetchWrapper from "./fetchWrapper";

export const getAllHospitals = () => fetchWrapper('/hospitals', 'GET', null, false)
export const addHospital = (hospitalData) => fetchWrapper('/hospitals', 'POST', hospitalData, false)