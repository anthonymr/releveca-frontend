<template>
  <BaseSearch @search="searchOrders" placeholder="Buscar pedidos"/>

  <DataTable :value="ordersTable" stripedRows tableStyle="min-width: 50rem">
    <Column field="id" header="ID" style="width: 60px" />
    <Column field="name" header="Nombre" />
    <Column field="paymentCondition" header="Condición" style="width:150px">
      <template #body="{ data }">
        <Tag :value="data.paymentCondition" severity="info" />
      </template>
    </Column>
    <Column field="total" header="Total"  style="width:150px">
      <template #body="{ data }">
        {{ data.currency }} {{ data.total }}
      </template>
    </Column>
    <Column field="balance" header="Balance" style="width:150px">
      <template #body="{ data }">
        <span :class="{'text-red-400': data.balance > 0 }">
          {{ data.currency }} {{ data.balance }}
        </span>
      </template>
    </Column>
    <Column header="Fechas" style="width:280px">
      <template #body="{ data }">
        <div class="text-xs">
          <div>
            <span class="mr-1 text-gray-500">Creado el:</span> {{ data.date }}
          </div>
          <div>
            <span class="mr-1 text-gray-500">Último pago:</span> {{ data.lastPayment || '-' }}
          </div>
        </div>
      </template>
    </Column>
    <Column field="status" header="Estado" style="width: 180px">
      <template #body="{ data }">
        <Tag :value="getStatus(data)" :severity="getSeverity(data.status)" />
      </template>
    </Column>
    <Column style="width: 120px">
      <template  #body="{ data }">
        <Button class="px-2 py-2 mr-2" severity="secondary">
          <font-awesome-icon icon="cash-register" />
        </Button>
        <Button @click="toOrder(data)" class="px-2 py-2" severity="info">
          <font-awesome-icon icon="eye" />
        </Button>
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
  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      BaseTimeline,
      BaseSearch,
    },

    mounted() {
      this.getOrders();
    },

    methods: {
      ...mapActions(useOrder, ['getOrders', 'approve', 'next', 'previous', 'searchOrders', 'toPage']),

      getSeverity(order) {
        if(!order.approved) return 'danger';
        else if(order.status === 'entregado') return 'success';
        else return 'warning';
      },

      getStatus(order) {
        return order.approved ? order.status : 'esperando aprobación';
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
      },

      toOrder(order) {
        this.$router.push(`${order.id}`);
      },
    },

    computed: {
      ...mapState(useOrder, ['orders', 'pagination', 'filter', 'ordersTable']),
    },
  }

</script>