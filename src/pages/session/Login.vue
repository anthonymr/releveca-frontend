<template>
  <main>
    <form>
      <div class="form-line">
        <h1>Inicio de sesión</h1>
      </div>
      <div class="form-line">
        <label for="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div class="form-line">
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div class="form-line">
        <button type="submit" class="btn primary">Login</button>
      </div>
      <div class="form-line">
        <router-link to="/session/register">Registrarse</router-link>
      </div>
    </form>
  </main>  
</template>

<style scoped>

</style>