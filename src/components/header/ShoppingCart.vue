<template>
  <section class="card modal">
    <div class="no-found" v-if="isEmpty">El carrito está vacío</div>

    <div v-else class="list-container">
      <h4>Nuevo pedido</h4>
      <div class="items">
        <div v-for="item in cart.items">
          {{ item.count }} {{ item.name }}
        </div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn sm primary" @click="clear()"  v-if="!isEmpty">Nuevo pedido</button>
      <button class="btn sm" @click="clear()"  v-if="!isEmpty">Limpiar</button>
      <button class="btn sm" @click="$emit('close')">Cerrar</button>
    </div>
  </section>
</template>

<script>
  import { useCart } from '../../store/cart.js';
  import { mapActions, mapState } from 'pinia';

  export default {
    data() {
      return {
        cart: useCart(),      
      }
    },

    methods: {
      ...mapActions(useCart, ['clear']),
    },

    computed: {
      ...mapState(useCart, ['isEmpty']),
    }
  }
</script>

<style scoped>
  .card{
    top: 40px;
    right: 0px;
    width: 300px;
    height: auto;
    padding: 10px;
  }

  .card-footer {
    justify-content: flex-end;
  }

  .list-container {
    height: auto;
  }

  .items {
    margin: 10px 0 20px 0;
    height: auto;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

</style>