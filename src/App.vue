<template>
  <toast />
  <top-navbar v-if="showHeader"></top-navbar>
  <ScrollPanel style="width: 100%; height: calc(100vh - 150px)">
    <router-view class="main-section"></router-view>
  </ScrollPanel>
</template>

<script>
  import TopNavbar from './components/header/TopNavbar.vue';

  export default {
    components: { TopNavbar },

    data() {
      return {
        nonHeaderRoutes: ['/login', '/corporation']
      }
    },

    computed: {
      showHeader(){
        return !this.nonHeaderRoutes.includes(this.$route.path);
      }
    }
  }
</script>

<style scoped>
  .main-section {
    padding: 0 30px;
  }
</style>
