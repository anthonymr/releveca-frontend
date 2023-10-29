import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import CountryService from '../services/CountriesService';

export const useCountry = defineStore('country-store', {
  state() {
    return {
      countries: [],
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async getCountries() {
      this.fetching = true;
      
      const { data } = await CountryService.getCountries(this.session.token);
      this.countries = data.payload || [];

      this.fetching = false;
    }
  }
});
