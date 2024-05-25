<template>
    <section class="r-form-wrapper">
      <form class="r-form">
        <h2 class="r-title" v-if="editing">Editando garantía</h2>
        <h2 class="r-title" v-else>Nueva garantía</h2>
        <div>
          <div class="card">
            <div class="field flex align-items-start">
              <label for="client">Reportado al cliente</label>
              <InputSwitch
                class="ml-4"
                @input="$emit('update:reported', $event)"
                :modelValue="reported"              
              />
            </div>
            <div class="field">
              <label for="client">Clientes</label>
              <Dropdown
                @change="$emit('update:client', $event.value)"
                :modelValue="client"
                :options="clients"
                :optionLabel="client => client.code + ' - ' + client.name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('client')"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :filterFields="['name', 'code', 'rif', 'email']"
              />
              <Message severity="error" v-if="invalidClass('client')">Escoge el cliente de la lista</Message>
            </div>

            <div class="field">
              <label for="item">Artículo</label>
              <Dropdown
                @change="$emit('update:item', $event.value)"
                :modelValue="item"
                :options="items"
                :optionLabel="item => item.code + ' - ' + item.name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('item')"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :filterFields="['name', 'code']"
              />
              <Message severity="error" v-if="invalidClass('item')">Escoge el artículo de la lista</Message>
            </div>

            <div class="field">
              <label for="client">Proveedor</label>
              <Dropdown
                @change="$emit('update:supplier', $event.value)"
                :modelValue="supplier"
                :options="suppliers"
                :optionLabel="supplier => supplier.code + ' - ' + supplier.name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('supplier')"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :filterFields="['name', 'code', 'rif', 'email']"
              />
              <Message severity="error" v-if="invalidClass('client')">Escoge el proveedor de la lista</Message>
            </div>

            <div class="field">
              <label for="client">Vendedor</label>
              <Dropdown
                @change="$emit('update:seller', $event.value)"
                :modelValue="seller"
                :options="sellers"
                :optionLabel="seller => seller.code + ' - ' + seller.name"
                filter
                :style="{ width: '100%' }"
                :class="invalidClass('seller')"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :filterFields="['name', 'code', 'rif']"
              />
              <Message severity="error" v-if="invalidClass('client')">Escoge el proveedor de la lista</Message>
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
              <label for="notes">Observaciones</label>
              <Textarea id="notes" class="w-full" :class="invalidClass('notes')"
                @input="$emit('update:notes', $event.target.value)"
                :modelValue="notes"
              />
              <Message severity="error" v-if="invalidClass('notes')">Las notas deben ser de al menos 5 caracteres</Message>
            </div>

            <div class="field">
              <label for="notes2">Observaciones 2</label>
              <Textarea id="notes2" class="w-full" :class="invalidClass('notes2')"
                @input="$emit('update:notes2', $event.target.value)"
                :modelValue="notes2"
              />
              <Message severity="error" v-if="invalidClass('notes2')">Las notas deben ser de al menos 5 caracteres</Message>
            </div>

            <div class="field">
              <label for="notes2">Categoría</label>
              <Dropdown id="category"
                @change="$emit('update:category', $event.value)"
                :modelValue="category"
                :options="['garantía', 'devolución', 'daños por flete']"
                :style="{ width: '100%' }"
                :class="invalidClass('category')"
                filter
              />
              <Message severity="error" v-if="invalidClass('category')">Escoge la categoría de la lista</Message>
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
                      <div class="flex align-items-center">
                        <div :style="'width: 10px; height: 30px; border-radius: 5px; margin-right: 10px; background-color:#' + option.color"></div>
                        {{ option.name }}
                      </div>
                      <Button class="p-2" severity="danger" @click="$emit('remove-status', option)">
                        <font-awesome-icon icon="fa-minus" />
                      </Button>
                    </span>
                  </div>
                </template>
              </Dropdown>
              <Message severity="error" v-if="invalidClass('status')">Escoge el estado de la lista</Message>
            </div>

            <div>
              <div v-bind="getRootProps()" class="drop-zone">
                <input v-bind="getInputProps()" />
                <p v-if="isDragActive">Drop the files here ...</p>
                <p v-else>Arrastra hasta aquí tus archivos o haz click para seleccionarlos</p>
              </div>
            </div>

            <div class="field files-container" v-if="files.length > 0">
              <div>
                <ul>
                  <li v-for="(file, index) in files" :key="file.name + index" class="file">
                    <font-awesome-icon :icon="fileIcon(file)" />
                    <span>{{ file.name }}</span>
                    <font-awesome-icon icon="fa-times" class="remove" @click="removeFile(index)" />
                  </li>
                  <li class="clean-all" @click="removeAllFiles">
                    Borrar todos los archivos
                  </li>
                </ul>
              </div>
            </div>

            <div class="field" v-else></div>

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
  import { useDropzone } from "vue3-dropzone";
  import { ref } from 'vue';
  
  export default {
    name: 'WarrantyForm',
    props: {
      editing: { type: Boolean, default: false },

      clients: { type: Array, default: () => [] },
      items: { type: Array, default: () => [] },
      states: { type: Array, default: () => [] },
      suppliers: { type: Array, default: () => [] },
      sellers: { type: Array, default: () => [] },

      client: { type: Object, default: null },
      item: { type: Object, default: null },
      qty: { type: Number, default: 0 },
      notes: { type: String, default: '' },
      notes2: { type: String, default: '' },
      status: { type: Object, default: null },
      supplier: { type: Object, default: null },
      seller: { type: Object, default: null },
      files: { type: Array, default: () => [] },
      category: { type: String, default: '' },
      reported: { type: Boolean, default: false },
    },

    emits: [
      'create', 'update:client', 'update:item', 'update:qty',
      'update:notes', 'update:notes2', 'update:status', 'update:supplier',
      'update:seller', 'remove-status', 'new-status', 'update:files'
    ],

    data() {
      return {
        errors: [],
      }
    },

    setup(_props, context){
        let files = ref([]);

        function onDrop(acceptFiles, rejectReasons) {
            if(acceptFiles.length > 0){
                files.value.push(...acceptFiles);
                context.emit('update:files', files.value);
            }

            if(rejectReasons.length > 0){
                console.info(rejectReasons);
            }
        }

        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

        return {
            getRootProps,
            getInputProps,
            files,
            ...rest,
        };
    },
  
    methods: {
      removeFile(index){
        this.files.splice(index, 1);
        this.$emit('update:files', this.files);
      },

      removeAllFiles(){
        this.files = [];
        this.$emit('update:files', this.files);
      },

      fileIcon(file){
        if(file.type.includes('image')) return 'fa-file-image';
        if(file.type.includes('pdf')) return 'fa-file-pdf';
        if(file.type.includes('word')) return 'fa-file-word';
        if(file.type.includes('excel')) return 'fa-file-excel';
        if(file.type.includes('powerpoint')) return 'fa-file-powerpoint';
        if(file.type.includes('audio')) return 'fa-file-audio';
        if(file.type.includes('video')) return 'fa-file-video';
        if(file.type.includes('text')) return 'fa-file-alt';
        return 'fa-file';
      },

      sendAction(action){
        this.errors = []

        if(!this.client) this.errors.push('client');
        if(!this.item) this.errors.push('item');
        if(!this.supplier) this.errors.push('supplier');
        if(!this.seller) this.errors.push('seller');
        if(!this.validateQty) this.errors.push('qty');
        if(!this.status) this.errors.push('status');
        if(!this.category) this.errors.push('category');
  
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
    },

    watch: {
      files: {
        handler(value){
          this.files = value;
        },
        deep: true,
      },

      client(value){
        if(value.seller_code){
          let seller = this.sellers.find(seller => seller.code === value.seller_code);
          if(seller) this.$emit('update:seller', seller);
        }
      },

      item(value){
        if(value.supplier_code){
          let supplier = this.suppliers.find(supplier => supplier.code === value.supplier_code);
          if(supplier) this.$emit('update:supplier', supplier);
        }
      }
    }
  }
  </script>

  <style scoped>
    .drop-zone{
      border: 3px dashed #accbfa;
      background-color: #accbfa28;
      padding: 20px;
      text-align: center;
      cursor: pointer;
    }

    .files-container {
      background-color: #bbbbbb28;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 0px;
    }

    .files-container ul {
      list-style: none;
      padding: 0;
    }

    .files-container li {
      display: flex;
      align-items: center;
      margin: 0;
      gap: 10px;
      color: #3d3d3d;
    }

    .files-container svg {
      color: #0084ff !important;
    }

    .files-container .remove {
      color: #3d3d3d !important;
    }

    .files-container span {
      width: calc(100% - 50px);
    }

    .file {
     cursor: pointer;
     padding: 20px 20px;
    }

    .file:hover {
      background-color: #dddddd;
    }

    .clean-all {
      display: flex;
      justify-content: center;
      padding: 5px 5px;
      cursor: pointer;
      color: #0084ff !important;
      user-select: none;
    }

    .clean-all:hover {
      background-color: #dddddd;
    }

    .clean-all:active {
      background-color: #bbbbbb;
    }
  </style>
