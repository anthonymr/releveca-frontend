import { Service, authorization } from '/src/services/Service'

const resource = 'clients'

const ClientService = {
  getClients(token, page = 0, count = 10,  filter = '') {
    return Service.get(`${resource}?page=${page}&count=${count}&filter=${filter}`, authorization(token));
  },
  getClient(token, id) {
    return Service.get(`${resource}/${id}`, authorization(token));
  },
  aproveClient(token, id) {
    return Service.patch(`${resource}/${id}/approval`, {
      approval: true
    }, authorization(token));
  },
  enableClient(token, id) {
    return Service.patch(`${resource}/${id}/status`, {
      status: 'enabled'
    }, authorization(token));
  },
  disableClient(token, id) {
    return Service.patch(`${resource}/${id}/status`, {
      status: 'disabled'
    }, authorization(token));
  },
  createClient(token, client) {
    const newClient = {
      ... client,
      code: client.rif.toUpperCase(),
      name: client.name.toUpperCase(),
      address: client.address.toUpperCase(),
      email: client.email.toLowerCase(),
      client_type: client.clientType,
      taxpayer: client.taxPayer === 'Si',
      country_id: client.country.id,
      status: 'enabled',
    }
    return Service.post(`${resource}`, newClient, authorization(token));
  },
  updateClient(token, oldData, newData) {
    if(!oldData.approval){
      const newClient = {
        ... newData,
        code: newData.rif.toUpperCase(),
        client_type: newData.clientType,
        name: newData.name.toUpperCase(),
        address: newData.address.toUpperCase(),
        taxpayer: newData.taxPayer === 'Si',
        email: newData.email.toLowerCase(),
        country_id: newData.country.id,
      }

      return Service.put(`${resource}/${oldData.id}`, newClient, authorization(token));
    }else{
      const newClient = {
        name: newData.name.toUpperCase(),
        phone: newData.phone,
        notes: newData.notes,
        address: newData.address.toUpperCase(),
        taxpayer: newData.taxPayer === 'Si',
        client_type: newData.clientType,
        email: newData.email.toLowerCase(),
      }
      
      return Service.patch(`${resource}/${oldData.id}`, newClient, authorization(token));
    }
  }
}

export default ClientService;