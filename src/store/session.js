import { defineStore } from 'pinia'
import AuthenticationService from '../services/AuthenticationService';
import CorporationService from '../services/CorporationService';

export const useSession = defineStore('session-store', {
  state() {
    return {
      token: null,
      user: null,
      corporation: null,
      fetching: false
    }
  },
  actions: {
    async fetchSessionToken(username, password) {
      this.fetching = true;
      const response = await AuthenticationService.login(username, password);
      this.token = response.data.payload.token;
      this.fetching = false;
    },
    async fetchSessionInfo() {
      this.fetching = true;
      const response = await AuthenticationService.getSessionInfo(this.token);
      this.user = response.data.payload;
      this.fetching = false;
    },
    async setCorporation(token, id) {
      this.fetching = true;
      const response = await CorporationService.setCorporation(token, id);
      this.corporation = response.data.payload;
      this.fetching = false;
    }
  }
})