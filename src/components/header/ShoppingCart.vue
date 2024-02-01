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
          :virtualScrollerOptions="{ itemSize: 38 }"
          :style="{ width: '100%' }"
        />        
      </div>

      <div class="flex mb-3" v-if="!isEmpty" >
        <Dropdown
          v-model="selectedPaimentCondition"
          :options="paymentCondition.conditions"
          optionLabel="code"
          placeholder="Condición de pago"
          :style="{ width: '50%' }"
          class="mr-2"
        />
  
        <div class="flex align-items-center">
          <Checkbox v-model="selectedTaxPayer" inputId="taxPayer" name="TaxPayer" :binary="true"  />
          <label for="taxPayer" class="ml-2"> Impuesto? </label>
        </div>
      </div>
  

      <DataTable :value="cart.items" size="small">
        <Column field="count" header="Qty" />
        <Column field="name" header="Artículo"/>
        <Column field="price" header="Precio">
          <template #body="{ data }">
            {{ defaultCurrency.code }} {{ itemTotalPrice(data).toFixed(2) }}
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

        <ColumnGroup type="footer">
          <Row>
            <Column footer="Sub-total:" :colspan="2" footerStyle="text-align:right" />
            <Column :colspan="2">
              <template #footer>
                {{ defaultCurrency.code }} {{ total.toFixed(2) }}
              </template>
            </Column>
          </Row>
          <Row>
            <Column footer="Impuesto:" :colspan="2" footerStyle="text-align:right" />
            <Column :colspan="2">
              <template #footer>
                {{ defaultCurrency.code }} {{ taxes.toFixed(2) }}%
              </template>
            </Column>
          </Row>
          <Row>
            <Column footer="Total:" :colspan="2" footerStyle="text-align:right" />
            <Column :colspan="2">
              <template #footer>
                {{ defaultCurrency.code }} {{ finalTotal.toFixed(2) }}
              </template>
            </Column>
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>

    <div class="flex mt-5" v-if="!isEmpty">
      <Button 
        :disabled="!selectedClient || !selectedPaimentCondition"
        class="mr-2"
        @click="processOrder()"
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
  import { useOrder } from '../../store/order';
  import { mapActions, mapState } from 'pinia';

  export default {
    emits: ['close'],

    data() {
      return {
        cart: useCart(),    
        clients: useClient(),
        session: useSession(),
        paymentCondition: usePaymentCondition(),

        selectedTaxPayer: this.selectedClient?.taxpayer || false,
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
      ...mapActions(usePaymentCondition, ['getPaymentConditions']),
      ...mapActions(useOrder, ['createOrder']),

      itemTotalPrice(item) {
        return (item.price * item.count);
      },

      async processOrder() {
        const result = await this.createOrder({ 
          client: this.selectedClient,
          paymentCondition: this.selectedPaimentCondition,
          subTotal: parseFloat(this.total),
          taxes: this.taxes,
          total: parseFloat(this.finalTotal),
          items: this.cart.items,
          currency: this.defaultCurrency
        });

        if(result){
          this.cart.clear();
          this.selectedClient = '';
          this.selectedPaimentCondition = '';          
          this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Pedido procesado correctamente' });
          this.$emit('close');
        } else {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al procesar el pedido' });
        }
      }
    },

    computed: {
      ...mapState(useCart, ['isEmpty', 'total']),
      ...mapState(useSession, ['defaultCurrency']),

      taxes() {
        return this.selectedTaxPayer ? 16 : 0;
      },

      finalTotal() {
        return this.total + (this.total * this.taxes / 100); 
      }
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