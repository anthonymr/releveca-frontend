import { Service, authorization } from '/src/services/Service';

const resource = 'items';

const ItemService = {
  getItems(token, page, count, filter = '') {
    let url = `${resource}?filter=${filter}`
    if(page != null) url += `&page=${page}`
    if(count) url += `&count=${count}`
    return Service.get(url, authorization(token));
  },

  getItem(token, id) {
    return Service.get(`${resource}/${id}`, authorization(token));
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
  },

  update: (token, id, item) => Service.put(`${resource}/${id}`, item, authorization(token), {
    'Content-Type': 'multipart/form-data',
}),
}

export default ItemService;