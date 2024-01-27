<template>
    <div class="mb-4 flex">
        <Dropdown
            v-model="filter"
            :options="filterOptions"
            optionLabel="label"
            placeholder="Ver las garantías de"
            @change="warrantiesFilterChanged"
        />
        <!-- export excel-->


        <download-excel :data="excelObject">
            <Button class="ml-4 h-full">
                <font-awesome-icon icon="file-excel" />
            </Button>
        </download-excel>
    </div>
    <DataTable :value="warranties" tableStyle="min-width: 50rem" v-if="anyWarranties">
        <column header="Ereado el">
            <template #body="{ data }">
                <p>{{ new Date(data.created_at).toLocaleDateString() }}</p>
            </template>
        </column>
        <column field="client.name" header="Cliente"></column>
        <column field="item.code" header="Código de producto"></column>
        <column field="item.name" header="Descripción del producto"></column>
        <column field="quantity" header="UND"></column>
        <column field="notes" header="Observación"></column>
        <column field="status" header="Estado"></column>

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
</template>

<script>
import { useWarranty } from '../../store/warranty';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'WarrantyAll',

    //Cliente (nombre), Producto (code), Descripción del producto, UND, Observación, estado, enviado, 
    
    created(){
        useWarranty().getWarranties();
    },

    data(){
        return {
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
            ]
        }
    },

    methods: {
        ...mapActions(useWarranty, ['getWarranties', 'deleteWarranty']),

        warrantiesFilterChanged(){
            this.getWarranties(this.filter.value);
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
             this.getWarranties(this.filter.value);
         } else {
             this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la garantía', life: 3000 });
         }
        }
    },

    computed: {
        ...mapState(useWarranty, ['warranties']),

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