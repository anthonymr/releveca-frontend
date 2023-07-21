<template>
  <section>
    <base-pagination
      v-if="clientStore.fetched"
      :data="clientStore.clients.pagination"
      @changePage="toPage"
    >
      <base-table 
        v-if="clientStore.fetched"
        :data="clientStore.clients.payload" 
        :display="display"
        :generalAction="(item) => console.log(item.name)"
        :actions="actions"
      />
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
        display: ['id', 'name', 'staus', 'approval', 'email', 'phone'],
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