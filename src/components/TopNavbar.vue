<template>
  <router-link to="/">Home</router-link>
  <current-user />
  <current-corporation />
</template>

<script>
  import CurrentUser from '../components/session/CurrentUser.vue';
  import CurrentCorporation from '../components/session/CurrentCorporation.vue';

  export default {
    components: {
      CurrentUser,
      CurrentCorporation
    }
  }
</script>