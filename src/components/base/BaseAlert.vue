<template>
  <section class="alerts-wrapper">
    <TransitionGroup mode="out-in">
      <div class="alert danger" v-for="error in errors" :key="error">{{ error }}</div>
      <div class="alert info" v-for="info in infos" :key="info">{{ info }}</div>
      <div class="alert warning" v-for="warning in warnings" :key="warning">{{ warning }}</div>
      <div class="alert success" v-for="ok in oks" :key="ok">{{ ok }}</div>
    </TransitionGroup>
  </section>
</template>

<script>
  export default {
    props: {
      errors: {
        type: Array,
        default: () => [],
      },
      infos: {
        type: Array,
        default: () => [],
      },
      warnings: {
        type: Array,
        default: () => [],
      },
      oks: {
        type: Array,
        default: () => [],
      }
    }
  }
</script>
