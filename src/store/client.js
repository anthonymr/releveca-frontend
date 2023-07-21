import { defineStore } from 'pinia';
import ClientService from '../services/ClientService';

export const useClient = defineStore('clients-store', {
  state() {
    return {
      clients: [],
      allClients: [],
      pagination: {},
      fetching: false,
    }
  },

  actions: {
    async getClients(token, page = null) {
      this.fetching = true;
      const { data } = await ClientService.getClients(token, page);

      if(page) {
        console.log(data.payload)
        this.clients = data.payload.items;
        this.pagination = data.payload.pagination;
      } else {
        this.allClients = data.payload;
      }

      this.fetching = false;
    }
  }
});