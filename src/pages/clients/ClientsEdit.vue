<template>
  <clients-form
    :countries="countries"
    :approved="client.approval"
    :editing="true"

    v-model:name="modelClient.name"
    v-model:phone="modelClient.phone"
    v-model:address="modelClient.address"
    v-model:rif="modelClient.rif"
    v-model:nit="modelClient.nit"
    v-model:email="modelClient.email"
    v-model:country="modelClient.country"
    v-model:notes="modelClient.notes"
    v-model:clientType="modelClient.clientType"
    v-model:taxPayer="modelClient.taxPayer"
  
    @edit="editClient"
  />
</template>

<script>
import { useCountry } from '../../store/country';
import { useClient } from '../../store/client';
import { mapState, mapActions } from 'pinia';
import ClientsForm from '../../components/forms/ClientsForm.vue';

export default {
  name: 'ClientsEdit',
  components: {
    ClientsForm,
  },
  data() {
    return {
      modelClient: {
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

  async created() {
    this.getCountries();
    await this.getClient(this.getRouteParamId());

    this.modelClient.name = this.client.name;
    this.modelClient.phone = this.client.phone;
    this.modelClient.address = this.client.address;
    this.modelClient.rif = this.client.rif;
    this.modelClient.nit = this.client.nit;
    this.modelClient.email = this.client.email;
    this.modelClient.country = this.client.country;
    this.modelClient.notes = this.client.notes;
    this.modelClient.clientType = this.client.client_type;
    this.modelClient.taxPayer = this.client.taxpayer ? 'Si' : 'No';
  },

  methods: {
    ... mapActions(useCountry, ['getCountries']),
    ... mapActions(useClient, ['getClient', 'updateClient']),

    getRouteParamId() {
      if(isNaN(parseInt(this.$route.params?.id))) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Cliente inválido' });
        this.$router.push('/clients');
        return;
      }

      return this.$route.params.id;
    },

    async editClient(errors){
      if(errors.length > 0) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor, corrija los errores indicados en el formularios', life: 3000 });
        return;
      }

      let result = null;

      try {
        result = await this.updateClient(this.client, this.modelClient);
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el cliente', life: 3000 });
        return;
      }

      if(result.message === 'Client patched' || result.message === 'Client updated') {
        this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente editado correctamente', life: 3000 });
        this.$router.push(`/clients/${this.client.id}`);
      } else {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el cliente', life: 3000 });
      }
    },
  },

  computed: {
    ... mapState(useCountry, ['countries']),
    ... mapState(useClient, ['client']),
  },
}
</script>