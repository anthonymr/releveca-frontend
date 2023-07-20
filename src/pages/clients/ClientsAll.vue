<template>
  <section>
    <h3>Clientes</h3>
    <base-table 
      :data="clientStore.clients" 
      :display="display"
      :generalAction="(item) => console.log(item.name)"
      :actions="actions"
    />
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
        ]
      }
    },

    mounted() {
      this.getClients(this.sessionStore.token);
    },

    methods: {
      ...mapActions(useClient, ['getClients']),
    }
  }
</script>

<style scoped>
  section {
    padding: 30px;
  }
</style>