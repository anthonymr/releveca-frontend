<template>
  <main>
    <form>
      <div class="form-line">
        <h1>Seleccione una corporación</h1>
        <ul>
          <li v-for="corp in corporation.corporations" @click="goToCorporation(corp)">
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
      this.$router.push({ name: 'Home' })
    }
  },
}
</script>