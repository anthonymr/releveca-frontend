import { Service, authorization } from '/src/services/Service'

const resource = 'suppliers'

const SupplierService = {
  getSuppliers(token) {
    return Service.get(resource, authorization(token));
  },
}

export default SupplierService;