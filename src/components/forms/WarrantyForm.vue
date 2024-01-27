<template>
    <section class="r-form-wrapper">
      <form class="r-form">
        <h2 class="r-title" v-if="editing">Editando garantía</h2>
        <h2 class="r-title" v-else>Nueva garantía</h2>
        <div>
          <div class="card">
            <div class="field">
              <label for="client">Clientes</label>
              <Dropdown
                @change="$emit('update:client', $event.value)"
                :modelValue="client"
                :options="clients"
                optionLabel="name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('client')"
              />
              <Message severity="error" v-if="invalidClass('client')">Escoge el cliente de la lista</Message>
            </div>

            <div class="field">
              <label for="item">Artículo</label>
              <Dropdown
                @change="$emit('update:item', $event.value)"
                :modelValue="item"
                :options="items"
                optionLabel="name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('item')"
              />
              <Message severity="error" v-if="invalidClass('item')">Escoge el artículo de la lista</Message>
            </div>

            <div class="field">
              <label for="qty">Cantidad</label>
              <input-number id="qty" class="w-full" :class="invalidClass('qty')"
                @input="$emit('update:qty', $event.value)"
                :modelValue="qty"
              />
              <Message severity="error" v-if="invalidClass('qty')">La cantidad debe ser mayor a 0</Message>
            </div>

            <div class="field">
              <label for="notes">Notas</label>
              <Textarea id="notes" class="w-full" :class="invalidClass('notes')"
                @input="$emit('update:notes', $event.target.value)"
                :modelValue="notes"
              />
              <Message severity="error" v-if="invalidClass('notes')">Las notas deben ser de al menos 5 caracteres</Message>
            </div>

            <div class="field">
              <label for="status">Estado</label>
              <Dropdown id="status"
                @change="$emit('update:status', $event.value)"
                :modelValue="status"
                optionLabel="name"
                :options="states"
                :style="{ width: '100%' }"
                :class="invalidClass('status')"
                filter
              >
                <template #header>
                  <div class="flex justify-content-end">
                    <Button link @click="$emit('new-status')">Nuevo estado</Button>
                  </div>
                </template>
                <template #option="{option}">
                  <div class="w-full p-d-flex p-ai-center">
                    <span class="p-ml-2 flex justify-content-between">
                      {{ option.name }}
                      <Button class="p-2" severity="danger" @click="$emit('remove-status', option)">
                        <font-awesome-icon icon="fa-minus" />
                      </Button>
                    </span>
                  </div>
                </template>
              </Dropdown>
              <Message severity="error" v-if="invalidClass('status')">Escoge el estado de la lista</Message>
            </div>

            <div class="field">
              <Button class="w-full justify-content-center" @click.stop="sendAction('edit')" v-if="editing">Guardar cambios</Button>
              <Button class="w-full justify-content-center" @click.stop="sendAction('create')" v-else>Crear garantía</Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </template>
  
  <script>
  import ValidatorService from '../../services/ValidatorService';
  export default {
    name: 'WarrantyForm',
    props: {
      editing: { type: Boolean, default: false },

      clients: { type: Array, default: () => [] },
      items: { type: Array, default: () => [] },
      states: { type: Array, default: () => [] },

      client: { type: Object, default: null },
      item: { type: Object, default: null },
      qty: { type: Number, default: 0 },
      notes: { type: String, default: '' },
      status: { type: Object, default: null },
    },
    
    emits: ['create', 'update:client', 'update:item', 'update:qty', 'update:notes', 'update:status', 'remove-status', 'new-status'],
    
    data() {
      return {
        errors: [],
      }
    },
  
    methods: {
      sendAction(action){
        this.errors = []

        if(!this.client) this.errors.push('client');
        if(!this.item) this.errors.push('item');
        if(!this.validateQty) this.errors.push('qty');
        if(!this.status) this.errors.push('status');
  
        this.$emit(action, this.errors);
      },

      invalidClass(field){
        if (this.errors.includes(field)) {
          return 'p-invalid';
        }
      },
    },
  
    computed: {
      validateQty(){
        return ValidatorService.validateAmount(this.qty);
      },

      validateNotes(){
        return ValidatorService.validateString(this.notes);
      },
    },
  }
  </script>