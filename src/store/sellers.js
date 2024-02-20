import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import SellerService from '../services/SellerService';

export const useSeller = defineStore('seller-store', {
  state() {
    return {
      allSellers: { items: [] },
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async getAllSellers() {
      this.fetching = true;
      const { data } = await SellerService.getSellers(this.session.token);
      this.allSellers = { items: data.payload };
      this.fetching = false;
    },
  },
});