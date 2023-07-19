<template>
  <nav>
    <ul class="main-menu">
      <li v-for="route in routes">
        <router-link :to="route.path" class="link" :class="{active: isActiveRoute(route)}">
          {{route.name}} 
          <font-awesome-icon 
            icon="chevron-right" 
            class="icon"
            size="xs"
            v-if="route.children.length"
            />
        </router-link>
        <div v-if="route.children.length">
          <ul class="sub-menu">
            <li v-for="child in route.children">
              <router-link :to="`${route.path}/${child.path}`" class="link">
                {{child.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    methods: {
      isActiveRoute(route){
        if(route.path === '/'){
          return this.$route.path === route.path;
        }

        return this.$route.path.startsWith(route.path);
      },
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

  .main-menu > li:hover .sub-menu {
    visibility: visible;
    height: auto;
    opacity: 1;
  }

  .main-menu > li:hover .icon {
    rotate: 90deg;
  }

  .sub-menu {
    visibility: hidden;
    height: 0;
    opacity: 0;
    position: absolute;
    width: max-content;
    padding: 5px;
    border: 1px solid var(--border-light);
    background-color: white;
    transition: opacity .3s ease;
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

  .link {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--font-dark);
    font-weight: 300;
  }

  .icon {
    transition: rotate .2s ease;
    margin-left: 5px;
  }

  .active {
    color: var(--primary);
  }

</style>