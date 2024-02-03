<template>
    <WarrantyForm
        :clients="allClients.items"
        :items="allItems.items"
        :states="warrantyStates"

        v-model:client="client"
        v-model:item="item"
        v-model:qty="qty"
        v-model:notes="notes"
        v-model:status="status"

        @create="createNewWarranty"
        @remove-status="removeStatus"
        @new-status="displayNewStatusModal"
    ></WarrantyForm>
    <WarrantyStatusModal
        :showStatusModal="showStatusModal"
        @cancel="showStatusModal = false"
        @create="createNewStatus"
    />
</template>

<script>
import WarrantyForm from '../../components/forms/WarrantyForm.vue';
import WarrantyStatusModal from '../../components/warranty/WarrantyStatusModal.vue';
import { useClient } from '../../store/client';
import { useItem } from '../../store/items';
import { useWarranty } from '../../store/warranty';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'WarrantyNew',

    components: { 
        WarrantyForm,
        WarrantyStatusModal
    },

    data(){
        return {
            client: null,
            item: null,
            qty: 0,
            notes: '',
            status: null,
            showStatusModal: false,
        }
    },

    created(){
        this.getAllClients();
        this.getAllItems();
        this.getWarrantyStates();
    },

    methods: {
        ...mapActions(useClient, ['getAllClients']),
        ...mapActions(useItem, ['getAllItems']),
        ...mapActions(useWarranty, ['createWarranty', 'getWarrantyStates', 'deleteWarrantyState', 'createWarrantyState']),

        displayNewStatusModal(){
            this.showStatusModal = true;
        },

        async createNewStatus({ name, color }){
            console.log(name, color);
            
            if(!name || !color) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar el nombre y el color del estado', life: 3000 });
                return;
            }

            let newStatus = null;

            try {
                newStatus = await this.createWarrantyState({ name, color });
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el estado', life: 3000 });
                return;
            }

            if(newStatus.message === 'Warranty state created') {
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Estado creado correctamente', life: 3000 });
                this.getWarrantyStates();
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el estado', life: 3000 });
            }

            this.showStatusModal = false;
        },

        async removeStatus(status){
            if(confirm(`¿Está seguro de eliminar el estado ${status.name}?`)) {
              let result = null;

              try {
                result = await this.deleteWarrantyState(status.id);
              } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estado', life: 3000 });
                return;
              }

              if(result.message === 'Warranty state deleted'){
                  this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Estado eliminado correctamente', life: 3000 });
                  this.getWarrantyStates();
              } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estado', life: 3000 });
              }
            }
        },

        async createNewWarranty(errors){
            if(errors.length > 0) {
                return;
            }

            const warranty = {
                client_id: this.client.id,
                item_id: this.item.id,
                quantity: this.qty,
                notes: this.notes,
                status: this.status.name,
            }

            let newWarranty = null;

            try {
                newWarranty = await this.createWarranty(warranty);
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la garantía', life: 3000 });
                return;
            }

            if(newWarranty.message === 'Warranty created') {
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Garantía creada correctamente', life: 3000 });
                this.$router.push('/warranty/all');
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la garantía', life: 3000 });
            }
        }
    },

    computed: {
        ...mapState(useClient, ['allClients']),
        ...mapState(useItem, ['allItems']),
        ...mapState(useWarranty, ['warrantyStates']),
    }
}
</script>