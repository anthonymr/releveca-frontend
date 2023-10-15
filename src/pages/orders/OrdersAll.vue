<template>
  <section>
    <DataView :value="orders">
      <template #list="{data}">
          <div class="col-12">
              <div class="flex flex-column md:flex-row md:align-items-start gap-4 p-2">
                  <div class="flex flex-column sm:flex-row justify-content-between align-items-center md:align-items-start flex-1 gap-4 p-4">
                      <div class="flex flex-column align-items-center sm:align-items-start">
                          <div class="text-800 cursor-pointer"> {{data.client.name}} </div>
                          <span class="text-md text-800">Total: {{data.total}}{{data.currency.code}}</span>
                          <span class="text-xs text-600 mb-1">Deuda: {{data.balance}}{{data.currency.code}}</span>
                          <span class="text-xs text-600 mb-1">{{data.payment_condition.code}}</span>
                          <div class="row">
                            <Tag :value="data.payment_condition.code" class="mr-1"></Tag>
                            <Tag :value="getStatus(data)" :severity="getSeverity(data.approved)" class="mr-1"></Tag>
                          </div>
                      </div>
                      <div class="flex flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span class="text-md text-800">{{data.created_at}}</span>
                        <Button 
                          class="justify-content-center p-2" 
                          size="small"
                          v-if="!data.approved"
                          @click="approveOrder(data.id)"
                        >
                          Aprobar
                        </Button>
                        <div class="row">
                          <Button 
                          class="justify-content-center p-2 mr-1" 
                            severity="secondary"
                            size="small"
                            :disabled="!data.approved || data.status === 'creado'"
                            @click="previousStep(data.id)"
                          >
                            <font-awesome-icon icon="backward" />
                          </Button>
                          <Button 
                          class="justify-content-center p-2" 
                          severity="secondary"
                            size="small"
                            :disabled="!data.approved || data.status === 'entregado'"
                            @click="nextStep(data.id)"
                          >
                            <font-awesome-icon icon="forward" />
                          </Button>
                        </div>
                      </div>
                  </div>
                  <base-timeline :approved="data.approved" :status="data.status" />
              </div>
          </div>
      </template>
    </DataView>

    <div v-for="order in orders">
      <pre>{{order}}</pre>
    </div>
  </section>
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
      ...mapActions(useOrder, ['getOrders', 'approve', 'next', 'previous']),

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
      ...mapState(useOrder, ['orders']),
    },
  }

</script>