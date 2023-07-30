<template>
  <base-search @search="searchItems"/>

  <Paginator
    :rows="10"
    :totalRecords="pagination.total_items"
    :rowsPerPageOptions="[10, 50, 100]"
    @page="toPage"
  />

  <section class="cards-container">
    <ItemCard :item="item" v-for="item in items" />
  </section>
</template>

<script>
  import { useItem } from '../../store/items';
  import { mapActions, mapState } from 'pinia';

  import ItemCard from '../../components/items/ItemCard.vue';
  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      ItemCard,
      BaseSearch,
    },

    mounted() {
      this.getItems(0);
    },

    methods: {
      ...mapActions(useItem, ['getItems', 'toPage', 'searchItems']),
    },

    computed: {
      ...mapState(useItem, ['pagination', 'items'])
    }
  }
</script>