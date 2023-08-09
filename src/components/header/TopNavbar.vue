<template>
  <header>
    <routes-tree @toggle-cart="toggleCart" />
    <Sidebar v-model:visible="isCartOpen" :position="position" class="w-full md:w-30rem lg:w-30rem">
      <template #header>
        <div class="flex">
          <div>
            <button class="p-sidebar-icon p-link mr-2" @click="toggleFullScreen" v-if="isFullScreen">
              <font-awesome-icon icon="compress" />
            </button>
            <button class="p-sidebar-icon p-link mr-2" @click="toggleFullScreen" v-else>
              <font-awesome-icon icon="expand" />
            </button>
          </div>
        </div>
      </template>
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
      toggleFullScreen(){
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
      isFullScreen(){
        return this.position === 'full';
      }
    }
  }
</script>
