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
  <base-pagination :data="itemStorage.pagination" @changePage="toPage">
    <section class="cards-container">
      <ItemCard :item="item" v-for="item in filteredItems" />
      <div class="no-items" v-if="noItems">Esta corporación no cuenta con artículos activos</div>
      <div class="no-found" v-if="noItemsFound">Ningún artículo coinside con la busqueda</div>
    </section>
  </base-pagination>
</template>

<script>
  import { useItem } from '../../store/items';
  import { mapActions } from 'pinia';

  import ItemCard from '../../components/items/ItemCard.vue';

  export default {
    components: {
      ItemCard,
    },
    data() {
      return {
        itemStorage: useItem(),
        liveFilter: '',
        filter: '',
      }
    },

    mounted() {
      this.getItems();
    },

    methods: {
      ...mapActions(useItem, ['getItems', 'toPage']),
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