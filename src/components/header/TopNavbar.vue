<template>
  <header>
    <routes-tree @toggle-cart="toggleCart" />
    <Sidebar v-model:visible="isCartOpen" :position="position">
      <Button @click="toggleCartPosition">
        <font-awesome-icon icon="expand" />
      </Button>
      <shopping-cart @close="closeCart" />
    </Sidebar>
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
        position: 'right',
      }
    },

    methods: {
      toggleCartPosition(){
        this.position = this.position === 'right' ? 'full' : 'right';
      },
      toggleCart() {
        this.isCartOpen = !this.isCartOpen
      },
      closeCart() {
        this.isCartOpen = false;
        this.position = 'right';
      }
    },

    computed: {
      ...mapState(useCart, ['count']),
    }
  }
</script>
