<template>
  <section class="r-form-wrapper">
    <form class="r-form">
      <h2 class="r-title text-primary mb-5">
        <span class="mr-3">{{client.name}}</span>
        <Tag class="mr-2" severity="success" v-if="isEnabled">activo</Tag>
        <Tag class="mr-2" severity="danger" v-else>inactivo</Tag>
        <Tag class="mr-2" severity="success" v-if="isApproved">aprobado</Tag>
        <Tag class="mr-2"  severity="warning" v-else>no aprobado</Tag>
      </h2>
      <div>
        <div class="card">
          <div class="field small">
              <label class="w-8rem">Nombre</label>
              <span class="text-color-secondary">{{client.name}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">Dirección</label>
            <span class="text-color-secondary">{{client.address}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">País</label>
            <span class="text-color-secondary">{{client.country.name}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">RIF</label>
            <span class="text-color-secondary">{{client.rif}}</span>
          </div>
          <div class="field small" v-if="client.nit">
            <label class="w-8rem">NIT</label>
            <span class="text-color-secondary">{{client.nit}}</span>
          </div>
          <Divider class="my-5" />
          <div class="field small">
            <label class="w-8rem">Teléfono</label>
            <span class="text-color-secondary">{{client.phone}}</span>
          </div>
          <div class="field small">
            <label class="w-8rem">Correo</label>
            <span class="text-color-secondary">{{client.email}}</span>
          </div>
          <Divider class="my-5" />
          <div class="field small">
            <label class="w-8rem">Notas</label>
          </div>
          <div class="field small">
            <span class="text-color-secondary">{{client.notes}}</span>
          </div>
          <Divider class="my-5" />
          <div class="field small">
            <label class="w-16rem">Tipo de cliente (cambiar)</label>
            <span class="text-color-secondary">{{client.client_type}}</span>
          </div>
          <div class="field small">
            <label class="w-16rem">¿Impuestos?</label>
            <span class="text-color-secondary">{{client.taxpayer ? 'Si' : 'No'}}</span>
          </div>
          <div class="field flex gap-3 mt-5 justify-content-end">
            <Button class="w-auto justify-content-center" @click="edit">
              Editar
            </Button>
            <Button v-if="!isApproved" outlined severity="success" class="w-auto justify-content-center" @click="aprove">
              Aprobar
            </Button>
            <Button v-if="isApproved && isEnabled" outlined severity="danger" class="w-auto justify-content-center" @click="disable">
              Deshabilitar
            </Button>
            <Button v-if="isApproved && !isEnabled" outlined severity="sccedd" class="w-auto justify-content-center" @click="enable">
              Habilitar
            </Button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { useClient } from '../../store/client';
import { mapActions, mapState } from 'pinia';

export default {
  created() {
    this.getClient(this.getId());
  },

  methods: {
    ...mapActions(useClient, ['getClient', 'aproveClient', 'disableClient', 'enableClient']),
    getId() {
      if(isNaN(parseInt(this.$route.params?.id))) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Cliente inválido' });
        this.$router.push('/clients');
        return;
      }

      return this.$route.params.id;
    },

    async changeClientStatus(f, id, spectedMessage, okMessage, errorMessage) {
      let { message } = await f(id);
      if(message === spectedMessage) {
        this.$toast.add({ severity: 'success', summary: 'Éxito', detail: okMessage, life: 3000 });
        this.getClient(this.client.id);
      } else {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      }
    },

    aprove() {
      this.changeClientStatus(this.aproveClient, this.client.id, 'Client approval changed', 'Cliente aprobado', 'No se pudo aprobar el cliente');
    },

    disable() {
      this.changeClientStatus(this.disableClient, this.client.id, 'Client status changed', 'Cliente inactivo', 'No se pudo inactivar el cliente');
    },

    enable() {
      this.changeClientStatus(this.enableClient, this.client.id, 'Client status changed', 'Cliente activo', 'No se pudo activar el cliente');
    },

    edit() {
      this.$router.push(`/clients/${this.client.id}/edit`);
    }
  },

  computed: {
    ...mapState(useClient, ['client']),
    isApproved() { return this.client.approval },
    isEnabled() { return this.client.status === 'enabled' },
  },
}
</script>