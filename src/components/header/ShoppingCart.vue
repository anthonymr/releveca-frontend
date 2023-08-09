<template>
  <section class="card modal">
    <div class="flex justify-content-center" v-if="isEmpty">
      <InlineMessage severity="info">No hay artículos que mostrar</InlineMessage>
    </div>

    <div v-else class="list-container">
      <div class="field">
        <Dropdown
          v-model="selectedClient"
          editable :options="clients.allClients.items"
          optionLabel="name"
          placeholder="Cliente"
          filter
          :style="{ width: '100%' }"
        />        
      </div>

      <DataTable :value="cart.items" size="small">
        <Column field="count" header="Qty" />
        <Column field="name" header="Artículo"/>
        <Column field="price" header="Precio">
          <template #body="{ data }">
            {{ defaultCurrency.code }} {{ data.price }}
          </template>
        </Column>
        <Column>
          <template #body="{ data }">
            <Button class="p-button-rounded p-button-danger p-button-text" 
                    @click="cart.removeItem(data)" >
                    <font-awesome-icon icon="square-minus" />
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="flex mt-5" v-if="!isEmpty">
      <Dropdown
        v-model="selectedPaimentCondition"
        :options="paymentCondition.conditions"
        optionLabel="code"
        placeholder="Condición de pago"
        :style="{ width: '35%' }"
        class="mr-2"
      />
      <Button 
        :disabled="!selectedClient || !selectedPaimentCondition"
        class="mr-2"
      >
        Procesar pedido
      </Button>
      <Button @click="cart.clear()">Limpiar</Button>
    </div>
  </section>
</template>

<script>
  import { useCart } from '../../store/cart.js';
  import { useClient } from '../../store/client';
  import { useSession } from '../../store/session';
  import { usePaymentCondition } from '../../store/paymentCondition';
  import { mapActions, mapState } from 'pinia';

  export default {
    data() {
      return {
        cart: useCart(),    
        clients: useClient(),
        session: useSession(),
        paymentCondition: usePaymentCondition(),

        selectedClient: '',
        selectedPaimentCondition: '',
      }
    },

    mounted() {
      this.getAllClients();
      this.getPaymentConditions();
    },

    methods: {
      ...mapActions(useCart, ['clear']),
      ...mapActions(useClient, ['getAllClients']),
      ...mapActions(usePaymentCondition, ['getPaymentConditions'])
    },

    computed: {
      ...mapState(useCart, ['isEmpty']),
      ...mapState(useSession, ['defaultCurrency'])
    }
  }
</script>

<style scoped>
 .p-datatable {
  font-size: 12px;
 }

 .p-inputtext {
  font-size: 12px;
 }
</style>