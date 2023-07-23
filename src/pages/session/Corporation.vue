<template>
  <main>
    <form>
      <div class="form-line">
        <h1>Seleccione una corporación</h1>
        <ul class="corporations">
          <li v-for="corp in corporation.corporations" 
              @click="goToCorporation(corp)"
              class="btn primary"
          >
            {{ corp.name }}
          </li>
        </ul>
      </div>
    </form>
  </main>  
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
    async goToCorporation(corp) {
      await this.setCorporation(corp.id);
      this.$router.push('/')
    }
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