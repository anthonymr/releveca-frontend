<template>
  <section>
    <OrderList :orders="pendingOrders" @refresh="OrderList" v-if="pendingOrders.length" />
  </section>
</template>

<script>
  import { useOrder } from '../../store/order';
  import { mapActions, mapState } from 'pinia';
  import OrderList from '../../components/orders/OrderList.vue';

  export default {
    components: {
      OrderList,
    },

    created() {
      this.getPendingOrders();
    },

    computed: {
      ...mapState(useOrder, ['pendingOrders']),
    },

    methods: {
      ...mapActions(useOrder, ['getPendingOrders']),
    },
  }
</script>