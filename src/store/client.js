import { defineStore } from 'pinia';
import ClientService from '../services/ClientService';

export const useClient = defineStore('clients-store', {
  state() {
    return {
      clients: [],
      fetching: false
    }
  },

  actions: {
    async getClients(token) {
      this.fetching = true;
      const response = await ClientService.getClients(token);
      this.clients = response.data.payload;
      this.fetching = false;
    }
  }
});