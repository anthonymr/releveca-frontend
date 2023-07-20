import { Service, authorization } from '/src/services/Service'

const resource = 'items';

const ItemService = {
  getItems(token) {
    return Service.get(resource, authorization(token));
  },
}

export default ItemService;