<template>
    <div class="mb-4 flex justify-content-between">
        <div class="flex">
            <span class="p-input-icon-left">
                <font-awesome-icon icon="search" />
                <InputText
                    v-model="globalFilter"
                    placeholder="Buscar garantía (enter)"
                    class="grouped-left w-28rem"
                    @keyup.enter="getWarranties(filter.value, complexFilters, globalFilter, globalFilterField, includeUpdatedAt)"
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

            <div class="flex justify-content-end align-items-center mx-4">
                <label for="switch1" class="text-gray-600 line-height-1 text-right mr-2">Incluir último<br> cambio</label>
                <InputSwitch v-model="includeUpdatedAt" inputId="switch1" />
            </div>
            

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

            <Button class="ml-2 h-full" severity="secondary" v-if="canDownloadPDFReport" @click="generatePdf">
                <font-awesome-icon icon="file-pdf" />
            </Button>

            <Button class="ml-2 h-full" severity="primary" @click="toNewWarrantyPage">
                <font-awesome-icon icon="plus" />
            </Button>
        </div>
    </div>
    <div v-if="anyWarranties" sortMode="multiple" class="table-container">
        <DataTable
            v-model:selection="selectedWarranties"
            :value="warranties"
            tableStyle="min-width: 50rem"
            tableClass="the-table"
            scrollable
            scrollHeight="flex"
            resizableColumns
            paginator
            reorderableColumns
            :rows="25"
            columnResizeMode="expand"
        >
            <Column selectionMode="multiple" headerStyle="width: 2rem"></Column>
            <column header="Creado" sortable headerClass="created-at-column">
                <template #header>
                </template>
                <template #body="{ data }">
                    <p>{{ new Date(data.created_at).toLocaleDateString() }}</p>
                </template>
            </column>
            <column header="Actualizado" sortable headerClass="created-at-column">
                <template #header>
                </template>
                <template #body="{ data }">
                    <p>{{ new Date(data.updated_at).toLocaleDateString() }}</p>
                </template>
            </column>
            <column field="client.name" header="Cliente" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column field="client.email" header="Correo" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column field="item.code" header="Código de producto" sortable headerClass="large-column" bodyClass="large-column"/>
            <column field="item.name" header="Descripción del producto" sortable headerClass="x-large-column" bodyClass="x-large-column"/>
            <column field="supplier.name" header="Proveedor" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column field="seller.name" header="Vendedor" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column field="quantity" header="UND" sortable />
            <column field="notes" header="Observación" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column field="notes2" header="Observación 2" sortable headerClass="medium-column" bodyClass="medium-column"/>
            <column header="Estado" sortable>
                <template #body="{ data }">
                    <span class="tag" :style="{ 'background-color': getStatusColor(data.status) }">
                        {{ data.status }}
                    </span>
                </template>
            </column>
            <Column>
            <template #body="{ data }">
                <Button
                    class="px-2 py-2 mr-2 small-btn"
                    severity="secondary"
                    v-if="data.files.length > 0"
                    @click="toggleAttachmentsMenu($event, data)"
                    aria-haspopup="true"
                    :aria-controls="`attachments-menu-${data.id}`"
                >
                    <font-awesome-icon icon="paperclip" />
                </Button>
                <Menu :ref="`menu-${data.id}`" :id="`attachments-menu-${data.id}`" :model="attachmentsMenuItems" :popup="true" class="w-max">
                    <template #item="{ item }">
                        <div class="flex gap-2 p-2 align-items-center cursor-pointer select-none">
                            <font-awesome-icon :icon="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </div>
                    </template>
                </Menu>

                <Button class="px-2 py-2 mr-2 small-btn" :class="{'no-files': data.files_count == 0}" severity="info" @click="goToWarranty(data)">
                    <font-awesome-icon icon="edit" />
                </Button>
                <Button class="px-2 py-2 small-btn" severity="danger" @click="removeWarranty(data)">
                    <font-awesome-icon icon="trash" />
                </Button>
            </template>
            </Column>
        </DataTable>
    </div>
    <div v-else class="w-full h-12rem flex justify-content-center align-items-center text-400">
        <p>No hay garantías que cumplan con los parámetros de búsqueda</p>
    </div>
    <WarrantyFilterModal
        :show-filters-modal="showFiltersModal"
        @cancel="showFiltersModal = false"
        @save="saveComplexFilters"
    />
</template>

<script>
import WarrantyFilterModal from '../../components/warranty/WarrantyFilterModal.vue';
import { backEndURL } from '../../services/Service'

import { useWarranty } from '../../store/warranty';
import { mapState, mapActions, mapWritableState  } from 'pinia';

import { jsPDF } from "jspdf";

import logo from '../../assets/lyc_small.png';

export default {
    name: 'WarrantyAll',

    components: { WarrantyFilterModal },
    
    async created(){
        this.$toast.add({ severity: 'info', summary: 'Cargando', detail: 'Cargando garantías' });
        await Promise.all([
            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField, this.includeUpdatedAt),
            this.getWarrantyStates()
        ]);
        this.$toast.removeAllGroups();
    },

    data(){
        return {
            selectedWarranties: [],
            // sortingDirection: 'asc',
            // globalFilter: '',
            // globalFilterField: 'client_name',
            columnsToSearch: [
                { label: 'Buscando por: Cliente', value: 'client_name' },
                { label: 'Buscando por: Código de producto', value: 'item_code' },
                { label: 'Buscando por: Descripción del producto', value: 'item_name' },
                { label: 'Buscando por: Observación', value: 'notes' },
                { label: 'Buscando por: Observación 2', value: 'notes2' },
                { label: 'Buscando por: Estado', value: 'status' },
                { label: 'Buscando por: Proveedor', value: 'supplier_name'},
                { label: 'Buscando por: Vendedor', value: 'seller_name'}
            ],

            showFiltersModal: false,
            // includeUpdatedAt: false,

            // complexFilters: {
            //     fromDate: null,
            //     toDate: null,
            //     selectedClients: [],
            //     selectedItems: [],
            // },

            // filter: { label: 'Ver las garantías de hoy', value: 'today' },
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

            attachmentsMenuItems: [],
        }
    },

    methods: {
        ...mapActions(useWarranty, ['getWarranties', 'deleteWarranty', 'getWarrantyStates', 'getWarranty']),

        generatePdf(){
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'letter',
            });

            const img = new Image();
            img.src = logo;
            const imgWidth = img.width;
            const imgHeight = img.heigh;

            doc.addImage(img, 'PNG', 5, 5, imgWidth / 3, imgHeight / 3);

            doc.setFontSize(11);
            const today = new Date().toLocaleDateString().split('/').reverse().join('-');
            this.pdfTextRight(doc, today, 15);

            doc.setFontSize(18);
            this.pdfTextCenter(doc, 'ORDEN DE RETIRO', 30);

            const client = this.selectedWarranties[0].client;
            doc.setFontSize(12);
            this.pdfTextLeft(doc, `Cliente:   ${client.name}`, 45);
            this.pdfTextLeft(doc, `Teléfono:   ${client.phone}`, 50);
            this.pdfTextLeft(doc, `Dirección de retiro:`, 55);

            let splitedAddress = doc.splitTextToSize(client.address, 255);
            this.pdfTextLeft(doc, splitedAddress, 60);

            this.pdfTextRight(doc, `Canidad`, 77);
            let y = 85;
            doc.line(15, 80, 265, 80);
            this.selectedWarranties.forEach(warranty => {
                this.pdfTextLeft(doc, `${warranty.item.code} ${warranty.item.name}`, y);
                this.pdfTextRight(doc, `${warranty.quantity}`, y);
                doc.line(15, y + 2, 265, y + 2);
                y += 7;
            });

            let total = this.selectedWarranties.reduce((acc, warranty) => acc + parseFloat(warranty.quantity), 0);
            total = total.toFixed(1);
            this.pdfTextRight(doc, `Total: ${total}`, y);

            const docMaxVertical = doc.internal.pageSize.getHeight();

            this.pdfTextLeft(doc, 'FIRMA Y SELLO DEL CLIENTE:', docMaxVertical - 50);
            doc.line(85, docMaxVertical - 30, 200, docMaxVertical - 30);

            doc.setFontSize(10);
            this.pdfTextCenter(doc, 'Calle 07 Local Nro 07-07 Urb El Danto, Sector el Danto', docMaxVertical - 20);
            this.pdfTextCenter(doc, 'Teléfonos: 0424-6465902/0414-6557902', docMaxVertical - 15);
            this.pdfTextCenter(doc, 'E-mail: lyc.ca.ventas@gmail.com', docMaxVertical - 10);

            doc.save("a4.pdf");
        },

        pdfTextRight(doc, text, y){
            const textX = doc.internal.pageSize.getWidth() - 15;

            doc.text(text, textX, y, { align: 'right' });
        },

        pdfTextCenter(doc, text, y){
            const textX = doc.internal.pageSize.getWidth() / 2;

            doc.text(text, textX, y, { align: 'center' });
        },

        pdfTextLeft(doc, text, y){
            const textX = 15;

            doc.text(text, textX, y, { align: 'left' })
        },

        toggleAttachmentsMenu(event, warranty){
            this.attachmentsMenuItems = warranty.files.map(file => {
                return {
                    icon: this.fileIcon(file.blob.content_type),
                    label: file.blob.filename,
                    command: () => this.goToFile(warranty, file)
                }
            });
            this.$refs[`menu-${warranty.id}`].toggle(event);
        },

        async goToFile(warranty, file){
            const result = await this.getWarranty(warranty.id);
            const url = result.payload.files_urls.find(f => f.endsWith(file.blob.filename));
            window.open(backEndURL + url, '_blank');
        },

        getStatusColor(status){
            return '#' + this.warrantyStates.find(state => state.name === status)?.color;
        },

        fileIcon(contenType){
            switch(contenType){
                case 'image/png':
                case 'image/jpeg':
                    return 'fa-file-image';
                case 'application/pdf':
                    return 'fa-file-pdf';
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    return 'fa-file-word';
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    return 'fa-file-excel';
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    return 'fa-file-powerpoint';
                default:
                    return 'fa-file';
            }
        },

        globalFilterFieldChanged(){
            if(this.globalFilter === '') return;

            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField, this.includeUpdatedAt);
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
            
            this.getWarranties(filters, this.complexFilters, this.globalFilter, this.globalFilterField, this.includeUpdatedAt);

            this.showFiltersModal = false;
        },

        warrantiesFilterChanged(){
            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField, this.includeUpdatedAt);
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
             this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField, this.includeUpdatedAt);
         } else {
             this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la garantía', life: 3000 });
         }
        }
    },

    computed: {
        ...mapState(useWarranty, ['warranties', 'warrantyStates', 'fetchingWarranties']),
        ...mapWritableState(useWarranty, ['sortingDirection', 'globalFilter', 'globalFilterField', 'includeUpdatedAt', 'complexFilters', 'filter']),

        canDownloadPDFReport(){
            // check if all selected warranties are from the same client
            if(this.selectedWarranties.length === 0) return false;

            const client = this.selectedWarranties[0].client;

            return this.selectedWarranties.every(warranty => warranty.client.id === client.id);
        },

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
                    'Actualizado el': new Date(warranty.updated_at).toLocaleDateString(),
                    'Cliente': warranty.client.name,
                    'Proveedor': warranty.supplier.name,
                    'Vendedor': warranty.seller.name,
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
        },

    },

    watch: {
        fetchingWarranties(value){
            if(value) this.$toast.add({ severity: 'info', summary: 'Cargando', detail: 'Cargando garantías' });
            else this.$toast.removeAllGroups();
        },
        
        includeUpdatedAt(value){
            this.getWarranties(this.filter.value, this.complexFilters, this.globalFilter, this.globalFilterField, value);
        }
    }
}
</script>

<style>
.created-at-column {
    width: 120px !important;
    min-width: 120px !important;
    max-width: 120px !important;
}

.medium-column {
    width: 150px !important;
    min-width: 150px !important;
    max-width: 150px !important;

}

.large-column {
    width: 180px !important;
    min-width: 180px !important;
    max-width: 180px !important;
}

.x-large-column {
    width: 200px !important;
    min-width: 200px !important;
    max-width: 200px !important;
}
</style>

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

:deep(.p-datatable-thead),
:deep(.p-datatable-tbody){
    font-size: 13px !important;
}

:deep(.p-datatable-table){
    border-left: 1px solid #e0e0e0 !important;
    border-top: 1px solid #e0e0e0 !important;
}

:deep(.p-datatable-thead th),
:deep(.p-datatable-tbody td){
    padding: 0 5px !important;
    /* wrapp text */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #e0e0e0 !important;
}

:deep(.p-datatable-thead th){
    padding: 15px 5px !important;
}

:deep(.tag){
    font-size: 10px !important;
    padding: 1px 4px !important;
}

:deep(.p-button.small-btn) {
    font-size: 13px !important;
    padding: 3px !important
}

.btn-space {
    width: 32px;
}

.no-files {
    margin-left: 27px
}

.table-container {
    height: calc(100vh - 250px);
}
</style>