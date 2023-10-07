import { Service, authorization } from '/src/services/Service';

const resource = 'items';

const ItemService = {
  getItems(token, page = 0, count = 10, filter = '') {
    return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
  },
  createItem(token, item) {
    const newItem = {
      ... item,
      code: item.code.toUpperCase(),
      name: item.name.toUpperCase(),
      model: item.model.toUpperCase(),
      unit_id: item.unit.id,
    }
    return Service.post(`${resource}`, newItem, authorization(token));
  }
}

export default ItemService;