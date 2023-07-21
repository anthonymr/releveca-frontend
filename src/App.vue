<template>
  <top-navbar v-if="isValid"></top-navbar>
  <div v-if="isValid" class="main-page-separator"></div>
  <router-view></router-view>
</template>

<script>
  import TopNavbar from './components/header/TopNavbar.vue';

  export default {
    components: { TopNavbar },

    data() {
      return {
        nonHeaderRoutes: ['/', '/login', '/corporation']
      }
    },

    computed: {
      isValid(){
        return !this.nonHeaderRoutes.includes(this.$route.path);
      }
    }
  }
</script>
