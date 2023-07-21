import { defineStore } from 'pinia';
import ClientService from '../services/ClientService';

export const useClient = defineStore('clients-store', {
  state() {
    return {
      clients: [],
      fetching: false,
      fetched: false,
    }
  },

  actions: {
    async getClients(token, page) {
      this.fetching = true;
      const response = await ClientService.getClients(token, page);
      this.clients = response.data.payload;
      this.fetching = false;
      this.fetched = true;
    }
  }
});