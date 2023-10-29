<template>
  <section class="p-2.5">
    <base-search @search="searchClients" placeholder="Buscar cliente"/>

    <DataTable :value="clientsTable" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="ID" style="width: 60px" />
      <Column field="name" header="Nombre" />
      <Column field="phone" header="Teléfono" style="width: 120px" />
      <Column field="email" header="Correo" style="width: 170px"/>
      <Column field="approval" header="Aprobado" style="width: 50px" >
        <template #body="{ data }">
          <i class="pi" :class="{ 'pi-check-circle text-green-500': data.approval, 'pi-times-circle text-red-400': !data.approval }"></i>
          <font-awesome-icon icon="circle-check" v-if="data.approval" color="rgb(34, 197, 94)"/>
          <font-awesome-icon icon="circle-xmark" v-else color="rgb(239, 68, 68)" />
        </template>
      </Column>
      <Column field="status" header="Estado" style="width: 50px">
        <template #body="{ data }">
          <Tag :value="getStatus(data)" :severity="getSeverity(data.status)" />
        </template>
      </Column>
      <Column style="width: 50px">
        <template  #body="{ data }">
          <Button @click="toClient(data)">Ver</Button>
        </template>
      </Column>
    </DataTable>

    <Paginator
      :rows="10"
      :totalRecords="pagination.total_items"
      :rowsPerPageOptions="[10, 50, 100]"
      @page="toPage"
    />
  </section>
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
      this.reset();
    },

    methods: {
      reset(){
        this.filter = '';
        this.getClients(0);
      },
      ...mapActions(useClient, ['getClients', 'toPage', 'searchClients']),
      getStatus(data) {
        return data.status === 'enabled' ? 'activo' : 'inactivo';
      },
      getApproval(data) {
        return data.approval ? 'si' : 'no';
      },
      getSeverity(value) {
        if(value === 'enabled') return 'success';
        if(value === true) return 'success';
        return 'danger';
      },
      toClient(data) {
        this.$router.push('/clients/' + data.id);
      },
    },

    computed: {
      ...mapState(useClient, ['pagination', 'clients', 'clientsTable', 'filter']),
    },
  }
</script>
