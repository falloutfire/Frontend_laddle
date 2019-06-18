<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Свойства</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-flex xs12 sm3>
                    <v-text-field class="ml-3 mt-2"
                                  v-model="search"
                                  label="Фильтр по имени пользователя" clearable></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="openCreatePropertyDialog">Новое свойство</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete property?</span>
                            </v-layout>
                        </v-card-title>
                        <v-card-actions>
                            <v-layout row wrap justify-center>
                                <v-btn color="blue darken-1" flat @click="closeDeleteDialog">Cancel</v-btn>
                                <v-btn color="blue darken-1" :loading="deleteLoading" flat @click="sureDelete">Delete</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <property-edit-dialog
                        v-model="currentPropertyToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></property-edit-dialog>

                <property-edit-dialog
                        v-model="currentPropertyToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></property-edit-dialog>

            </v-toolbar>
            <v-snackbar
                    v-model="snackbar"
                    :color="snackbarColor"
                    :multi-line="true"
                    :timeout="3000"
            >
                {{ snackbarText }}
            </v-snackbar>
        </v-flex>
        <v-flex xs12>
            <v-data-table
                    :headers="headers"
                    :items="filteredProperties"
                    :loading="propertiesFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.value }}</td>
                    <td>{{ props.item.type }}</td>
                    <td>{{ props.item.refractory ? props.item.refractory.id : "" }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditPropertyDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeletePropertyDialog(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import PropertyEditDialog from './PropertyEditDialog';
    import lodash from 'lodash';

    const propertyDefault = {
        id: "",
        name: "",
        value: "",
        type: "",
        refractory: {
            id: "",
            name: ""
        }
    };

    export default {
        name: "PropertyTable",
        components: {PropertyEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'Название зоны', value: 'name'},
                    {text: 'Значение', value: 'value'},
                    {text: 'Единица измерения', value: 'type'},
                    {text: 'Огнеупор id', value: 'refractory.id'},
                ],

                currentPropertyToCreate: lodash.cloneDeep(propertyDefault),
                currentPropertyToEdit: lodash.cloneDeep(propertyDefault),
                currentPropertyToDelete: lodash.cloneDeep(propertyDefault),

                snackbar: false,
                snackbarText: '',
                snackbarColor: '',

                itemsLoading: false,
                items: [],

                createDialog: false,
                editDialog: false,
                deleteDialog: false,

                createLoading: false,
                editLoading: false,
                deleteLoading: false,
            }
        },
        computed: {
            ...mapGetters([
                'properties',
                'propertiesFetching',
            ]),
            filteredProperties() {
                return this.properties
            },
        },
        methods: {
            ...mapActions([
                'updateProperties',
                'saveProperty',
                'editProperty',
                'deleteProperty',
            ]),
            success() {
                this.updateProperties();
                this.snackbarText = 'success';
                this.snackbar = true;
                this.snackbarColor = 'success';
            },
            error(error) {
                this.snackbarText = `${error.response.data.error} - ${error.response.data.message}`;
                this.snackbar = true;
                this.snackbarColor = 'error';
            },
            closeDeleteDialog() {
                this.deletedItem = null;
                this.deleteDialog = false;
            },
            edit() {
                this.editLoading = true;
                this.editProperty(this.currentPropertyToEdit).then(() => {
                    this.editLoading = false;
                    this.currentPropertyToEdit = lodash.cloneDeep(propertyDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveProperty(this.currentPropertyToCreate).then(() => {
                    this.createLoading = false;
                    this.currentPropertyToCreate = lodash.cloneDeep(propertyDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreatePropertyDialog() {
                this.createDialog = true;
            },
            openEditPropertyDialog(item) {
                this.currentPropertyToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeletePropertyDialog(item) {
                this.currentPropertyToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteProperty(this.currentPropertyToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentPropertyToDelete = lodash.cloneDeep(propertyDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateProperties();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
