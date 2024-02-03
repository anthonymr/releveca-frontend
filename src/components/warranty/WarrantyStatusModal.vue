<template>
    <Dialog v-model:visible="visible" modal header="Nuevo estado de garantía" :style="{ 'max-width': '600px', width: '100%' }">
        <div class="field flex">
            <ColorPicker v-model="newStatusColor" class="color-picker" format="hex" />
            <InputText v-model="newStatusName" class="name-input" :style="{ width: '100%' }" placeholder="Nombre del estado" />
        </div>

        <div class="flex justify-content-end">
            <Button label="Cancelar" class="mr-2 p-button-secondary" @click="doCancel" />
            <Button label="Crear" class="p-button-success" @click="doCreate" />
        </div>
    </Dialog>
</template>

<script>
    export default {
        props: {
            showStatusModal: {
                type: Boolean,
                default: false
            },
        },

        data(){
            return {
                visible: false,
                newStatusName: '',
                newStatusColor: '',
            }
        },

        created(){
            this.newStatusColor = this.randomHEXColor;
        },

        methods: {
            doCancel(){
                this.$emit('cancel');
            },

            doCreate(){
                this.$emit('create', {
                    name: this.newStatusName,
                    color: this.newStatusColor
                });
            }
        
        },

        computed: {
            randomHEXColor() {
                this.visible = this.visible;
                var letters = '0123456789ABCDEF'.split('');
                var color = '';
                var randletters = letters[Math.round(Math.random() * 10) + 5] + letters[Math.round(Math.random() * 10) + 5];
                switch (Math.round(Math.random() * 6)) {
                    case 0:
                        color += randletters + 'FF55'; break;
                    case 1:
                        color += randletters + '55FF'; break;
                    case 2:
                        color += 'FF' + randletters + '55'; break;
                    case 3:
                        color += '55' + randletters + 'FF'; break;
                    case 4:
                        color += 'FF55' + randletters; break;
                    default:
                        color += '55FF' + randletters; break;
                }
                return color;
            }
        },

        watch: {
            showStatusModal(newValue) {
                this.visible = newValue;
            },
            visible(newValue) {
                this.newStatusColor = this.randomHEXColor;
                this.newStatusName = '';

                if(!newValue) {
                    this.$emit('cancel');
                }
            }
        }
    }
</script>

<style scoped>
:deep(.p-colorpicker-preview) {
    width: 47px;
    height: 47px !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.name-input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
}
</style>