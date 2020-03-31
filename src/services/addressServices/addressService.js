import { api } from '../apiService';

export default class AddressService {

    addAddress(address) {
        return api.post(`/Address/Add`, address)
    };

    getAddresses() {
        return api.get(`/Address/GetAll`)
    };

    getUserAddresses() {
        return api.get(`/Address/GetAllWithOwner`)
    };

    getAddress(id) {
        return api.get(`/Address/Get/${id}`)
    };

    updateAddress(address) {
        return api.put(`/Address/Update`, address)
    };

    deleteAddress(id) {
        return api.delete(`/Address/Delete/${id}`)
    };

    //search request by azure elastic search
}