<template>
  <top-navbar v-if="isValid"></top-navbar>
  <div class="main-page-separator"></div>
  <router-view></router-view>
</template>

<script>
  export default {
    data() {
      return {
        nonHeaderRoutes: ['/', '/corporations']
      }
    },

    computed: {
      isValid(){
        return !this.nonHeaderRoutes.includes(this.$route.path);
      }
    }
  }
</script>
