import { Service, authorization } from '/src/services/Service'

const resource = 'clients'

const ClientService = {
  getClients(token, page = 1) {
    return Service.get(`${resource}?page=${page}`, authorization(token));
  }
}

export default ClientService;