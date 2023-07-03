<template>
  <main>
    <form>
      <div class="form-line">
        <h1>Registro de usuario</h1>
      </div>
      <div class="form-line">
        <label for="name">Nombre</label>
        <input type="text" id="name" />
      </div>
      <div class="form-line">
        <label for="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div class="form-line">
        <label for="password">Contraseña</label>
        <input type="password" id="password" />
      </div>
      <div class="form-line">
        <label for="password">Confirmar contraseña</label>
        <input type="password" id="password" />
      </div>
      <div class="form-line">
        <button type="submit" class="btn primary">Registrarse</button>
      </div>
      <div class="form-line">
        <router-link to="/login">Iniciar sesión</router-link>
      </div>
    </form>
  </main>  
</template>

<style scoped>

</style>