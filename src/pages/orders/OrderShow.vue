<template>
  <div class="surface-section">
    <div class="font-medium text-3xl text-900">
      <span class="text-red-500 mr-2">#{{ order.id }}</span>
      <span class="mr-4">{{ order.client?.name }}</span>
      <Tag :value="getStatus(order)" :severity="getSeverity(order)" class="mr-2" />
      <Tag value="pendiente" severity="danger" v-if="order.balance" />
    </div>
    <Divider class="" />
    <div class="flex align-items-center text-700 flex-wrap">
        <div class="mr-5 flex align-items-center mt-3">
            <font-awesome-icon icon="user" class="mr-3" />
            <span class="mr-2">RIF:</span>
            <span class="font-light">{{ order.client?.rif }}</span>
        </div>
        <div class="mr-5 flex align-items-center mt-3">
            <font-awesome-icon icon="fa-map-pin" class="mr-3" />
            <span class="mr-2">Dirección:</span>
            <span class="font-light">{{ order.client?.address }}</span>
        </div>
        <div class="mr-5 flex align-items-center mt-3">
            <font-awesome-icon icon="fa-phone" class="mr-3" />
            <span class="mr-2">Teléfono:</span>
            <span class="font-light">{{ order.client?.phone }}</span>
        </div>
    </div>
  </div>
  <!--##############################-->
  <div class="flex">
    <div class="w-10 py-5 pr-6">
      <DataTable :value="order.order_details" size="small">
        <Column field="qty" header="Qty" style="width:50px" />
        <Column field="item.name" header="Artículo"/>
        <Column field="unit_price" header="Precio" style="width:200px">
          <template #body="{ data }">
            {{ order.currency?.code }} {{ data.unit_price }}
          </template>
        </Column>
        <Column field="total_price" header="Total" style="width:200px" >
          <template #body="{ data }">
            {{ order.currency?.code }} {{ data.total_price }}
          </template>
        </Column>

        <ColumnGroup type="footer">
          <Row>
            <Column :colspan="2" />
            <Column footer="Sub-total:" />
            <Column :colspan="1">
              <template #footer>
                {{ order.currency?.code }} {{ order.sub_total }}
              </template>
            </Column>
          </Row>
          <Row>
            <Column :colspan="2" />
            <Column footer="IVA:" />
            <Column :colspan="1">
              <template #footer>
                {{ order.currency?.code }} {{ order.taxes }}
              </template>
            </Column>
          </Row>
          <Row>
            <Column :colspan="2" />
            <Column footer="Total:" />
            <Column :colspan="1">
              <template #footer>
                {{ order.currency?.code }} {{ order.total }}
              </template>
            </Column>
          </Row>
        </ColumnGroup>
      </DataTable>

      <!-- ##################### -->
      <h3 class="my-5 text-gray-800 font-normal">Balance de pagos</h3>

      <DataTable :value="order.payments" size="small">
        <template #empty>
          <div class="text-center text-gray-500 m-2">
            No hay pagos registrados para esta orden
          </div>
        </template>

        <Column field="date" header="Fecha" style="width:150px" />
        <Column field="reference" header="Referencia" style="width:250px"/>
        <Column field="bank" header="Banco" style="width:250px"/>
        <Column field="note" header="Nota" />
        <Column field="amount" header="Monto" style="width:200px" >
          <template #body="{ data }">
            {{ order.currency?.code }} {{ data.total_price }}
          </template>
        </Column>

        <ColumnGroup type="footer">
          <Row>
            <Column :colspan="3" />
            <Column footer="Total pagado:" class="text-right pr-2" />
            <Column :colspan="1">
              <template #footer>
                {{ order.currency?.code }} 0.0
              </template>
            </Column>
          </Row>
          <Row>
            <Column :colspan="3" />
            <Column footer="Balance:" class="text-right pr-2" />
            <Column :colspan="1">
              <template #footer>
                <span :class=" order.balance ? 'text-red-500' : 'text-green-500'" >
                  {{ order.currency?.code }} {{ order.total }}
                </span>
              </template>
            </Column>
          </Row>
        </ColumnGroup>
      </DataTable>

      <!-- ##################### -->
      <h3 class="my-5 text-gray-800 font-normal">Historia del pedido</h3>

      <DataTable :value="order.histories" size="small">
        <template #empty>
          <div class="text-center text-gray-500 m-2">
            No hay movimientos en esta orden desde su creación el {{ order.created_at }}
          </div>
        </template>
        <Column field="from" header="Desde" style="width:250px" />
        <Column field="to" header="Hasta" style="width:250px"/>
        <Column field="created_at" header="Fecha" style="width:250px"/>
        <Column field="user.name" header="Por" />

        <ColumnGroup type="footer">
          <Row>
            <Column>
              <template #footer />
            </Column>
            <Column>
              <template #footer>
                creado
              </template>
            </Column>
            <Column>
              <template #footer>
                {{ order.created_at }}
              </template>
            </Column>
            <Column>
              <template #footer>
                {{ order.user?.name }}
              </template>
            </Column>
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
    <!--######################-->
    <!--RIGHT PANNEL-->
    <!--######################-->
    <div class="w-2 pr-4">
      <Button severity="success" outlined class="w-12" size="small">
        <font-awesome-icon icon="fa-check" class="mr-3" />
        Aprobar orden
      </Button>
      <Button severity="danger" outlined class="w-12 mt-2" size="small">
        <font-awesome-icon icon="fa-times" class="mr-3" />
        Cancelar orden
      </Button>
      <div class="flex gap-2">
        <Button severity="secondary" class="mt-2 w-12 flex flex-column gap-1" size="small">
          <font-awesome-icon icon="fa-backward" />
          Anterior
        </Button>
        <Button severity="secondary" class="mt-2 w-12 flex flex-column gap-1" size="small">
          <font-awesome-icon icon="fa-forward" />
          Siguiente
        </Button>
      </div>
      <Button severity="info" class="w-12 mt-2" size="small">
        <font-awesome-icon icon="fa-cash-register" class="mr-3" />
        Registrar pago
      </Button>

      <BaseTimeline class="w-12 mt-6 ml-6" :order="order" />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useOrder } from '../../store/order';
  import BaseTimeline from '../../components/base/BaseTimeline.vue';

  export default {
    name: 'OrderShow',

    components: {
      BaseTimeline,
    },

    data() {
      return {
        order: {},
      }
    },

    async created() {
      try {
        this.order = await this.getOrder(this.$route.params.id);
      } catch(error) {
        console.error(error);
      }
    },

    methods: {
      ... mapActions(useOrder, ['getOrder']),
      getSeverity(order) {
        if(!order.approved) return 'danger';
        else if(order.status === 'entregado') return 'success';
        else return 'warning';
      },

      getStatus(order) {
        return order.approved ? order.status : 'esperando aprobación';
      },
    },
  }
</script>