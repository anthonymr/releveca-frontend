<template>
  <section>
    <base-pagination :data="clientStore.pagination" @changePage="toPage">
      <base-table :config="tableConfig" :data="clientStore.clients"/>
    </base-pagination>
  </section>
</template>

<script>
  import { useSession } from '../../store/session';
  import { useClient } from '../../store/client';
  import { mapActions } from 'pinia';

  export default {
    data() {
      return {
        clientStore: useClient(),
        sessionStore: useSession(),

        tableConfig: {
          display: [
            {
              name:'ID',
              key:'id',
            },
            {
              name:'Nombre',
              key:'name',
            },
            {
              name:'Teléfono',
              key:'phone',
            },
            {
              name:'Estado',
              key:'status',
            },
            {
              name:'Correo',
              key:'email',
            },
            {
              name:'Aprobado',
              key:'approval',
            },
          ],
          widths: [50,'*',100,100,200,100],
          classes: ['btn primary','','','','',''],
          actions: [
            {
              name: 'ver',
              action: (line) => console.log(line),
            },
            {
              name: 'ver',
              action: (line) => console.log(line),
            }
          ],
        },        
        currentPage: 1,
      }
    },

    mounted() {
      this.getClients(this.sessionStore.token, this.currentPage);
    },

    methods: {
      ...mapActions(useClient, ['getClients']),
      
      toPage(page) {
        this.currentPage = page;
        this.getClients(this.sessionStore.token, this.currentPage);
      }
    }
  }
</script>

<style scoped>
  section {
    padding: 30px;
  }
</style>