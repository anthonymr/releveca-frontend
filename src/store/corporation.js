import { defineStore } from 'pinia'
import CorporationService from '../services/CorporationService';

export const useCorporation = defineStore('corporation-store', {
  state: () => {
    return {
      corporations: [],
      fetching: false
    }
  },
  actions: {
    async fetchCorporations(token) {
      this.fetching = true;
      const response = await CorporationService.getCorporations(token);
      this.corporations = response.data.payload;
      this.fetching = false;
    },
  }
})
