<template>
  <main>
    <form @submit.prevent="login">
      <div class="form-line">
        <h1>Inicio de sesión</h1>
      </div>
      <div class="form-line">
        <label for="username">Username</label>
        <input type="text" autocomplete="username" v-model="username" />
      </div>
      <div class="form-line">
        <label for="password">Password</label>
        <input type="password" autocomplete="current-password" v-model="password" />
      </div>
      <div class="form-line">
        <button type="submit" class="btn primary">Login</button>
      </div>
      <div class="form-line">
        <router-link to="/register">Registrarse</router-link>
      </div>
    </form>
    <BaseAlert :errors="errors" />
  </main>  
</template>

<script>
  import { useSession } from '/src/store/session'
  import { mapActions } from 'pinia'

  export default {
    data() {
      return {
        username: '',
        password: '',
        errors: [],
      }
    },

    methods: {
      ... mapActions(useSession, ['fetchSessionToken', 'fetchSessionInfo']),

      checkFields() {
        const is_valid = this.username && this.password;
        if(!is_valid) this.errors = ['Username and password are required'];
        return is_valid;
      },

      async login() {
        if(!this.checkFields()) return;

        try {
          await this.fetchSessionToken(this.username, this.password);
          await this.fetchSessionInfo();
          this.$router.push('/corporation');
        } catch({ response }) {
          this.errors = response.data.errors;
        }    
      }
    }
  }
</script>