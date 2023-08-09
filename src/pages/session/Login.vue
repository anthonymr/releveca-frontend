<template>
  <section class="flex justify-content-center p-fluid h-screen align-items-center">
    <form @submit.prevent="login">
      <div class="field">
        <h1>Inicio de sesión</h1>
      </div>
      <div class="field">
        <InputText id="username" v-model="username" type="text" placeholder="Nombre de usuario" autofocus />
      </div>
      <div class="field">
        <InputText id="password" v-model="password" type="password" placeholder="Contraseña" />
      </div>
      <div class="field flex justify-content-center">
        <router-link to="/register">Registrarse</router-link>
      </div>
      <div class="field">
        <Button type="submit" label="Acceder" class="mt-2" />
      </div>
    </form>
  </section>  
</template>

<script>
  import { useSession } from '/src/store/session'
  import { mapActions } from 'pinia'

  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },

    methods: {
      ... mapActions(useSession, ['fetchSessionToken', 'fetchSessionInfo']),

      checkFields() {
        const is_valid = this.username && this.password;
        if(!is_valid) {
          this.$toast.add({severity:'error', summary: 'Faltan datos', detail:'Por favor, ingrese su usuario y contraseña', life: 3000});
        }
        return is_valid;
      },

      async login() {
        if(!this.checkFields()) return;

        try {
          await this.fetchSessionToken(this.username, this.password);
          await this.fetchSessionInfo();
          this.$router.push('/corporation');
        } catch({ response }) {
          this.$toast.add({severity:'error', summary: 'Fallido', detail:response.data.errors[0], life: 3000});
        }    
      }
    }
  }
</script>