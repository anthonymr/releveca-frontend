import { defineStore } from 'pinia';
import ItemService from '../services/ItemsService';

export const useItem = defineStore('items-store', {
  state() {
    return {
      items: [],
      allItems: [],
      pagination: {},
      fetching: false
    }
  },

  actions: {
    async getItems(token, page = null, count = null) {
      this.fetching = true;
      const { data } = await ItemService.getItems(token, page, count);

      if(page) {
        this.items = data.payload.items.map(item => ({...item, count: 1}));
        this.pagination = data.payload.pagination;
      } else {
        this.allItems = data.payload.map(item => ({...item, count: 1}));
      }

      this.fetching = false;
    }
  }
});