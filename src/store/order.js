import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import OrderService from '../services/OrderService';

function buildOrder(order) {
  const order_details = order.items.map(item => ({
    item_id: item.id,
    currency_id: order.currency.id,
    qty: item.count,
  }));

  return {
    client_id: order.client.id,
    payment_condition_id: order.paymentCondition.id,
    sub_total: order.subTotal,
    taxes: order.taxes,
    total: order.total,
    currency_id: order.currency.id,
    order_details,
  }
}

export const useOrder = defineStore('order-store', {
  state() {
    return {
      orders: [],
      pendingOrders: [],
      debtOrders: [],
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async createOrder(order) {
      this.fetching = true;
      const { data } = await OrderService.createOrder(this.session.token, buildOrder(order));
      this.orders = data.payload || [];
      this.fetching = false;
      return 'success';
    },

    async getAllOrders() {
      this.fetching = true;
      const { data } = await OrderService.getAllOrders(this.session.token);
      this.orders = data.payload || [];
      this.fetching = false;
      return 'success';
    },

    async getPendingOrders() {
      this.fetching = true;
      const { data } = await OrderService.getPendingOrders(this.session.token);
      this.pendingOrders = data.payload || [];
      this.fetching = false;
      return 'success';
    },

    async getDebtOrders() {
      this.fetching = true;
      const { data } = await OrderService.getDebtOrders(this.session.token);
      this.debtOrders = data.payload || [];
      this.fetching = false;
      return 'success';
    },

    async approveOrder(id) {
      this.fetching = true;
      await OrderService.aproveOrder(this.session.token, id);
      this.fetching = false;
      return 'success';
    }
  }
});