import { Service, authorization } from '/src/services/Service'

const resource = 'sellers'

const SellerService = {
  getSellers(token) {
    return Service.get(resource, authorization(token));
  },
}

export default SellerService;