import { Service, authorization } from '/src/services/Service';

const resource = 'warranty_states';

const WarrantyStateService = {
    index: (token, page = 0, count = 10, filter = '') => {
        return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
    },
    create: (token, warrantyState) => Service.post(resource, {...warrantyState}, authorization(token)),
    destroy: (token, id) => Service.delete(`${resource}/${id}`, authorization(token)),
}

export default WarrantyStateService;
