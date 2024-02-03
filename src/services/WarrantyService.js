import { Service, authorization } from '/src/services/Service';

const resource = 'warranties';

const WarrantyService = {
    index: (token, filter='', complexFilter=null, globalFilter=null, globalFilterField=null) => {
        let from = complexFilter?.fromDate?.toISOString() || null;
        let to = complexFilter?.toDate?.toISOString() || null;
        let clientsIds = complexFilter?.selectedClients?.map(client => client.id) || null;
        let itemsIds = complexFilter?.selectedItems?.map(item => item.id) || null;

        let url = `${resource}?filter=${filter}`;

        if(from && to) url += `&from=${from}&to=${to}`;
        if(itemsIds) url += `&items=${itemsIds.join(',')}`;
        if(clientsIds) url += `&clients=${clientsIds.join(',')}`;
        if(globalFilter && globalFilterField) {
            url += `&global_filter=${globalFilter}`;
            url += `&global_filter_field=${globalFilterField}`;
        }

        return Service.get(url, authorization(token));
    },
    show: (token, id) => Service.get(`${resource}/${id}`, authorization(token)),
    create: (token, warranty) => Service.post(resource, {...warranty}, authorization(token)),
    destroy: (token, id) => Service.delete(`${resource}/${id}`, authorization(token)),
    update: (token, id, warranty) => Service.put(`${resource}/${id}`, {...warranty}, authorization(token)),
    groupedByItem: (token) => Service.get(`${resource}/grouped_by_item`, authorization(token)),
    groupedByClient: (token) => Service.get(`${resource}/grouped_by_client`, authorization(token)),
}

export default WarrantyService;
