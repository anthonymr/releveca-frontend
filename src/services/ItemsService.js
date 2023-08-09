import { Service, authorization } from '/src/services/Service';

const resource = 'items';

const ItemService = {
  getItems(token, page = 0, count = 10, filter = '') {
    return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
  },
}

export default ItemService;