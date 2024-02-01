<template>
    <Dialog v-model:visible="visible" modal header="Filtros" :style="{ 'max-width': '900px', width: '100%' }">
        <div class="field">
            <label for="client">Mostrar garantía de los clientes:</label>
            <MultiSelect
                display="chip"
                v-model="selectedClients"
                :options="allClients.items"
                optionLabel="name"
                filter
                showClear 
                :style="{ width: '100%' }"
                :virtualScrollerOptions="{ itemSize: 38 }"
            >
                <template #chip="{value}">
                    <div class="custom-chip">
                        <span>{{ value.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </div>
        <div class="field">
            <label for="client">Mostrar garantía de los artículos:</label>
            <MultiSelect
                display="chip"
                v-model="selectedItems"
                :options="allItems.items"
                optionLabel="name"
                filter
                showClear 
                :style="{ width: '100%' }"
                :virtualScrollerOptions="{ itemSize: 38 }"
            >
                <template #chip="{value}">
                    <div class="custom-chip">
                        <span>{{ value.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </div>

        <div class="field">
            <!-- from date to date-->

            <div class="flex gap-4">
                <div class="field">
                    <label for="fromDate">Mostrar desde:</label>
                    <Calendar v-model="fromDate" :style="{ width: '100%' }" showButtonBar  />
                </div>
                <div class="field">
                    <label for="toDate">Mostrar hasta:</label>
                    <Calendar v-model="toDate" :style="{ width: '100%' }" showButtonBar  />
                </div>
            </div>
        </div>

        <div class="flex justify-content-end">
            <Button label="Cancelar" class="mr-2 p-button-secondary" @click="doCancel" />
            <Button label="Limpiar filtros" class="mr-2 p-button-secondary" @click="doClean" />
            <Button label="Aplicar filtros" class="p-button-success" @click="doSave" />
        </div>
    </Dialog>
</template>

<script>
import { useClient } from '../../store/client';
import { useItem } from '../../store/items';
import { mapState, mapActions } from 'pinia';

export default {
    props: {
        showFiltersModal: {
            type: Boolean,
            default: false
        }
    },

    data: () => {
        return {
            visible: false,
            selectedClients: [],
            selectedItems: [],
            fromDate: null,
            toDate: null
        }
    },

    created() {
        this.getAllClients();
        this.getAllItems();
    },

    methods: {
        ...mapActions(useClient, ['getAllClients']),
        ...mapActions(useItem, ['getAllItems']),

        doSave() {
            // compare from and to dates and order them
            let fromDate = this.fromDate;
            let toDate = this.toDate;

            if(fromDate && toDate) {
                if(fromDate > toDate) {
                    let temp = fromDate;
                    fromDate = toDate;
                    toDate = temp;
                }
            }

            this.$emit('save', {
                selectedClients: this.selectedClients,
                selectedItems: this.selectedItems,
                fromDate: fromDate,
                toDate: toDate
            });
        },

        doCancel() {
            this.doClean();
            this.visible = false;
            this.$emit('cancel');
        },

        doClean() {
            this.selectedClients = [];
            this.selectedItems = [];
            this.fromDate = null;
            this.toDate = null;
        }
    },

    computed: {
        ...mapState(useClient, ['allClients']),
        ...mapState(useItem, ['allItems']),
    },

    watch: {
        showFiltersModal(newValue) {
            this.visible = newValue;
        },
        visible(newValue) {
            if(!newValue) {
                this.$emit('cancel');
            }
        }
    }
}
</script>

<style scoped>
.custom-chip{
    padding: 0;
    font-size: 11px;
    line-height: 11px;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:deep(.p-multiselect-token) {
    padding: 3px 7px !important;
}
</style>