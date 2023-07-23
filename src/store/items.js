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
      session: useSession(),
    }
  },

  actions: {
    async getItems() {
      this.fetching = true;
      const { data } = await ItemService.getItems(this.session.token, this.currentPage, this.itemsCount);

      if(this.currentPage) {
        this.items = data.payload.items.map(item => ({...item, count: 1}));
        this.pagination = data.payload.pagination;
      } else {
        this.allItems = data.payload.map(item => ({...item, count: 1}));
      }

      this.fetching = false;
    },
    async toPage(page) {
      this.currentPage = page;
      this.getItems(this.session.token, page, this.itemsCount);
    }
  }
});