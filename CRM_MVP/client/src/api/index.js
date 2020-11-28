import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertTransaction = payload => api.post(`/transaction`, payload)
export const getAllTransactions = () => api.get(`/transactions`)
export const updateTransactionById = (id, payload) => api.put(`/transaction/${id}`, payload)
export const deleteTransactionById = id => api.delete(`/transaction/${id}`)
export const getTransactionById = id => api.get(`/transaction/${id}`)
export const getAllCustomers = () => api.get(`/customers`)
export const getAllOrders = () => api.get(`/orders`)
export const getAllProducts = () => api.get(`/products`)
export const getInfoBoxes = () => api.get(`/infoBoxes`)
export const getMonthlyData = () => api.get(`/monthlyData`)
export const getProductOverAlls = () => api.get(`/productOverAlls`)
//export const getAllMyDataset = () => api.get(`/dataset`)

const apis = {
    insertTransaction,
    getAllTransactions,
    updateTransactionById,
    deleteTransactionById,
    getTransactionById,
    getAllOrders,
    getAllProducts,
    getAllCustomers,
    getInfoBoxes,
    getMonthlyData,
    getProductOverAlls
    //getMyDataset

}

export default apis