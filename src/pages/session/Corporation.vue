<template>
  <section class="flex justify-content-center p-fluid h-screen align-items-center">
    <form>
      <h1>Seleccione una corporación</h1>
        <Button 
          v-for="corp in corporation.corporations"
          @click="setCorporation(corp)"
          :label="corp.name"
          class="mt-2"
        />
    </form>
  </section>  
</template>

<script>
import { useCorporation } from '../../store/corporation';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      corporation: useCorporation(),
    }
  },

  mounted() {
    this.fetchCorporations();
  },

  methods: {
    ...mapActions(useCorporation, ['fetchCorporations', 'setCorporation']),
  },
}
</script>

<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 20px;
  }

  li {
    width: 100%;
    text-align: center;
  }
</style>