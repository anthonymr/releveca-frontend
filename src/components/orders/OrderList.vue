<template>
  <DataTable :value="orders">
    <Column field="id" header="ID" />
    <Column field="client.name" header="Cliente" />
    <Column header="Sub-total">
      <template #body="{ data }">
        {{ data.currency.code }} {{ data.sub_total }}
      </template>
    </Column>
    <Column header="Impuesto" >
      <template #body="{ data }">
        {{ data.taxes }}%
      </template>
    </Column>
    <Column header="Total">
      <template #body="{ data }">
        {{ data.currency.code }} {{ data.total }}
      </template>
    </Column>
    <Column header="Deuda">
      <template #body="{ data }">
        {{ data.currency.code }} {{ data.balance }}
      </template>
    </Column>
    <Column field="status" header="Estado" />

    <Column header="Aprobado" style="width: 50px" >
      <template #body="{ data }">
        <i class="pi" :class="{ 'pi-check-circle text-green-500': data.approval, 'pi-times-circle text-red-400': !data.approval }"></i>
        <font-awesome-icon icon="circle-check" v-if="data.approved" color="rgb(34, 197, 94)"/>
        <font-awesome-icon icon="circle-xmark" v-else color="rgb(239, 68, 68)" />
      </template>
    </Column>

    <Column field="status" header="Estado" style="width: 50px">
      <template #body="{ data }">
        <Tag :value="data.status" :severity="getSeverity(data.status)" />
      </template>
    </Column>

    <Column style="width: 50px">
      <template #body="{ data }">
        <Button size="small" text v-if="!data.approved" @click="approve(data)">
          <font-awesome-icon icon="check" />
        </Button>
      </template>
    </Column>

    <Column style="width: 50px">
      <template #body="{ data }">
        <Button size="small" text v-if="data.approved">
          <font-awesome-icon icon="chevron-left" />
        </Button>
      </template>
    </Column>

    <Column style="width: 50px">
      <template #body="{ data }">
        <Button size="small" text v-if="data.approved">
          <font-awesome-icon icon="chevron-right" />
        </Button>
      </template>
    </Column>

    <Column style="width: 50px">
      <template #body="{ data }">
        <Button size="small" text>
          <font-awesome-icon icon="up-right-from-square" />
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
 import { useOrder } from '../../store/order';
 import { mapActions } from 'pinia';

 export default {
  props: ['orders'],
  emits: ['refresh'],

  methods: {
    ...mapActions(useOrder, ['approveOrder']),

    async approve(order) {
      await this.approveOrder(order.id);
      this.$toast.add({
        severity: 'success',
        summary: 'Orden aprobada',
        detail: `La orden ${order.id} ha sido aprobada`,
        life: 2000,
      });
      this.$emit('refresh');
    },
  
    getSeverity(value) {
      switch(value){
        case 'creado':
          return 'default';
        case 'procesado':
          return 'warning';
        case 'enviado':
          return 'success';
        case 'entregado':
          return 'info';
        default:
          return 'danger';
      }
    },
  }
 }
</script>