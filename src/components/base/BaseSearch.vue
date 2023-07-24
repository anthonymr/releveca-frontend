<template>
  <section class="big-search">
    <input
      type="text"
      placeholder="Buscar artículo"
      id="search"
      v-model="filter"
      @keyup.enter="$emit('search', filter)"
    />
    <label for="search">
      <font-awesome-icon icon="magnifying-glass" />
    </label>
</section>
</template>

<script>
  export default {
    emits: ['search'],

    data() {
      return {
        filter: '',
      }
    }
  }
</script>