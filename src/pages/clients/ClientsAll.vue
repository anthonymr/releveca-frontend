<template>
  <base-search @search="searchClients"/>
  <Paginator
    :rows="10"
    :totalRecords="pagination.total_items"
    :rowsPerPageOptions="[10, 50, 100]"
    @page="toPage"
  />
  <base-table :config="clientTable" :data="clients"/>
</template>

<script>
  import { useClient } from '../../store/client';
  import { mapActions, mapState } from 'pinia';

  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      BaseSearch
    },

    mounted() {
      this.getClients(0);
    },

    methods: {
      ...mapActions(useClient, ['getClients', 'toPage', 'searchClients']),
    },

    computed: {
      ...mapState(useClient, ['pagination', 'clients', 'clientTable']),
    }
  }
</script>
