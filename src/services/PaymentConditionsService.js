import { Service, authorization } from '/src/services/Service'

const resource = 'payment_conditions';

const PaymentConditionsService = {
  get(token) {
    return Service.get(resource, authorization(token));
  },
}

export default PaymentConditionsService;