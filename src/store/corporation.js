import { defineStore } from 'pinia'
import { useSession } from './session'
import CorporationService from '../services/CorporationService';

export const useCorporation = defineStore('corporation-store', {
  state: () => {
    return {
      corporations: [],
      fetching: false,
      session: useSession(),
    }
  },
  actions: {
    async fetchCorporations() {
      this.fetching = true;
      const response = await CorporationService.getCorporations(this.session.token);
      this.corporations = response.data.payload;
      this.fetching = false;
    },
    async setCorporation(id) {
      this.fetching = true;
      const response = await CorporationService.setCorporation(this.session.token, id);
      this.session.corporation = response.data.payload;
      this.fetching = false;
    }
  }
})
