import fetchWrapper from './fetchWrapper'

export const getAllMedicines = () => fetchWrapper('/api/medicines')
export const addMedicine = (data) => fetchWrapper('/api/medicines', 'POST', data)
export const updateMedicine = (id, data) => fetchWrapper(`/api/medicines/${id}`, 'PATCH', data)
export const deleteMedicine = (id) => fetchWrapper(`/api/medicines/${id}`, 'DELETE')