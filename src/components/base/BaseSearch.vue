<template>
  <section class="big-search">
    <span class="p-input-icon-left full-size" >
      <font-awesome-icon icon="magnifying-glass" />
      <InputText
        v-model="filter"
        :placeholder="placeholder || 'Buscar'"
        @keyup.enter="$emit('search', filter)"
        class="full-size"
      />
    </span>
</section>
</template>

<script>
  export default {
    props: ['placeholder'],
    emits: ['search'],

    data() {
      return {
        filter: '',
      }
    }
  }
</script>

<style scoped>
  .full-size {
    width: 100%;
  }
</style>