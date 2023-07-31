<template>
  <section class="card modal">
    <div class="no-found" v-if="isEmpty">El carrito está vacío</div>

    <div v-else class="list-container">
      <h4>Nuevo pedido</h4>

      <Dropdown v-model="selectedClient" editable :options="clients.allClients.items" optionLabel="name" placeholder="Cliente" filter class="w-full md:w-14rem" />

      <div class="items">
        <div class="item">
          <div class="count">Qty</div>
          <div class="name"><strong>Artículo</strong></div>
          <div class="price"><strong>precio</strong></div>
          <div class="action">
          </div>
        </div>

        <div v-for="item in cart.items" class="item">
          <div class="count">{{ item.count }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="price">{{ item.price }} {{defaultCurrency.code}}</div>
          <div class="action">
            <button class="btn sm">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
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
  import { useClient } from '../../store/client';
  import { useSession } from '../../store/session';
  import { mapActions, mapState } from 'pinia';

  export default {
    emits: ['close'],

    data() {
      return {
        cart: useCart(),    
        clients: useClient(),
        session: useSession(),

        selectedClient: '',
      }
    },

    mounted() {
      this.getAllClients();
    },

    methods: {
      ...mapActions(useCart, ['clear']),
      ...mapActions(useClient, ['getAllClients']),
    },

    computed: {
      ...mapState(useCart, ['isEmpty']),
      ...mapState(useSession, ['defaultCurrency'])
    }
  }
</script>

<style scoped>
  h4 {
    margin-bottom: 20px;
  }
  .card {
    top: 40px;
    right: 0px;
    width: 400px;
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

  .item {
    font-size: 11px;
    display: flex;
    gap: 5px;
    line-height: 30px;
  }

  .item .count {
    color: var(--primary);
    width: 30px;
    text-align: right;
    padding-right: 5px;
  }

  .item .price {
    width: 100px;
    text-align: right;
    padding-right: 5px;
  }

  .item .name {
    display: flex;
    align-items: center;
    width: calc(100% - 180px);
    height: 30px;
    line-height: 12px;
  }

</style>