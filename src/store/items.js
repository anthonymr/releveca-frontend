import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import ItemService from '../services/ItemsService';

export const useItem = defineStore('items-store', {

  state() {
    return {
      items: [],
      allItems: [],
      pagination: {},
      fetching: false,
      currentPage: 0,
      rowsCount: 10,
      filter: '',
      session: useSession(),
    }
  },

  actions: {
    async getItems(page = null) {
      if(page !== null) this.currentPage = page;

      this.fetching = true;
      
      const { data } = await ItemService.getItems(this.session.token, this.currentPage, this.rowsCount, this.filter);
      this.items = data.payload.items?.map(item => ({...item, count: 1})) || [];
      this.pagination = data.payload.pagination || {};

      this.fetching = false;
    },
    
    toPage(pagination){
      this.currentPage = pagination.page;
      this.rowsCount = pagination.rows;
      this.getItems()
    },

    async searchItems(filter) {
      this.filter = filter;
      return await this.getItems();
    },

    async createItem(item) {
      const { data } = await ItemService.createItem(this.session.token, item);
      return data;
    }
  }
});