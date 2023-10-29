<template>
  <section class="r-form-wrapper">
    <form class="r-form">
      <h2 class="r-title">Nuevo artículo</h2>
      <div>
        <div class="card">
          <div class="field">
              <label for="code">Código</label>
              <input-text id="code" class="w-full" :class="invalidClass('code')"
                @input="$emit('update:code', $event.target.value)"
                :value="code"
              />
              <Message severity="error" v-if="invalidClass('code')">El código debe ser de al menos 3 caracteres</Message>
          </div>
          <div class="field">
              <label for="name">Nombre</label>
              <input-text id="name" class="w-full" :class="invalidClass('name')"
                @input="$emit('update:name', $event.target.value)"
                :value="name"
              />
              <Message severity="error" v-if="invalidClass('name')">El nombre debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="field">
            <label for="model">Modelo</label>
            <input-text id="model" class="w-full" :class="invalidClass('model')"
              @input="$emit('update:model', $event.target.value)"
              :value="model"
            />
            <Message severity="error" v-if="invalidClass('model')">El modelo debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="flex gap-3">
            <div class="field w-6">
              <label for="price">Precio ({{baseCurrency?.code}})</label>
              <input-number id="price" :class="invalidClass('price')" mode="currency" :currency="baseCurrency?.code"
                @input="$emit('update:price', $event.value)"
                :modelValue="price"
              />
              <Message severity="error" v-if="invalidClass('price')">El precio debe ser mayor que 0</Message>
            </div>
            <div class="field w-6">
              <label for="stock">Disponible</label>
              <input-number id="stock"  :class="invalidClass('stock')" :suffix="unit?.code"
                @input="$emit('update:stock', $event.value)"
                :modelValue="stock"
              />
              <Message severity="error" v-if="invalidClass('stock')">El stock debe ser mayor que 0</Message>
            </div>
          </div>
          <div class="field">
            <label for="unit">Unidad</label>
            <Dropdown
              @change="$emit('update:unit', $event.value)"
              :modelValue="unit"
              :options="units"
              optionLabel="name"
              filter
              :style="{ width: '100%' }"
              :class="invalidClass('unit')"
            />  
          </div>
          <Message severity="error" v-if="invalidClass('unit')">Escoge la unidad de la lista</Message>
          <div class="field">
            <Button class="w-full justify-content-center" @click="create">Crear</Button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import ValidatorService from '../../services/ValidatorService';
export default {
  name: 'ItemsForm',
  props: ['code', 'name', 'model', 'price', 'stock', 'unit', 'baseCurrency', 'units'],
  emits: ['create', 'update:code', 'update:name', 'update:model', 'update:price', 'update:stock', 'update:unit'],
  data() {
    return {
        errors: [],
    }
  },

  methods: {
    create(){
      this.errors = []

      if(!this.validateCode) this.errors.push('code');
      if(!this.validateName) this.errors.push('name');
      if(!this.validateModel) this.errors.push('model');
      if(!this.validatePrice) this.errors.push('price');
      if(!this.validateStock) this.errors.push('stock');
      if(!this.validateUnit) this.errors.push('unit');

      this.$emit('create', this.errors);
    },
    invalidClass(field){
      if (this.errors.includes(field)) {
        return 'p-invalid';
      }
    },
  },

  computed: {
    validateCode(){
      return ValidatorService.validateCode(this.code);
    },
    validateName(){
      return ValidatorService.validateString(this.name);
    },
    validateModel(){
      return ValidatorService.validateString(this.model);
    },
    validatePrice(){
      return ValidatorService.validateAmount(this.price);
    },
    validateStock(){
      return ValidatorService.validateAmount(this.stock);
    },
    validateUnit(){
      return ValidatorService.validateItemList(this.units, this.unit, 'name');
    },
  },
}
</script>