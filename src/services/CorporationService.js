import { Service, authorization } from '/src/services/Service'

const resource = 'corporation';

const CorporationService = {
  getCorporations(token) {
    return Service.get(resource, authorization(token));
  }
}

export default CorporationService;