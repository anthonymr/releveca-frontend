<template>
  <section>
    <base-pagination :data="clientStore.pagination" @changePage="toPage">
      <base-table :config="clientStore.clientTable" :data="clientStore.clients"/>
    </base-pagination>
  </section>
</template>

<script>
  import { useClient } from '../../store/client';
  import { mapActions } from 'pinia';

  export default {
    data() {
      return {
        clientStore: useClient(),
      }
    },

    mounted() {
      this.getClients();
    },

    methods: {
      ...mapActions(useClient, ['getClients', 'toPage']),
    }
  }
</script>

<style scoped>
  section {
    padding: 30px;
  }
</style>