import { Service, authorization } from '/src/services/Service';

const resource = 'orders';

const OrderService = {
  createOrder(token, order) {  
    return Service.post(resource, {...order}, authorization(token));
  }
}

export default OrderService;