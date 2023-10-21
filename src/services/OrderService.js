import { Service, authorization } from '/src/services/Service';

const resource = 'orders';

const OrderService = {
  index: (token, page = 0, count = 10, filter = '') => {
    return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
  },
  show: (token, id) => Service.get(`${resource}/${id}`, authorization(token)),
  create: (token, order) => Service.post(resource, {...order}, authorization(token)),
  change_approval: (token, id) => Service.patch(`${resource}/${id}/approval`, {approved: true}, authorization(token)),
  change_status_next: (token, id) => Service.patch(`${resource}/${id}/status_next`, {}, authorization(token)),
  change_status_previous: (token, id) => Service.patch(`${resource}/${id}/status_previous`, {}, authorization(token)),
}

export default OrderService;