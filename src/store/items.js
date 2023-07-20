import { defineStore } from 'pinia';
import ItemService from '../services/ItemsService';

export const useItem = defineStore('items-store', {
  state() {
    return {
      items: [],
      fetching: false
    }
  },

  actions: {
    async getItems(token) {
      this.fetching = true;
      const response = await ItemService.getItems(token);
      this.items = response.data.payload.map(item => ({...item, count: 1}));
      this.fetching = false;
    }
  }
});