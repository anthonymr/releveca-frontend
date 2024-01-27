import { Service, authorization } from '/src/services/Service';

const resource = 'warranties';

const WarrantyService = {
    index: (token, filter='') => {
        return Service.get(`${resource}?filter=${filter}`, authorization(token));
    },
    show: (token, id) => Service.get(`${resource}/${id}`, authorization(token)),
    create: (token, warranty) => Service.post(resource, {...warranty}, authorization(token)),
    destroy: (token, id) => Service.delete(`${resource}/${id}`, authorization(token)),
    update: (token, id, warranty) => Service.put(`${resource}/${id}`, {...warranty}, authorization(token)),
    groupedByItem: (token) => Service.get(`${resource}/grouped_by_item`, authorization(token)),
    groupedByClient: (token) => Service.get(`${resource}/grouped_by_client`, authorization(token)),
}

export default WarrantyService;
