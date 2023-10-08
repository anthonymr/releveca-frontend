<template>
  <base-search @search="searchItems"/>

  <Paginator
    :rows="10"
    :totalRecords="pagination.total_items"
    :rowsPerPageOptions="[10, 50, 100]"
    @page="toPage"
  />

  <DataView :value="items">
    <template #list="{data}">
        <div class="col-12">
            <div class="flex flex-column xl:flex-row xl:align-items-start gap-4 p-2">
                <img @click="goToItem(data.id)" class="w-9 sm:w-16rem xl:w-9rem block xl:block mx-auto cursor-pointer" src="../../assets/image-placeholder.svg" :alt="data.name" />
                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 p-4">
                    <div class="flex flex-column align-items-center sm:align-items-start">
                        <div class="text-800 cursor-pointer" @click="goToItem(data.id)">{{ data.name }}</div>
                        <span class="text-xl text-800">${{ data.price }}</span>
                        <span class="text-xs text-600 mb-1">Disponible: {{ data.stock }}</span>
                        <Tag :value="getStatus(data)" :severity="getSeverity(data.status)"></Tag>
                    </div>
                    <div class="flex flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <InputNumber v-model="data.count" @click="data.count = ''" :min="0" :max="parseInt(data.stock)" />
                        <Button severity="info" @click="addItem(data)">
                          <font-awesome-icon icon="cart-plus" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
</template>

<script>
  import { useItem } from '../../store/items';
  import { mapActions, mapState } from 'pinia';

  import { useCart } from '../../store/cart';

  import BaseSearch from '../../components/base/BaseSearch.vue';

  export default {
    components: {
      BaseSearch,
    },

    mounted() {
      this.getItems(0);
    },

    methods: {
      changePage(event) {
        this.toPage(event);
      },
      ...mapActions(useItem, ['getItems', 'toPage', 'searchItems']),
      ...mapActions(useCart, ['addItem']),
      getStatus(data) {
        return data.status === 'enabled' ? 'activo' : 'inactivo';
      },
      getSeverity(value) {
        if(value === 'enabled') return 'success';
        if(value === true) return 'success';
        return 'danger';
      },
      goToItem(id) {
        this.$router.push('/items/show/' + id);
      },
    },

    computed: {
      ...mapState(useItem, ['pagination', 'items']),
    },
  }
</script>

<style scoped>
  .p-inputnumber {
    width: 60px;
    justify-content: center;
  }

  .p-inputnumber > * {
    width: 60px;
  }
</style>