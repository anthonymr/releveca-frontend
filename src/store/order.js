import { defineStore } from 'pinia';
import { useSession } from '../store/session';
import OrderService from '../services/OrderService';

function buildOrder(order) {
  const order_details = order.items.map(item => ({
    qty: item.count,
    unit_price: item.price,
    total_price: item.price * item.count,
    item_id: item.id,
    currency_id: order.currency.id,
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
      pagination: {},
      currentPage: 0,
      rowsCount: 10,
      filter: '',
      fetching: false,
      session: useSession(),
    }
  },

  actions: {
    async getOrders(page = null) {
      if(page !== null) this.currentPage = page;

      this.fetching = true;
      
      const { data } = await OrderService.index(this.session.token, this.currentPage, this.rowsCount, this.filter);
      this.orders = data.payload.items?.map(item => ({...item, count: 1})) || [];
      this.pagination = data.payload.pagination || {};

      this.fetching = false;
    },
    async getOrder(id) {
      this.fetching = true;
      const { data } = await OrderService.show(this.session.token, id);
      this.fetching = false;
      return data.payload;
    },
    async createOrder(order) {
      this.fetching = true;
      const { data } = await OrderService.create(this.session.token, buildOrder(order));
      this.fetching = false;
      return data.payload;
    },
    async approve(id) {
      this.fetching = true;
      const { data } = await OrderService.change_approval(this.session.token, id);
      this.fetching = false;
      return data.payload;
    },
    async next(id) {
      this.fetching = true;
      const { data } = await OrderService.change_status_next(this.session.token, id);
      this.fetching = false;
      return data.payload;
    },
    async previous(id) {
      this.fetching = true;
      const { data } = await OrderService.change_status_previous(this.session.token, id);
      this.fetching = false;
      return data.payload;
    },
    toPage(pagination){
      this.currentPage = pagination.page;
      this.rowsCount = pagination.rows;
      this.getOrders()
    },
    async searchOrders(filter) {
      this.filter = filter;
      return await this.getOrders();
    },
  },
  getters: {
    ordersTable(){
      return this.orders.map(order => ({
        id: order.id,
        total: order.total,
        balance: order.balance,
        status: order.status,
        name: order.client.name,
        paymentCondition: order.payment_condition.name,
        name: order.client.name,
        code: order.client.code,
      }));
    }
  }
});