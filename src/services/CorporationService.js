import { Service, authorization } from '/src/services/Service'

const resource = 'corporations';

const CorporationService = {
  getCorporations(token) {
    return Service.get(resource, authorization(token));
  },
  setCorporation(token, id) {
    return Service.post(`${resource}/current`, { id }, authorization(token));
  }
}

export default CorporationService;