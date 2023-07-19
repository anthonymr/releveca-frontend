<template>
  <header>
    <routes-tree />
    <div>
      <current-user class="username" />
      <current-corporation class="corporation" />
    </div>
  </header>
  <current-route />
</template>

<script>
  import CurrentUser from './../session/CurrentUser.vue';
  import CurrentCorporation from './../session/CurrentCorporation.vue';
  import RoutesTree from './RoutesTree.vue';
  import CurrentRoute from './CurrentRoute.vue';

  export default {
    components: {
      CurrentUser,
      CurrentCorporation,
      RoutesTree,
      CurrentRoute
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
  }

  header > div {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 5px;
    user-select: none;
  }

  .corporation {
    color: var(--border-dark);
    font-weight: 300;
    font-size: 12px;
    text-align: right;
    line-height: 12px;
  }

  .username {
    font-size: 16px;
    line-height: 19px;
  }
</style>