<template>
  <ItemsForm
    :baseCurrency="baseCurrency"
    :units="units"

    v-model:code="item.code"
    v-model:name="item.name"
    v-model:model="item.model"
    v-model:price="item.price"
    v-model:stock="item.stock"
    v-model:unit="item.unit"
  
    @create="createNewItem"
  />
</template>

<script>
import { useCorporation } from '../../store/corporation';
import { useItem } from '../../store/items';
import { mapState, mapActions } from 'pinia';
import ItemsForm from '../../components/forms/ItemsForm.vue';

export default {
  name: 'ItemsNew',
  components: {
    ItemsForm,
  },
  data() {
    return {
      item: {
        code: '',
        name: '',
        model: '',
        price: 0,
        stock: 0,
        unit: '',
      },
    }
  },

  created() {
    this.getBaseCurrency();
    this.getUnits();
  },

  methods: {
    ... mapActions(useCorporation, ['getUnits', 'getBaseCurrency']),
    ... mapActions(useItem, ['createItem', 'getItems']),
    async createNewItem(errors){
      if(errors.length > 0) {
        return;
      }
      let result = null;
     
      try {
        result = await this.createItem(this.item);
      } catch (error) {
        if (error.response.status == 409) {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'El código ya existe', life: 3000 });
        } else {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el artículo', life: 3000 });
        }
      }

      if(result.message === 'Item created successfully') {
        this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Artículo creado correctamente', life: 3000 });
        await this.getItems();
        this.$router.push('/items');
      } else {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el artículo', life: 3000 });
      }
    },
  },

  computed: {
    ... mapState(useCorporation, ['units', 'baseCurrency']),
  },
}
</script>