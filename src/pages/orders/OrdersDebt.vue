<template>
  <section>
    <OrderList :orders="debtOrders" @refresh="getDebtOrders"  v-if="debtOrders.length" />
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
      this.getDebtOrders();
    },

    computed: {
      ...mapState(useOrder, ['debtOrders']),
    },

    methods: {
      ...mapActions(useOrder, ['getDebtOrders']),
    },
  }
</script>