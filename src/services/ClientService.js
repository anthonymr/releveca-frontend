import { Service, authorization } from '/src/services/Service'

const resource = 'clients'

const ClientService = {
  getClients(token, page = null, filter = '') {
    if(page) return Service.get(`${resource}?page=${page}&filter=${filter}`, authorization(token));
    return Service.get(resource, authorization(token));
  }
}

export default ClientService;