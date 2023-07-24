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
      currentPage: 1,
      itemsCount: 12,
      filter: '',
      session: useSession(),
    }
  },

  actions: {
    async getItems() {
      this.fetching = true;
      const { data } = await ItemService.getItems(this.session.token, this.currentPage, this.itemsCount, this.filter);

      if(data.payload.items) {
        this.items = data.payload.items.map(item => ({...item, count: 1}));
        this.pagination = data.payload.pagination;
      } else {
        this.items = [];
        this.pagination = {};
      }

      this.fetching = false;
    },
    
    toPage(page) {
      this.currentPage = page;
      this.getItems();
    },

    async searchItems(filter) {
      this.filter = filter;
      return await this.getItems();
    }
  }
});