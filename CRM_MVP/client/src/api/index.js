import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

const api_services = axios.create({
    baseURL: 'http://localhost:5000/api_services',
})
// :5000/api_services/ltv  
//:5000/api_services/linReg

// Node Web Server API
export const insertTransaction = payload            => api.post(`/transaction`, payload)
export const getAllTransactions = ()                => api.get(`/transactions`)
export const updateTransactionById = (id, payload)  => api.put(`/transaction/${id}`, payload)
export const deleteTransactionById = id             => api.delete(`/transaction/${id}`)
export const getTransactionById = id                => api.get(`/transaction/${id}`)
export const getTransactionByInvoiceNo = id  => api.get(`/transaction/invoiceNo/${id}`)
export const getAllCustomers = ()                   => api.get(`/customers`)
export const getAllOrders = ()                      => api.get(`/orders`)
export const getAllProducts = ()                    => api.get(`/products`)
export const getInfoBoxes = ()                      => api.get(`/infoBoxes`)
export const getMonthlyData = ()                    => api.get(`/monthlyData`)
export const getProductOverAlls = ()                => api.get(`/productOverAlls`)
//export const getAllMyDataset = () => api.get(`/dataset`)

// Flask Python Server API
export const getLTV = payload                       => api_services.post(`/ltv`, payload)
export const getLinearRegression = payload          => api_services.post(`/linReg`, payload)

const apis = {
    insertTransaction,
    getAllTransactions,
    updateTransactionById,
    deleteTransactionById,
    getTransactionById,
    getTransactionByInvoiceNo,
    getAllOrders,
    getAllProducts,
    getAllCustomers,
    getInfoBoxes,
    getMonthlyData,
    getProductOverAlls,
    //getMyDataset
    getLTV,
    getLinearRegression
}
export default apis