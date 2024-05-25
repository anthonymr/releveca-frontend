<template>
    <WarrantyForm
        :clients="allClients.items"
        :items="allItems.items"
        :states="warrantyStates"
        :suppliers="allSuppliers.items"
        :sellers="allSellers.items"

        v-model:client="client"
        v-model:item="item"
        v-model:qty="qty"
        v-model:notes="notes"
        v-model:notes2="notes2"
        v-model:status="status"
        v-model:supplier="supplier"
        v-model:seller="seller"
        v-model:files="files"
        v-model:category="category"
        v-model:reported="reported"

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
import { useSupplier } from '../../store/suppliers';
import { useWarranty } from '../../store/warranty';
import { useSeller } from '../../store/sellers';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'WarrantyEdit',

    components: { WarrantyForm },

    data(){
        return {
            client: null,
            item: null,
            supplier: null,
            seller: null,
            qty: 0,
            notes: '',
            notes2: '',
            status: null,
            files: [],
            category: '',
            reported: false,

            warrantyId: this.$route.params.id,
            warranty: null,
        }
    },

    async created(){
        try {
            this.$toast.add({ severity: 'info', summary: 'Cargando', detail: 'Cargando información de la garantía' });
            await Promise.all([
                this.getAllClients(),
                this.getAllItems(),
                this.getWarrantyStates(),
                this.getAllSuppliers(),
                this.getAllSellers(),
            ]);
            this.$toast.removeAllGroups();
            this.warranty = (await this.getWarranty(this.warrantyId)).payload;
        } catch (error) {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la garantía', life: 3000 });
            return;
        }
        this.fillFields();
    },

    methods: {
        ...mapActions(useClient, ['getAllClients']),
        ...mapActions(useItem, ['getAllItems']),
        ...mapActions(useSupplier, ['getAllSuppliers']),
        ...mapActions(useSeller, ['getAllSellers']),
        ...mapActions(useWarranty, ['getWarranty', 'getWarrantyStates', 'deleteWarrantyState', 'createWarrantyState', 'updateWarranty']),

        fillFields(){
            this.client = this.allClients.items.find(client => client.id === this.warranty.client_id);
            this.item = this.allItems.items.find(item => item.id === this.warranty.item_id);
            this.status = this.warrantyStates.find(state => state.name === this.warranty.status);
            this.supplier = this.allSuppliers.items.find(supplier => supplier.id === this.warranty.supplier_id);
            this.seller = this.allSellers.items.find(seller => seller.id === this.warranty.seller_id);
            this.qty = parseFloat(this.warranty.quantity);
            this.notes = this.warranty.notes;
            this.notes2 = this.warranty.notes2;
            this.category = this.warranty.categories;
            this.reported = this.warranty.reported;
        },

        async editWarranty(errors){
            if(errors.length > 0) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos', life: 3000 });
                return;
            }

            if(!this.client.id || ! this.item.id || ! this.qty || !this.status.name) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos', life: 3000 });
                return;
            }

            let result = null;

            try {

                const warranty = new FormData();

                warranty.append('warranty[client_id]', this.client.id);
                warranty.append('warranty[item_id]', this.item.id);
                warranty.append('warranty[supplier_id]', this.supplier.id);
                warranty.append('warranty[seller_id]', this.seller.id);
                warranty.append('warranty[quantity]', this.qty);
                warranty.append('warranty[notes]', this.notes);
                warranty.append('warranty[notes2]', this.notes2);
                warranty.append('warranty[status]', this.status.name);
                warranty.append('warranty[categories]', this.category);
                warranty.append('warranty[reported]', this.reported);

                this.files.forEach(file => {
                    warranty.append('warranty[files][]', file);
                });


                result = await this.updateWarranty(
                    this.warrantyId,
                    warranty
                );
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
        ...mapState(useClient, ['allClients']),
        ...mapState(useItem, ['allItems']),
        ...mapState(useWarranty, ['warrantyStates']),
        ...mapState(useSupplier, ['allSuppliers']),
        ...mapState(useSeller, ['allSellers']),
    },
}


</script>
