<template>
  <header>
    <routes-tree @toggle-cart="isCartOpen = !isCartOpen" />
    <shopping-cart v-if="isCartOpen" @close="isCartOpen = false" />
    <current-route />
  </header>
</template>

<script>
  import RoutesTree from './RoutesTree.vue';
  import CurrentRoute from './CurrentRoute.vue';
  import ShoppingCart from './ShoppingCart.vue';
  import { mapState } from 'pinia';
  import { useCart } from '../../store/cart';

  export default {
    components: {
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
