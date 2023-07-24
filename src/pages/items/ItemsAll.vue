<template>
  <!-- <section class="big-search">
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
  </section> -->
  <BaseSearch @search="searchItems"/>
  <base-pagination :data="itemStorage.pagination" @changePage="toPage">
    <section class="cards-container">
      <ItemCard :item="item" v-for="item in itemStorage.items" />
      <div class="no-found" v-if="noItems">Ningún artículo coinside con la busqueda</div>
    </section>
  </base-pagination>
</template>

<script>
  import { useItem } from '../../store/items';
  import { mapActions } from 'pinia';

  import ItemCard from '../../components/items/ItemCard.vue';
  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      ItemCard,
      BaseSearch,
    },
    data() {
      return {
        itemStorage: useItem(),
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
        return !this.itemStorage.items.length
      },
    }
  }
</script>