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
import { useSession } from '../../store/session';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      session: useSession(),
      corporation: useCorporation(),
    }
  },

  mounted() {
    this.fetchCorporations(this.session.token);
  },

  methods: {
    ...mapActions(useSession, ['setCorporation']),
    ...mapActions(useCorporation, ['fetchCorporations']),
    async goToCorporation(corp) {
      await this.setCorporation(this.session.token, corp.id);
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