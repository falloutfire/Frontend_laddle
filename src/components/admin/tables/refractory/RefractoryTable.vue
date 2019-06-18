<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Огнеупоры</v-toolbar-title>
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
                <v-btn color="primary" dark class="mb-2" @click="openCreateRefractoryDialog">Новый огнеупор</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete refractory?</span>
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

                <refractory-edit-dialog
                        v-model="currentRefractoryToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></refractory-edit-dialog>

                <refractory-edit-dialog
                        v-model="currentRefractoryToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></refractory-edit-dialog>

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
                    :items="filteredRefractories"
                    :loading="refractoriesFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.zone ? props.item.zone.id : ""}}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditRefractoryDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeleteRefractoryDialog(props.item)"
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
    import RefractoryEditDialog from './RefractoryEditDialog';
    import lodash from 'lodash';

    const refractoryDefault = {
        id: "",
        name: "",
        zone: {
            id: "",
            name: "",
        },
    };

    export default {
        name: "RefractoryTable",
        components: {RefractoryEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'Огнеупор id', value: 'id'},
                    {text: 'Название', value: 'name'},
                    {text: 'Зона id', value: 'zone.id'},
                ],

                currentRefractoryToCreate: lodash.cloneDeep(refractoryDefault),
                currentRefractoryToEdit: lodash.cloneDeep(refractoryDefault),
                currentRefractoryToDelete: lodash.cloneDeep(refractoryDefault),

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
                'refractories',
                'refractoriesFetching',
            ]),
            filteredRefractories() {
                return this.refractories
            },
        },
        methods: {
            ...mapActions([
                'updateRefractories',
                'saveRefractory',
                'editRefractory',
                'deleteRefractory',
            ]),
            success() {
                this.updateRefractories();
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
                this.editRefractory(this.currentRefractoryToEdit).then(() => {
                    this.editLoading = false;
                    this.currentRefractoryToEdit = lodash.cloneDeep(refractoryDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveRefractory(this.currentRefractoryToCreate).then(() => {
                    this.createLoading = false;
                    this.currentRefractoryToCreate = lodash.cloneDeep(refractoryDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreateRefractoryDialog() {
                this.createDialog = true;
            },
            openEditRefractoryDialog(item) {
                this.currentRefractoryToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeleteRefractoryDialog(item) {
                this.currentRefractoryToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteRefractory(this.currentRefractoryToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentRefractoryToDelete = lodash.cloneDeep(refractoryDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateRefractories();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
