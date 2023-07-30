<template>
  <base-search @search="searchClients"/>
  <Paginator
    :rows="10"
    :totalRecords="pagination.total_items"
    :rowsPerPageOptions="[10, 50, 100]"
    @page="toPage"
  />

  <DataTable :value="clientsTable" stripedRows tableStyle="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Nombre"></Column>
    <Column field="phone" header="Teléfono"></Column>
    <Column field="status" header="Estado"></Column>
    <Column field="email" header="Correo"></Column>
    <Column field="approval" header="Aprovado"></Column>
  </DataTable>
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
      ...mapState(useClient, ['pagination', 'clients', 'clientsTable']),
    }
  }
</script>
