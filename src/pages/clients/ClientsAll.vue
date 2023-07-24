<template>
  <base-search @search="searchClients"/>
  <base-pagination :data="clientStore.pagination" @changePage="toPage">
    <base-table :config="clientStore.clientTable" :data="clientStore.clients"/>
  </base-pagination>
</template>

<script>
  import { useClient } from '../../store/client';
  import { mapActions } from 'pinia';

  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      BaseSearch
    },
    data() {
      return {
        clientStore: useClient(),
      }
    },

    mounted() {
      this.getClients();
    },

    methods: {
      ...mapActions(useClient, ['getClients', 'toPage', 'searchClients']),
    }
  }
</script>
