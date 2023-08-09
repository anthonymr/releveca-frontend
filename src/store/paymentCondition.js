import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import PaymentConditionService from '../services/PaymentConditionsService';

export const usePaymentCondition = defineStore('payment-condition-store', {
  state() {
    return {
      conditions: [],
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async getPaymentConditions() {
      this.fetching = true;
      
      const { data } = await PaymentConditionService.get(this.session.token);
      console.log(data);
      this.conditions = data.payload || [];

      this.fetching = false;
    }
  }
});
