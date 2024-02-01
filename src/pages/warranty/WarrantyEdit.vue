<template>
    <WarrantyForm
        :clients="clients"
        :items="items"
        :states="warrantyStates"

        v-model:client="client"
        v-model:item="item"
        v-model:qty="qty"
        v-model:notes="notes"
        v-model:status="status"

        :editing="true"

        @edit="editWarranty"
        @remove-status="removeStatus"
        @new-status="createNewStatus"
    ></WarrantyForm>
</template>

<script>
import WarrantyForm from '../../components/forms/WarrantyForm.vue';
import { useClient } from '../../store/client';
import { useItem } from '../../store/items';
import { useWarranty } from '../../store/warranty';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'WarrantyEdit',

    components: { WarrantyForm },

    data(){
        return {
            client: null,
            item: null,
            qty: 0,
            notes: '',
            status: null,

            warrantyId: this.$route.params.id,
            warranty: null,
        }
    },

    async created(){
        await this.getClients();
        await this.getItems();
        await this.getWarrantyStates();
        this.warranty = (await this.getWarranty(this.warrantyId)).payload;
        this.fillFields();
    },

    methods: {
        ...mapActions(useClient, ['getClients']),
        ...mapActions(useItem, ['getItems']),
        ...mapActions(useWarranty, ['getWarranty', 'getWarrantyStates', 'deleteWarrantyState', 'createWarrantyState', 'updateWarranty']),

        fillFields(){
            this.client = this.clients.find(client => client.id === this.warranty.client_id);

            this.item = this.items.find(item => item.id === this.warranty.item_id);
            this.status = this.warrantyStates.find(state => state.name === this.warranty.status);
            this.qty = this.warranty.quantity;
            this.notes = this.warranty.notes;
        },

        async editWarranty(errors){
            if(errors.length > 0) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos', life: 3000 });
                return;
            }

            let result = null;

            try {
                result = await this.updateWarranty(
                    this.warrantyId,
                {
                    client_id: this.client.id,
                    item_id: this.item.id,
                    quantity: this.qty,
                    notes: this.notes,
                    status: this.status.name,
                });
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar la garantía', life: 3000 });
                return;
            }

            if(result.message === 'Warranty updated') {
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Garantía editada correctamente', life: 3000 });
                this.$router.push('/warranty/all');
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar la garantía', life: 3000 });
            }
        },

        async createNewStatus(){
            let newStatusName = prompt('Ingrese el nombre del nuevo estado');

            if(!newStatusName) {
                return;
            }
            
            let newStatus = null;

            try {
                newStatus = await this.createWarrantyState(newStatusName);
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el nuevo estado', life: 3000 });
                return;
            }

            if(newStatus.message === 'Warranty state created') {
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Estado creado correctamente', life: 3000 });
                this.getWarrantyStates();
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el nuevo estado', life: 3000 });
            }
        },

        async removeStatus(status){
            if(!confirm('¿Está seguro que desea eliminar este estado?')) return;

            let result = '';

            try {
                result = await this.deleteWarrantyState(status.id);
            } catch (error) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estado', life: 3000 });
                return
            }

            if(result.message === 'Warranty state deleted') {
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Estado eliminado correctamente', life: 3000 });
                this.getWarrantyStates();
            } else {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el estado', life: 3000 });
            }
        },
    },

    computed: {
        ...mapState(useClient, ['clients']),
        ...mapState(useItem, ['items']),
        ...mapState(useWarranty, ['warrantyStates']),
    },
}


</script>