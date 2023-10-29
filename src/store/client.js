import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import ClientService from '../services/ClientService';

export const useClient = defineStore('clients-store', {
  state() {
    return {
      clients: [],
      client: null,
      allClients: [],
      pagination: {},
      fetching: false,
      currentPage: 0,
      rowsCount: 10,
      filter: '',
      session: useSession(),
    }
  },

  actions: {
    async getClients(page = null) {
      if(page !== null) this.currentPage = page;

      this.fetching = true;
      const { data } = await ClientService.getClients(this.session.token, this.currentPage, this.rowsCount, this.filter);

      this.clients = data.payload.items || [];
      this.pagination = data.payload.pagination || {};

      this.fetching = false;
    },

    async getClient(id) {
      this.fetching = true;
      const { data } = await ClientService.getClient(this.session.token, id);
      this.client = data.payload;
      this.fetching = false;
    },

    async getAllClients() {
      this.fetching = true;
      const { data } = await ClientService.getClients(this.session.token);
      this.allClients = data.payload;
      this.fetching = false;
    },

    async aproveClient(id) {
      this.fetching = true;
      const { data } = await ClientService.aproveClient(this.session.token, id);
      this.fetching = false;
      return data;
    },

    async enableClient(id) {
      this.fetching = true;
      const { data } = await ClientService.enableClient(this.session.token, id);
      this.fetching = false;
      return data;
    },

    async disableClient(id) {
      this.fetching = true;
      const { data } = await ClientService.disableClient(this.session.token, id);
      this.fetching = false;
      return data;
    },

    async updateClient(oldData, newData) {
      this.fetching = true;
      const { data } = await ClientService.updateClient(this.session.token, oldData, newData);
      this.fetching = false;
      return data;
    },

    toPage(pagination){
      this.currentPage = pagination.page;
      this.rowsCount = pagination.rows;
      this.getClients()
    },

    async searchClients(filter) {
      this.filter = filter;
      return await this.getClients();
    },

    async createClient(client) {
      const { data } = await ClientService.createClient(this.session.token, client);
      return data;
    }
  },

  getters: {
    clientsTable(){
      return this.clients.map(client => ({
        id: client.id,
        name: client.name,
        phone: client.phone,
        status: client.status,
        email: client.email,
        approval: client.approval,
      }));
    }
  }
});