<template>
  <Timeline :value="steps" layout="vertical">
    <template #content="data">{{ data.item.label }}</template>
    <template #marker="data">
      <font-awesome-icon v-if="iconToShow(data) === 0" icon="circle" size="2xl" style="color: #e3e3e3;" />
      <font-awesome-icon v-if="iconToShow(data) === 1" icon="clock" size="2xl" style="color: orange" />
      <font-awesome-icon v-if="iconToShow(data) === 2" icon="circle-check" size="2xl" style="color: #22C55E" />
    </template>
  </Timeline>
</template>

<script>
export default {
  props: ['approved', 'status'],
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      steps: [
        {
          label: 'Creado',
        },
        {
          label: 'Aprobado',
        },
        {
          label: 'Procesado',
        },
        {
          label: 'Enviado',
        },
        {
          label: 'Entregado',
        },
      ],
    }
  },

  methods: {
    // 0 = empty, 1 = waiting, 2 = done
    iconToShow(data) {
      if(data.item.label === 'Creado') {
        return 2;
      }
      if(data.item.label === 'Aprobado') {
        return this.order.approved ? 2 : 1;
      }
      if(data.item.label === 'Procesado') {
        if(this.order.status === 'creado' && this.order.approved) return 1;
        if(this.order.status === 'procesado') return 2;
        if(this.order.status === 'enviado') return 2;
        if(this.order.status === 'entregado') return 2;
        return 0;
      }
      if(data.item.label === 'Enviado') {
        if(this.order.status === 'procesado' && this.order.approved) return 1;
        if(this.order.status === 'enviado') return 2;
        if(this.order.status === 'entregado') return 2;
        return 0;
      }
      if(data.item.label === 'Entregado') {
        if(this.order.status === 'enviado' && this.order.approved) return 1;
        if(this.order.status === 'entregado') return 2;
        return 0;
      }
    }
  }
}
</script>