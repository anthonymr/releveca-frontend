<template>
  <section class="r-form-wrapper">
    <form class="r-form">
      <h2 class="r-title">Nuevo artículo</h2>
      <div>
        <div class="card">
          <div class="field">
              <label for="code">Código</label>
              <input-text id="code" class="w-full" v-model="item.code" :class="invalidClass('code')" />
          </div>
          <Message severity="error" v-if="invalidClass('code')">El código debe ser de al menos 3 caracteres</Message>
          <div class="field">
              <label for="name">Nombre</label>
              <input-text id="name" class="w-full" v-model="item.name" :class="invalidClass('name')" />
              <Message severity="error" v-if="invalidClass('name')">El nombre debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="field">
            <label for="model">Modelo</label>
            <input-text id="model" class="w-full" v-model="item.model" :class="invalidClass('model')" />
            <Message severity="error" v-if="invalidClass('model')">El modelo debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="flex gap-3">
            <div class="field w-6">
              <label for="price">Precio ({{baseCurrency?.code}})</label>
              <input-number id="price" v-model="item.price"  :class="invalidClass('price')" />
              <Message severity="error" v-if="invalidClass('price')">El precio debe ser mayor que 0</Message>
            </div>
            <div class="field w-6">
              <label for="stock">Disponible</label>
              <input-number id="stock" v-model="item.stock"  :class="invalidClass('stock')" />
              <Message severity="error" v-if="invalidClass('stock')">El stock debe ser mayor que 0</Message>
            </div>
          </div>
          <div class="field">
            <label for="unit">Unidad</label>
            <Dropdown
              v-model="item.unit"
              :options="units"
              optionLabel="name"
              filter
              :style="{ width: '100%' }"
              :class="invalidClass('unit')"
            />  
          </div>
          <Message severity="error" v-if="invalidClass('unit')">Escoge la unidad de la lista</Message>
          <div class="field">
            <Button class="w-full justify-content-center" @click="createNewItem">Crear</Button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
/*
To do:
  validate fields
  create item
*/
import { useCorporation } from '../../store/corporation';
import { useItem } from '../../store/items';
import { mapState, mapActions } from 'pinia';
import validatorService from '../../services/ValidatorService';

export default {
  name: 'ItemsNew',
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
      invalids: [],
    }
  },

  created() {
    this.getBaseCurrency();
    this.getUnits();
  },

  methods: {
    ... mapActions(useCorporation, ['getUnits', 'getBaseCurrency']),
    ... mapActions(useItem, ['createItem', 'getItems']),
    async createNewItem(){
      console.log('dandole')
      this.invalids = [];

      if(!this.validateCode) this.invalids.push('code');
      if(!this.validateName) this.invalids.push('name');
      if(!this.validateModel) this.invalids.push('model');
      if(!this.validatePrice) this.invalids.push('price');
      if(!this.validateStock) this.invalids.push('stock');
      if(!this.validateUnit) this.invalids.push('unit');

      if(this.invalids.length > 0) {
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
    invalidClass(field){
      if (this.invalids.includes(field)) {
        return 'p-invalid';
      }
    },
  },

  computed: {
    ... mapState(useCorporation, ['units', 'baseCurrency']),
    validateCode(){
      return validatorService.validateCode(this.item.code);
    },
    validateName(){
      return validatorService.validateString(this.item.name);
    },
    validateModel(){
      return validatorService.validateString(this.item.model);
    },
    validatePrice(){
      return validatorService.validateAmount(this.item.price);
    },
    validateStock(){
      return validatorService.validateAmount(this.item.stock);
    },
    validateUnit(){
      return validatorService.validateItemList(this.units, this.item.unit, 'name');
    },
  },
}
</script>