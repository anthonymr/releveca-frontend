<template>
  <section class="r-form-wrapper">
    <form class="r-form">
      <h2 class="r-title">Nuevo cliente</h2>
      <div>
        <div class="card">
          <div class="field">
              <label for="name">Nombre</label>
              <input-text id="name" class="w-full" :class="invalidClass('name')"
                @input="$emit('update:name', $event.target.value)"
                :value="name"
              />
              <Message severity="error" v-if="invalidClass('name')">El nombre debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="field">
            <label for="phone">Teléfono</label>
            <input-text id="phone" class="w-full" :class="invalidClass('phone')"
              @input="$emit('update:phone', $event.target.value)"
              :value="phone"
            />
            <Message severity="error" v-if="invalidClass('phone')">Solo deben ser números y al menos 10</Message>
          </div>
          <div class="field">
            <label for="address">Dirección</label>
            <input-text id="address" class="w-full" :class="invalidClass('address')"
              @input="$emit('update:address', $event.target.value)"
              :value="address"
            />
            <Message severity="error" v-if="invalidClass('address')">La dirección debe ser de al menos 10 caracteres</Message>
          </div>
          <div class="field">
            <label for="rif">RIF</label>
            <input-text id="rif" class="w-full" :class="invalidClass('rif')"
              @input="$emit('update:rif', $event.target.value)"
              :value="rif" placeholder="J123456789"
              :disabled="editing && approved"
            />
            <Message severity="error" v-if="invalidClass('rif')">El RIF debe cumplir el patrón J123456789</Message>
          </div>
          <div class="field">
            <label for="nit">NIT</label>
            <input-text id="nit" class="w-full" :class="invalidClass('nit')"
              @input="$emit('update:nit', $event.target.value)"
              :value="nit"
              :disabled="editing && approved"
            />
            <Message severity="error" v-if="invalidClass('nit')">El NIT debe ser de al menos 5 caracteres</Message>
          </div>
          <div class="field">
            <label for="email">correo electrónico</label>
            <input-text id="email" class="w-full" :class="invalidClass('email')"
              @input="$emit('update:email', $event.target.value)"
              :value="email"
            />
            <Message severity="error" v-if="invalidClass('email')">Por favor, insete un correo válido</Message>
          </div>
          <div class="field">
            <label for="country">Pais</label>
            <Dropdown
              @change="$emit('update:country', $event.value)"
              :modelValue="country"
              :options="countries"
              optionLabel="name"
              filter
              :style="{ width: '100%' }"
              :class="invalidClass('country')"
              :disabled="editing && approved"
            />  
          </div>
          <Message severity="error" v-if="invalidClass('country')">Escoge el país de la lista</Message>
          <div class="field">
            <label for="notes">Notas</label>
            <Textarea id="notes" class="w-full" :class="invalidClass('notes')"
              @input="$emit('update:notes', $event.target.value)"
              :value="notes"
            />
          </div>
          <div class="field">
            <label for="clientType">Tipo de cliente (cambiar)</label>
            <SelectButton :options="[1, 2]" aria-labelledby="basic"
              id="clientType" :class="invalidClass('clientType')"
              @change="$emit('update:clientType', $event.value)"
              :modelValue="clientType"
            />
          </div>
          <div class="field">
            <label for="taxPayer">¿Impuestos?</label>
            <SelectButton :options="['Si', 'No']" aria-labelledby="basic"
              id="taxPayer" :class="invalidClass('taxPayer')"
              @change="$emit('update:taxPayer', $event.value)"
              :modelValue="taxPayer"
            />
          </div>
          <div class="field">
            <Button v-if="editing" class="w-full justify-content-center" @click="sendAction('edit')">Guardar</Button>
            <Button v-else class="w-full justify-content-center" @click="sendAction('create')">Crear</Button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import ValidatorService from '../../services/ValidatorService';
export default {
  name: 'ClientsForm',
  props: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    rif: { type: String, default: '' },
    nit: { type: String, default: '' },
    email: { type: String, default: '' },
    country: { type: Object, default: null },
    notes: { type: String, default: '' },
    clientType: { type: Number, default: 1 },
    taxPayer: { type: String, default: 'No' },
    countries: { type: Array, default: () => [] },
    approved: { type: Boolean, default: false },
    editing: { type: Boolean, default: true },  
  },
  emits: ['create', 'update:name', 'update:phone', 'update:address', 'update:rif', 'update:nit', 'update:email', 'update:country', 'update:notes', 'update:clientType', 'update:taxPayer'],
  data() {
    return {
      errors: [],
    }
  },

  methods: {
    sendAction(action){
      this.errors = []

      if(!this.validateName) this.errors.push('name');
      if(!this.validatePhone) this.errors.push('phone');
      if(!this.validateAddress) this.errors.push('address');
      if(!this.validateEmail) this.errors.push('email');
      
      if(!this.approved){
        if(!this.validateRif) this.errors.push('rif');
        if(!this.validateCountry) this.errors.push('country');
      }

      this.$emit(action, this.errors);
    },
    invalidClass(field){
      if (this.errors.includes(field)) {
        return 'p-invalid';
      }
    },
  },

  computed: {
    validateName(){
      return ValidatorService.validateString(this.name);
    },
    validatePhone(){
      return ValidatorService.validatePhone(this.phone);
    },
    validateAddress(){
      return ValidatorService.validateAddress(this.address);
    },
    validateRif(){
      return ValidatorService.validateRif(this.rif);
    },
    validateEmail(){
      return ValidatorService.validateEmail(this.email);
    },
    validateCountry(){
      return ValidatorService.validateItemList(this.countries, this.country, 'name');
    },   
  },
}
</script>