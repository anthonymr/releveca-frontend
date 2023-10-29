import { Service, authorization } from '/src/services/Service';

const resource = 'orders';

const OrderService = {
  createOrder(token, order) {  
    return Service.post(resource, {...order}, authorization(token));
  },

  getAllOrders(token) {
    return Service.get(resource, authorization(token));
  },

  getPendingOrders(token) {
    return Service.get(`${resource}/pending`, authorization(token));
  },

  getDebtOrders(token) {
    return Service.get(`${resource}/with_debt`, authorization(token));
  },

  aproveOrder(token, id) {
    return Service.patch(`${resource}/${id}/approval`, { approved: true }, authorization(token));
  }
}

export default OrderService;