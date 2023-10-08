<template>
  <Breadcrumb :model="currentRouteNodes">
    <template #separator>></template>
  </Breadcrumb>
</template>

<script>
  export default {
    computed: {
      currentRouteNodes() {
        const routes = this.$route.matched.map(node => ({
          label: node.name,
          to: node.path
        }));

        if(this.$route.params?.id) {
          routes.push({
            label: this.$route.params?.id,
            to: this.$route.path
          });
        }

        return routes;
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
