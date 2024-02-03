<template>
    <div class="mb-4 flex justify-content-between">
        <div class="flex">
            <span class="p-input-icon-left">
                <font-awesome-icon icon="search" />
                <InputText
                    v-model="globalFilter"
                    placeholder="Buscar garantía (enter)"
                    class="grouped-left w-28rem"
                    @keyup.enter="getWarranties(filter.value, complexFilters, globalFilter, globalFilterField)"
                />
            </span>
            
            <Dropdown
                :options="columnsToSearch"
                optionLabel="label"
                optionValue="value"
                placeholder="Buscar por"
                class="mr-2 grouped-right surface-100"
                v-model="globalFilterField"
                @change="globalFilterFieldChanged"
            />
        </div>
        <div class="flex align-items-center text-gray-600 font-normal">
            <span class="mr-2 text-sm font-light">
                Mostrando <span class="text-color font-bold mx-1">{{ warranties.length }}</span> garantías
            </span>

            <Button class="ml-2 h-full grouped-left" :severity="anyComplexFilters ? 'success' : 'secondary'" @click="showFiltersModal = true">
                <font-awesome-icon icon="filter" />
            </Button>
            <Dropdown
                class="grouped-right"
                v-model="filter"
                :options="filterOptions"
                optionLabel="label"
                placeholder="Ver las garantías de"
                :disabled="disableFilter"
                @change="warrantiesFilterChanged"
            />

            <download-excel :data="excelObject" class="h-full">
                <Button class="ml-2 h-full" severity="secondary">
                    <font-awesome-icon icon="file-excel" />
                </Button>
            </download-excel>
            <Button class="ml-2 h-full" severity="primary" @click="toNewWarrantyPage">
                <font-awesome-icon icon="plus" />
            </Button>
        </div>
    </div>
    <DataTable :value="warranties" tableStyle="min-width: 50rem" v-if="anyWarranties" sortMode="multiple">
        <column header="Creado el" sortable>
            <template #header>
            </template>
            <template #body="{ data }">
                <p>{{ new Date(data.created_at).toLocaleDateString() }}</p>
            </template>
        </column>
        <column field="client.name" header="Cliente" sortable />
        <column field="item.code" header="Código de producto" sortable />
        <column field="item.name" header="Descripción del producto" sortable />
        <column field="quantity" header="UND" sortable />
        <column field="notes" header="Observación" sortable />
        <column header="Estado" sortable>
            <template #body="{ data }">
                <span class="tag" :style="{ 'background-color': getStatusColor(data.status) }">
                    {{ data.status }}
                </span>
            </template>
        </column>
        <Column>
          <template #body="{ data }">
            <Button class="px-2 py-2 mr-2" severity="info" @click="goToWarranty(data)">
                <font-awesome-icon icon="edit" />
            </Button>
            <Button class="px-2 py-2" severity="danger" @click="removeWarranty(data)">
                <font-awesome-icon icon="trash" />
            </Button>
          </template>
        </Column>
    </DataTable>
    <div v-else class="w-full h-12rem flex justify-content-center align-items-center text-400">
        <p>No hay garantías registradas</p>
    </div>
    <WarrantyFilterModal
        :show-filters-modal="showFiltersModal"
        @cancel="showFiltersModal = false"
        @save="saveComplexFilters"
    />
</template>

<script>
import WarrantyFilterModal from '../../components/warranty/WarrantyFilterModal.vue';

import { useWarranty } from '../../store/warranty';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'WarrantyAll',

    components: { WarrantyFilterModal },
    
    created(){
        this.getWarranties(this.filter.value, this.complexFilters,  this.globalFilter, this.globalFilterField);
        this.getWarrantyStates();
    },

    data(){
        return {
            sortingDirection: 'asc',
            globalFilter: '',
            globalFilterField: 'client_name',
            columnsToSearch: [
                { label: 'Buscando por: Cliente', value: 'client_name' },
                { label: 'Buscando por: Código de producto', value: 'item_code' },
                { label: 'Buscando por: Descripción del producto', value: 'item_name' },
                { label: 'Buscando por: Observación', value: 'notes' },
                { label: 'Buscando por: Estado', value: 'status' },
            ],

            showFiltersModal: false,

            complexFilters: {
                fromDate: null,
                toDate: null,
                selectedClients: [],
                selectedItems: [],
            },

            filter: { label: 'Ver las garantías de hoy', value: 'today' },
            filterOptions: [
                { label: 'Ver las garantías de hoy', value: 'today' },
                { label: 'Ver las garantías de ayer', value: 'yesterday'},
                { label: 'Ver las garantías de esta semana', value: 'week' },
                { label: 'Ver las garantías de la semana pasada', value: 'lastWeek'},
                { label: 'Ver las garantías de este mes', value: 'month' },
                { label: 'Ver las garantías del mes pasado', value: 'lastMonth' },
                { label: 'Ver las garantías de este año', value: 'year' },
                { label: 'Ver todas las garantías', value: 'all' },
            ],
            disableFilter: false,
        }
    },

    methods: {
        ...mapActions(useWarranty, ['getWarranties', 'deleteWarranty', 'getWarrantyStates']),

        getStatusColor(status){
            return '#' + this.warrantyStates.find(state => state.name === status)?.color;
        },

        globalFilterFieldChanged(){
            if(this.globalFilter === '') return;

            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField);
        },

        toNewWarrantyPage(){
            this.$router.push({ name: 'Nueva garantía' });
        },

        saveComplexFilters(filters){
            this.complexFilters = filters;

            if(this.complexFilters.toDate && this.complexFilters.fromDate) {
                this.filter = { label: 'Ver todas las garantías', value: 'all' };
                this.disableFilter = true;
            } else {
                this.disableFilter = false;
                this.complexFilters.fromDate = null;
                this.complexFilters.toDate = null;
            }
            
            this.getWarranties(filters, this.complexFilters, this.globalFilter, this.globalFilterField);

            this.showFiltersModal = false;
        },

        warrantiesFilterChanged(){
            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField);
        },

        goToWarranty(warranty){
            this.$router.push({ name: 'Ver garantía', params: { id: warranty.id } });
        },

        async removeWarranty(warranty){
         if(!confirm('¿Está seguro que desea eliminar esta garantía?')) return;

         let result = '';

         try {
             result = await this.deleteWarranty(warranty.id);
         } catch (error) {
             this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la garantía', life: 3000 });
             return
         }

         if(result.message === 'Warranty deleted') {
             this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Garantía eliminada correctamente', life: 3000 });
             this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField);
         } else {
             this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la garantía', life: 3000 });
         }
        }
    },

    computed: {
        ...mapState(useWarranty, ['warranties', 'warrantyStates']),

        anyComplexFilters(){
            return this.complexFilters.fromDate ||
                this.complexFilters.toDate ||
                this.complexFilters.selectedClients.length > 0 ||
                this.complexFilters.selectedItems.length > 0;
        },

        excelObject(){
            return this.warranties.map(warranty => {
                return {
                    'Creado el': new Date(warranty.created_at).toLocaleDateString(),
                    'Cliente': warranty.client.name,
                    'Código de producto': warranty.item.code,
                    'Descripción del producto': warranty.item.name,
                    'UND': warranty.quantity,
                    'Observación': warranty.notes,
                    'Estado': warranty.status,
                }
            })
        },

        anyWarranties(){
            return this.warranties.length > 0;
        }
    }
}
</script>

<style scoped>
.grouped-left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

:deep(.grouped-right.p-dropdown) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-left: 0 !important;
}

.tag {
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    color: black;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    display: inline-block;
    margin: 0.5rem 0;
}
</style>