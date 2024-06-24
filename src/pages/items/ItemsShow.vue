<template>
  <section class="r-form-wrapper">
    <form class="r-form">
      <h2 class="r-title text-primary mb-5">
        <span class="mr-3">{{item?.name}}</span>
        <Tag class="mr-2" severity="success" v-if="item?.status == 'enabled'">activo</Tag>
        <Tag class="mr-2" severity="danger" v-else>inactivo</Tag>
      </h2>
      <div>
        <div class="card">
          <div class="field small">
              <label class="w-8rem">Nombre</label>
              <span class="text-color-secondary">{{item.name}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">Modelo</label>
            <span class="text-color-secondary">{{item.model}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">Stock</label>
            <span class="text-color-secondary">{{item.stock}} {{item.unit}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">Precio</label>
            <span class="text-color-secondary">{{item.price}} USD</span>
          </div>
          <Divider class="my-5" />
          <div class="field flex align-items-center">
            <label class="w-16rem">Mostrar en página web:</label>
            <span class="text-color-secondary">
              <ToggleButton v-model="item.show_in_web" onLabel="Si" offLabel="No" />
            </span>
          </div>
          <div class="field flex align-items-center">
            <label class="w-16rem">Mostrar en página de inicio:</label>
            <span class="text-color-secondary">
              <ToggleButton v-model="item.show_in_web_home" onLabel="Si" offLabel="No" />
            </span>
          </div>
          <div class="field">
            <label class="w-16rem">Orden de aparición:</label>
            <InputNumber v-model="item.show_in_web_home_order" />
          </div>
          <div class="field">
            <label class="w-18rem">Etiquetas: (separadas por coma)</label>
            <InputText v-model="item.show_in_web_home_tags" />
          </div>
          <div class="field">
            <label class="w-16rem">Imágenes:</label>
          </div>

          <div v-if="item?.files_urls?.length">
            <div class="field files-container flex flex-wrap">
                  <div v-for="(file, index) in item.files_urls" :key="file + index" class="file remove-wrapper">
                    <font-awesome-icon icon="fa-times" class="remove" @click="removeImage(file)" />
                    <img :src="backEndURL + file.url" alt="file" width="80" @click="goToFile(backEndURL + file.url)"/>
                  </div>
            </div>
          </div>

          <div>
              <div v-bind="getRootProps()" class="drop-zone">
                <input v-bind="getInputProps()" />
                <p v-if="isDragActive">Suelta las imágenes aquí...</p>
                <p v-else>Arrastra hasta aquí tus imágenes o haz click para seleccionarlos</p>
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
                    Borrar todas las imágenes
                  </li>
                </ul>
              </div>
            </div>

            <div class="field" v-else></div>


          <div class="field flex gap-3 mt-5 justify-content-end">
            <Button severity="success" class="w-auto justify-content-center" @click="saveItem">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { useItem } from '../../store/items';
import { mapActions } from 'pinia';

import { useDropzone } from "vue3-dropzone";
import { ref } from 'vue';

import { backEndURL } from '../../services/Service'

export default {
  name: 'ItemsShow',

  data() {
    return {
      itemId: this.$route.params.id,
      item: {},
      backEndURL,
      imagesToRemove: [],
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

      const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop, accept: 'image/*'});

      return {
          getRootProps,
          getInputProps,
          files,
          ...rest,
      };
  },

  async created() {
    this.item = await this.getItem(this.itemId);

    if(this.item.show_in_web_home_tags == 'null') this.item.show_in_web_home_tags = '';
  },

  methods: {
    ...mapActions(useItem, ['getItem', 'updateItem']),

    goToFile(url){
      window.open(url, '_blank');
    },

    removeFile(index){
      this.files.splice(index, 1);
      this.$emit('update:files', this.files);
    },

    removeAllFiles(){
      this.files = [];
      this.$emit('update:files', this.files);
    },

    removeImage(file){
      this.imagesToRemove.push(file.id);
      this.item.files_urls = this.item.files_urls.filter(f => f != file);
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

      async saveItem(){
        const item = new FormData();

        item.append('item[show_in_web]', this.item.show_in_web);
        item.append('item[show_in_web_home]', this.item.show_in_web_home);
        item.append('item[show_in_web_home_order]', this.item.show_in_web_home_order);
        item.append('item[show_in_web_home_tags]', this.item.show_in_web_home_tags);
        item.append('item[images_to_remove]', this.imagesToRemove.join(','));

        this.files.forEach(file => {
          item.append('item[files][]', file);
        });

        const result = await this.updateItem(
            this.itemId,
            item
        );

        if(result.message == 'Item updated successfully') {
          this.item = await this.getItem(this.itemId);

          if(this.item.show_in_web_home_tags == 'null') this.item.show_in_web_home_tags = '';

          this.files = [];
          this.imagesToRemove = [];
        }
      }

  },
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

    .remove-wrapper {
      position: relative;
    }

    .remove {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.74);
      padding: 5px;
      border-radius: 50%;
      right: 25px;
      top: 25px;
    }
  </style>