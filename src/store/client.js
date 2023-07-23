import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import ClientService from '../services/ClientService';
import clientTable from './tablesConfig/clientTable'

export const useClient = defineStore('clients-store', {
  state() {
    return {
      clients: [],
      allClients: [],
      pagination: {},
      fetching: false,
      currentPage: 1,
      itemsCount: 10,
      session: useSession(),
      clientTable,
    }
  },

  actions: {
    async getClients() {
      this.fetching = true;
      const { data } = await ClientService.getClients(this.session.token, this.currentPage);

      if(this.currentPage) {
        this.clients = data.payload.items;
        this.pagination = data.payload.pagination;
      } else {
        this.allClients = data.payload;
      }

      this.fetching = false;
    },

    toPage(page){
      this.currentPage = page;
      this.getClients()
    }
  }
});