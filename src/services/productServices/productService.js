import { api } from '../apiService';

export default class ProductService {

    addProduct(product) {
        return api.post(`/Products/Add`, product)
    };

    getProducts(pageNumber) {
        return api.get(`/Products/GetAll/${pageNumber}`)
    };

    getProduct(id) {
        return api.get(`/Products/Get/${id}`)
    };

    updateProduct(product) {
        return api.put(`/Products/Update`, product)
    };

    deactivateProduct(id) {
        return api.get(`/Products/Deactivate/${id}`)
    };

    deleteProduct(id) {
        return api.delete(`/Products/Delete/${id}`)
    };

    //search request by azure elastic search
}