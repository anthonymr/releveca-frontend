<template>
  <Breadcrumb :model="currentRouteNodes">
    <template #separator>></template>
  </Breadcrumb>
</template>

<script>
  export default {
    computed: {
      currentRouteNodes(){
        return this.$route.matched.map(node => ({
          label: node.name,
          to: node.path
        }));
      }
    }
  }
</script>

<style scoped>
  .p-breadcrumb {
    border: none;
    display: flex;
    justify-content: flex-end;
    font-size: small;
    background: transparent;
  }
</style>
