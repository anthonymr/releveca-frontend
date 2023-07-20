<template>
  <header>
    <routes-tree />
    <div class="right">
      <div class="user">
        <current-user class="username" />
        <current-corporation class="corporation" />
      </div>
      <div class="icon cart" @click="isCartOpen = !isCartOpen">
        <font-awesome-icon icon="cart-shopping" />
        <div v-if="count" class="count">{{ count }}</div>
      </div>
      <div class="icon exit">
        <font-awesome-icon icon="power-off" />
      </div>
    </div>
  </header>
  <current-route />
  <shopping-cart v-if="isCartOpen" @close="isCartOpen = false" />
</template>

<script>
  import CurrentUser from './../session/CurrentUser.vue';
  import CurrentCorporation from './../session/CurrentCorporation.vue';
  import RoutesTree from './RoutesTree.vue';
  import CurrentRoute from './CurrentRoute.vue';
  import ShoppingCart from './ShoppingCart.vue';
  import { mapState } from 'pinia';
  import { useCart } from '../../store/cart';

  export default {
    components: {
      CurrentUser,
      CurrentCorporation,
      RoutesTree,
      CurrentRoute,
      ShoppingCart
    },

    data() {
      return {
        isCartOpen: false,
      }
    },

    computed: {
      ...mapState(useCart, ['count']),
    }
  }
</script>

<style scoped>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
  }

  .cart:deep(path) {
    color: var(--primary);
  }

  .exit:deep(path) {
    color: var(--border-dark);
  }

  .right {
    display: flex;
    padding-right: 10px;
  }

  .user,
  .icon {
    margin: 10px 5px;
    padding: 5px;
  }

  .icon {
    cursor: pointer;
    user-select: none;
  }

  .user {
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  .corporation {
    color: var(--border-dark);
    font-weight: 300;
    font-size: 12px;
    text-align: right;
    line-height: 12px;
  }

  .username {
    font-size: 16px;
    line-height: 19px;
  }

  .cart {
    position: relative;
  }

  .count {
    position: absolute;
    padding: 1px 3px;
    font-size: 10px;
    line-height: 11px;
    font-weight: 300;
    right: 0;
    bottom: 7px;
    color: var(--border-light);
    background-color: var(--danger);
    border-radius: 5px;
  }
</style>