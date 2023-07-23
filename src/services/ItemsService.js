import { Service, authorization } from '/src/services/Service'

const resource = 'items';

const ItemService = {
  getItems(token, page = null, count = null) {
    if(page && count) return Service.get(`${resource}?page=${page}&count=${count}`, authorization(token));
    if(page) return Service.get(`${resource}?page=${page}`, authorization(token));
    return Service.get(resource, authorization(token));
  },
}

export default ItemService;