import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import SupplierService from '../services/SupplierService';

export const useSupplier = defineStore('supplier-store', {
  state() {
    return {
      allSuppliers: { items: [] },
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async getAllSuppliers() {
      this.fetching = true;
      const { data } = await SupplierService.getSuppliers(this.session.token);
      this.allSuppliers = { items: data.payload };
      this.fetching = false;
    },
  },
});