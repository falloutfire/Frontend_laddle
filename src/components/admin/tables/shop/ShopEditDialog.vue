<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2">{{ itemName }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-text-field
                                label="Логин"
                                v-model="value.shopId"
                        ></v-text-field>
                        <v-text-field
                                label="Логин"
                                v-model="value.login"
                        ></v-text-field>
                        <v-text-field
                                label="Логин"
                                v-model="value.firstName"
                        ></v-text-field>
                        <v-text-field
                                label="Логин"
                                v-model="value.secondName"
                        ></v-text-field>
                        <v-text-field
                                label="Логин"
                                v-model="value.middleName"
                        ></v-text-field>




                                            </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="$emit('close')">Cancel</v-btn>
                <v-btn color="blue darken-1" :loading="saveLoading" flat @click="$emit('apply')">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import HTTP from "@/http";
    import lodash from 'lodash';

    export default {
        name: "UserEditDialog",
        props: {
            value: Object,
            fieldsDescription: Object,
            isOpen: Boolean,
            saveLoading: Boolean,
            itemName: String,
        },
        data() {
            return {
                items: {},
                dialog: false,
            }
        },
        mounted() {
            console.log(this.value);
        },
        methods: {
            zoneEditorInput(value) {
                const newValue = lodash.cloneDeep(this.value);
                newValue.zones = value.zones.slice();
                this.$emit('input', newValue);
            },
            choosePhoto(value, key) {
                const reader = new FileReader();
                reader.readAsBinaryString(document.getElementById('fileInput').files[0]);

                reader.onload = () => {
                    const newValue = lodash.cloneDeep(value);
                    newValue[key] = btoa(reader.result);
                    this.$emit('input', newValue);
                };
                reader.onerror = function() {
                    console.log('there are some problems');
                };
            },
            openDialog() {
                this.dialog = true;
            },
            getV(src) {
                return `data:image/jpeg;base64,${src}`;
            },
            async retrieveSelectable(fields) {
                fields.filter(([, descr]) => {
                    return descr['descriptionFieldType'] === 'selectField';
                }).forEach(([key, descr]) => {
                    HTTP.get(descr['urlToGetSelectables']).then(response => {
                        this.items[key] = response.data.result
                    })
                })
            },
        },
        computed: {
            fields() {
                const fields = Object.entries(this.fieldsDescription).filter(([, descr]) => {
                    return descr['editableField'] !== undefined ? descr['editableField'] : true;
                });
                fields.forEach(([key,]) => {
                    this.items[key] = [];
                });
                this.retrieveSelectable(fields);
                return fields;
            },
        },
    }
</script>

<style scoped>

</style>
