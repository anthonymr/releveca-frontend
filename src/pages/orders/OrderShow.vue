<template>
  {{ $router }}
</template>

<script>
  export default {
    mounted() {
      console.log(this.$router);
    }
  }
</script>