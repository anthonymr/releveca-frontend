<template>
  <base-search @search="searchOrders"/>

  <DataTable :value="ordersTable" stripedRows tableStyle="min-width: 50rem">
    <Column field="id" header="ID" style="width: 60px" />
    <Column field="name" header="Nombre" />
    <Column field="status" header="Estado" style="width: 50px">
      <template #body="{ data }">
        <Tag :value="getStatus(data)" :severity="getSeverity(data.status)" />
      </template>
    </Column>
    <Column style="width: 50px">
      <template  #body="{ data }">
        <Button @click="toOrder(data)" class="px-2 py-1">Ver</Button>
      </template>
    </Column>
  </DataTable>

  <Paginator
    :rows="10"
    :totalRecords="pagination.total_items"
    :rowsPerPageOptions="[10, 50, 100]"
    @page="toPage"
  />
</template>

<script>
  import { useOrder } from '../../store/order';
  import { mapState, mapActions } from 'pinia';
  import BaseTimeline from '../../components/base/BaseTimeline.vue';

  export default {
    components: {
      BaseTimeline,
    },
    mounted() {
      this.getOrders();
    },

    methods: {
      ...mapActions(useOrder, ['getOrders', 'approve', 'next', 'previous', 'searchOrders']),

      getSeverity(value) {
        if(value === 'enabled') return 'success';
        if(value === true) return 'success';
        return 'danger';
      },

      getStatus(data) {
        return data.approved ? 'aprobado' : 'esperando aprobación';
      },

      async nextStep(id){
        if(confirm('¿Está seguro de avanzar esta orden?')){
          try {
            await this.next(id);
            this.getOrders();
            this.$toast.add({severity:'success', summary: 'Orden avanzada', detail: 'La orden ha sido avanzada con éxito', life: 3000});
          } catch (error) {
            console.error(error);
            this.$toast.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al avanzar la orden', life: 3000});
          }
        }
      },

      async previousStep(id){
        if(confirm('¿Está seguro de retroceder esta orden?')){
          try {
            await this.previous(id);
            this.getOrders();
            this.$toast.add({severity:'success', summary: 'Orden retrocedida', detail: 'La orden ha sido retrocedida con éxito', life: 3000});
          } catch (error) {
            console.error(error);
            this.$toast.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al retroceder la orden', life: 3000});
          }
        }
      },

      async approveOrder(id) {
        if(confirm('¿Está seguro de aprobar esta orden?')){
          try {
            await this.approve(id);
            this.getOrders();
            this.$toast.add({severity:'success', summary: 'Orden aprobada', detail: 'La orden ha sido aprobada con éxito', life: 3000});
          } catch (error) {
            console.error(error);
            this.$toast.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al aprobar la orden', life: 3000});
          }
        }
      }
    },

    computed: {
      ...mapState(useOrder, ['orders', 'pagination', 'filter', 'ordersTable']),
    },
  }

</script>