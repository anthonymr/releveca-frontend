<template>
  <section class="alerts-wrapper">
    <TransitionGroup>
      <div class="alert danger" v-for="error in innerErrors" :key="error">{{ error }}</div>
      <div class="alert info" v-for="info in innerInfos" :key="info">{{ info }}</div>
      <div class="alert warning" v-for="warning in innerWarnings" :key="warning">{{ warning }}</div>
      <div class="alert success" v-for="ok in innerOks" :key="ok">{{ ok }}</div>
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
    },

    data() {
      return {
        timeout: 3000,

        innerErrors: [],
        innerInfos: [],
        innerWarnings: [],
        innerOks: [],

        errorsTimeout: null,
        infosTimeout: null,
        warningsTimeout: null,
        oksTimeout: null,
      }
    },

    watch: {
      errors() {
        this.innerErrors = this.errors;
        if(this.errorsTimeout) clearTimeout(this.errorsTimeout);
        this.errorsTimeout = setTimeout(() => this.innerErrors = [], this.timeout);
      },
      infos() {
        this.innerInfos = this.infos;
        if(this.infosTimeout) clearTimeout(this.infosTimeout);
        this.infosTimeout = setTimeout(() => this.innerInfos = [], this.timeout);
      },
      warnings() {
        this.innerWarnings = this.warnings;
        if(this.warningsTimeout) clearTimeout(this.warningsTimeout);
        this.warningsTimeout = setTimeout(() => this.innerWarnings = [], this.timeout);
      },
      oks() {
        this.innerOks = this.oks;
        if(this.oksTimeout) clearTimeout(this.oksTimeout);
        this.oksTimeout = setTimeout(() => this.innerOks = [], this.timeout);
      }
    },
  }
</script>
