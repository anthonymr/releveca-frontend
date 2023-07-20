<template>
  <section class="big-search">
      <input
        type="text"
        placeholder="Buscar artículo"
        id="search"
        v-model="liveFilter"
        @keyup.enter="filter = liveFilter"
      />
      <label for="search">
        <font-awesome-icon icon="magnifying-glass" />
      </label>
  </section>
  <section class="cards-container">
    <ItemCard :item="item" v-for="item in filteredItems" />
    <div class="no-items" v-if="noItems">Esta corporación no cuenta con artículos activos</div>
    <div class="no-found" v-if="noItemsFound">Ningún artículo coinside con la busqueda</div>
  </section>
</template>

<script>
  import { useItem } from '../../store/items';
  import { useSession } from '../../store/session';
  import { mapActions } from 'pinia';

  import ItemCard from '../../components/items/ItemCard.vue';

  export default {
    components: {
      ItemCard,
    },
    data() {
      return {
        itemStorage: useItem(),
        sessionStorage: useSession(),
        liveFilter: '',
        filter: '',
      }
    },

    mounted() {
      this.getItems(this.sessionStorage.token);
    },

    methods: {
      ...mapActions(useItem, ['getItems']),
    },

    computed: {
      filteredItems(){
        return this.itemStorage.items.filter( item => {
          return item.name.toLowerCase().includes(this.filter.toLowerCase())
                 || item.code.toLowerCase().includes(this.filter.toLowerCase());
        })
      },

      noItems(){
        return !this.itemStorage.items.length;
      },

      noItemsFound(){
        return this.itemStorage.items.length
               && !this.filteredItems.length;
      }
    }
  }
</script>