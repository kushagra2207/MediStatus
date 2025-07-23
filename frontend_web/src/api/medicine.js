import fetchWrapper from './fetchWrapper'

export const getAllMedicines = () => fetchWrapper('/medicines')
export const addMedicine = (data) => fetchWrapper('/medicines', 'POST', data)
export const updateMedicine = (id, data) => fetchWrapper(`/medicines/${id}`, 'PUT', data)
export const deleteMedicine = (id) => fetchWrapper(`/medicines/${id}`, 'DELETE')