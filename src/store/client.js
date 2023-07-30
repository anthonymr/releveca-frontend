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
      currentPage: 0,
      rowsCount: 10,
      filter: '',
      session: useSession(),
      clientTable,
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

    async getAllClients() {
      this.fetching = true;
      const { data } = await ClientService.getClients(this.session.token);
      this.allClients = data.payload;
      this.fetching = false;
    },

    toPage(pagination){
      this.currentPage = pagination.page;
      this.rowsCount = pagination.rows;
      this.getClients()
    },

    async searchClients(filter) {
      console.log(filter)
      this.filter = filter;
      return await this.getClients();
    }
  }
});