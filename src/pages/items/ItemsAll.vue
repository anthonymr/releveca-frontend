<template>
  <section class="big-search">
      <input
        type="text"
        placeholder="Buscar artículo"
        id="search"
        v-model="filter"
        @keyup.enter="searchItems(filter)"
      />
      <label for="search">
        <font-awesome-icon icon="magnifying-glass" />
      </label>
  </section>
  <base-pagination :data="itemStorage.pagination" @changePage="toPage">
    <section class="cards-container">
      <ItemCard :item="item" v-for="item in itemStorage.items" />
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
        filter: '',
      }
    },

    mounted() {
      this.getItems();
    },

    methods: {
      ...mapActions(useItem, ['getItems', 'toPage', 'searchItems']),
    },

    computed: {
      noItems(){
        return !this.itemStorage.items.length && !this.filter;
      },

      noItemsFound(){
        return !this.itemStorage.items.length && this.filter;
      }
    }
  }
</script>