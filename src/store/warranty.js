import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import WarrantyService from '../services/WarrantyService';
import WarrantyStateService from '../services/WarrantyStateService';

export const useWarranty = defineStore('warranty-store', {
  state() {
    return {
      warranties: [],
      warrantyStates: [],

      fetchingWarranties: false,

      session: useSession(),
    }
  },

  actions: {
    async getWarranties(filter = null, complexFilter = null, globalFilter = null, globalFilterField = false, includeUpdatedAt = false) {
        this.fetchingWarranties = true;
        const { data } = await WarrantyService.index(this.session.token, filter, complexFilter, globalFilter, globalFilterField, includeUpdatedAt);
        this.warranties = data.payload || [];
        this.fetchingWarranties = false;
    },

    async getWarranty(id) {
        const { data } = await WarrantyService.show(this.session.token, id);
        return data;
    },

    async createWarranty(warranty) {
        const { data } = await WarrantyService.create(this.session.token, warranty);
        return data;
    },

    async deleteWarranty(id) {
        const { data } = await WarrantyService.destroy(this.session.token, id);
        return data;
    },

    async updateWarranty(id, warranty) {
        const { data } = await WarrantyService.update(this.session.token, id, warranty);
        return data;
    },

    async getWarrantyStates() {
        const { data } = await WarrantyStateService.index(this.session.token);
        this.warrantyStates = data.payload || [];
    },

    async createWarrantyState(warrantyState) {
        const { data } = await WarrantyStateService.create(this.session.token, warrantyState);
        return data;
    },

    async deleteWarrantyState(id) {
        const { data } = await WarrantyStateService.destroy(this.session.token, id);
        return data;
    },

    async groupedByClient() {
        const { data } = await WarrantyService.groupedByClient(this.session.token);
        return data;
    },

    async groupedByItem() {
        const { data } = await WarrantyService.groupedByItem(this.session.token);
        return data;
    },
  },
});