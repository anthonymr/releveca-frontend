import { Service, authorization } from '/src/services/Service'

const resource = 'clients'

const ClientService = {
  getClients(token) {
    return Service.get(resource, authorization(token));
  }
}

export default ClientService;