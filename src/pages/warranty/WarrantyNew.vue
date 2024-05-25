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
import { useSupplier } from '../../store/suppliers';
import { useWarranty } from '../../store/warranty';
import { useSeller } from '../../store/sellers';
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
            supplier: null,
            seller: null,
            item: null,
            qty: 0,
            notes: '',
            notes2: '',
            status: null,
            showStatusModal: false,
            files: [],
            category: '',
            reported: false,
        }
    },

    created(){
        this.getAllClients();
        this.getAllItems();
        this.getWarrantyStates();
        this.getAllSuppliers();
        this.getAllSellers();
    },

    methods: {
        ...mapActions(useClient, ['getAllClients']),
        ...mapActions(useItem, ['getAllItems']),
        ...mapActions(useSupplier, ['getAllSuppliers']),
        ...mapActions(useSeller, ['getAllSellers']),
        ...mapActions(useWarranty, ['createWarranty', 'getWarrantyStates', 'deleteWarrantyState', 'createWarrantyState']),

        displayNewStatusModal(){
            this.showStatusModal = true;
        },

        async createNewStatus({ name, color }){
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
        ...mapState(useSupplier, ['allSuppliers']),
        ...mapState(useSeller, ['allSellers']),
        ...mapState(useWarranty, ['warrantyStates']),
    }
}
</script>