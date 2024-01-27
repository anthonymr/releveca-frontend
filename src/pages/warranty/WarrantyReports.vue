<template>
    <Dropdown :options="reports" v-model="selectedReport" placeholder="Seleccione un reporte" optionLabel="name" @change="getReportData" class="mb-4" />

    <DataTable :value="reportData" v-if="reportData">
        <Column v-for="column in tableColumns" :key="column" :field="column" :header="column"></Column>
    </DataTable>

</template>

<script>
    import { useWarranty } from '../../store/warranty';
    import { mapActions } from 'pinia';

    export default {
        name: 'WarrantyReports',

        data() {
            return {
                selectedReport: null,

                reportData: null,

                reports: [
                    {
                        name: 'Reportes por cliente',
                        component: 'WarrantyMostUsedItem'
                    },
                    {
                        name: 'Reportes por artículo',
                        component: 'WarrantyMostUsedClient'
                    },
                ]
            }
        },

        methods: {
            ...mapActions(useWarranty, ['groupedByClient', 'groupedByItem']),

            async getReportData(){
                switch(this.selectedReport.name){
                    case 'Reportes por cliente':
                        let clientsResult = (await this.groupedByClient()).payload;
                        const clients = Object.keys(clientsResult);
                        this.reportData = clients.map((client) => {
                            const warrantiesByStatus = clientsResult[client].reduce((acc, warranty) => {
                                if(!acc[warranty.status]){
                                    acc[warranty.status] = 0;
                                }

                                acc[warranty.status]++;

                                return acc;
                            }, {});

                            return {
                                'Cliente': client,
                                ...warrantiesByStatus
                            }
                        });
                        break;
                    case 'Reportes por artículo':
                        let result = (await this.groupedByItem()).payload;
                        const items = Object.keys(result);
                        this.reportData = items.map((item) => {
                            const warrantiesByStatus = result[item].reduce((acc, warranty) => {
                                if(!acc[warranty.status]){
                                    acc[warranty.status] = 0;
                                }

                                acc[warranty.status]++;

                                return acc;
                            }, {});

                            return {
                                'Artículo': item,
                                ...warrantiesByStatus
                            }
                        });
                        break;                    
                }
            }
        },

        computed: {
            tableColumns(){
                return this.selectedReport ? Object.keys(this.reportData[0]) : [];
            }
        }
    }
</script>