<template>
  <div class="current-route">
    <div v-for="node, index in currentRouteNodes">
      <router-link :to="node.path" class="link">{{node.name}}</router-link>
      <span v-if="index < currentRouteNodes.length - 1">></span>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentRouteNodes(){
        const nodes = this.$route.matched;

        return nodes.map(node => {
          return {
            name: node.name,
            path: node.path
          };
        });
      }
    }
  }
</script>

<style scoped>
.current-route {
  position: fixed;
  width: 100%;
  background-color: white;
  top: 50px;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  user-select: none;
}
.current-route span {
  margin: 0 10px;
}

.link,
.current-route span {
  color: var(--border-dark);
  font-weight: 300;
  font-size: 12px;
}

.link:hover {
  color: var(--primary);
}

.current-route .link:last-child {
  color: var(--font-dark);
  font-weight: 400;
}
</style>