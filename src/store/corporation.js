import { defineStore } from 'pinia'
import { useSession } from './session'
import CorporationService from '../services/CorporationService';

export const useCorporation = defineStore('corporation-store', {
  state: () => {
    return {
      corporations: [],
      fetching: false,
      session: useSession(),
      baseCurrency: null,
      units: [],
    }
  },
  actions: {
    async fetchCorporations() {
      this.fetching = true;
      const response = await CorporationService.getCorporations(this.session.token);
      this.corporations = response.data.payload;
      this.fetching = false;
    },
    async setCorporation(corp) {
      this.fetching = true;
      const response = await CorporationService.setCorporation(this.session.token, corp.id);
      this.session.corporation = response.data.payload;
      this.fetching = false;
      this.router.push('/');
    },
    async getBaseCurrency() {
      const response = await CorporationService.getBaseCurrency(this.session.token);
      this.baseCurrency = response.data.payload;
    },
    async getUnits() {
      const response = await CorporationService.getUnits(this.session.token);
      this.units = response.data.payload;
    }
  }
})
