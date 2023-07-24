import { Service, authorization } from '/src/services/Service'

const resource = 'items';

const ItemService = {
  getItems(token, page = null, count = null, filter = '') {
    if(page && count) return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
    if(page) return Service.get(`${resource}?page=${page}&filter=${filter}`, authorization(token));
    return Service.get(resource, authorization(token));
  },
}

export default ItemService;