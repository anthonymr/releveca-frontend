<template>
  <clients-form
    :countries="countries"
    :approved="false"

    v-model:name="client.name"
    v-model:phone="client.phone"
    v-model:address="client.address"
    v-model:rif="client.rif"
    v-model:nit="client.nit"
    v-model:email="client.email"
    v-model:country="client.country"
    v-model:notes="client.notes"
    v-model:clientType="client.clientType"
    v-model:taxPayer="client.taxPayer"
  
    @create="createNewClient"
  />
</template>

<script>
import { useCountry } from '../../store/country';
import { useClient } from '../../store/client';
import { mapState, mapActions } from 'pinia';
import ClientsForm from '../../components/forms/ClientsForm.vue';

export default {
  name: 'ClientsNew',
  components: {
    ClientsForm,
  },
  data() {
    return {
      client: {
        name: '',
        phone: '',
        address: '',
        rif: '',
        nit: '',
        email: '',
        country: null,
        notes: '',
        clientType: 1,
        taxPayer: 'No',
      },
    }
  },

  created() {
    this.getCountries();
  },

  methods: {
    ... mapActions(useCountry, ['getCountries']),
    ... mapActions(useClient, ['createClient', 'getClients']),
    async createNewClient(errors){
      if(errors.length > 0) {
        return;
      }

      let result = null;

      try {
        result = await this.createClient(this.client);
      } catch (error) {
        if(error.response.data.errors[0].rif[0] === 'has already been taken'){
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'RIF en uso por otro cliente', life: 3000 });
        }else{
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el cliente', life: 3000 });
        }
        return;
      }

      if(result.message === 'Client created') {
        this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado correctamente', life: 3000 });
        // await this.getClients(0);
        this.$router.push('/clients');
      } else {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el cliente', life: 3000 });
      }
    }
  },

  computed: {
    ... mapState(useCountry, ['countries']),
  },
}
</script>