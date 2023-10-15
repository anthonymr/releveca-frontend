<template>
  <Timeline :value="steps" layout="horizontal" align="top">
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
        return this.approved ? 2 : 1;
      }
      if(data.item.label === 'Procesado') {
        if(this.status === 'creado' && this.approved) return 1;
        if(this.status === 'procesado') return 2;
        if(this.status === 'enviado') return 2;
        if(this.status === 'entregado') return 2;
        return 0;
      }
      if(data.item.label === 'Enviado') {
        if(this.status === 'procesado' && this.approved) return 1;
        if(this.status === 'enviado') return 2;
        if(this.status === 'entregado') return 2;
        return 0;
      }
      if(data.item.label === 'Entregado') {
        if(this.status === 'enviado' && this.approved) return 1;
        if(this.status === 'entregado') return 2;
        return 0;
      }
    }
  }
}
</script>