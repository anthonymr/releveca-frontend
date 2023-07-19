<template>
<ul class="main-menu">
  <li v-for="route in routes">
    <router-link :to="route.path">{{route.name}}</router-link>
    <div v-if="route.children.length">
      <ul class="sub-menu">
        <li v-for="child in route.children">
          <router-link :to="child.path">{{child.name}}</router-link>
        </li>
      </ul>
    </div>
  </li>
</ul>
</template>

<script>
  export default {
    methods: {
      filterRoutes(routes){
        return routes.filter(route => route.meta.displayOnHeader).map(route => {

          let children = []

          if(route.children?.length){
            children = this.filterRoutes(route.children);
          }

          return {
            name: route.name,
            path: route.path,
            children
          }
        });
      }
    },

    computed: {
      routes() {
        return this.filterRoutes(this.$router.options.routes);
      }
    }
  }
</script>

<style scoped>
  .main-menu{
    display: flex;
    widows: 100%;
  }

  .main-menu > li {
    margin: 10px 10px;
    padding: 5px;
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .main-menu > li:hover .sub-menu{
    display: block;
  }

  .sub-menu {
    display: none;
    position: absolute;
    width: max-content;
    padding: 5px;
    border: 1px solid var(--border-light);
    background-color: white;
  }

  .sub-menu > li {
    padding: 10px 10px;
    border-bottom: 1px solid var(--border-light);
    box-sizing: border-box;
  }

  .sub-menu > li:last-child {
    border-bottom: none;
  }

  .sub-menu > li:hover {
    background-color: var(--border-light);
  }
</style>