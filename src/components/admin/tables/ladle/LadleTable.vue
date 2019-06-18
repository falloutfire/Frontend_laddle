<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Ковш</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-flex xs12 sm3>
                    <v-text-field class="ml-3 mt-2"
                                  v-model="search"
                                  label="Фильтр по названию ковша" clearable></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="openCreateLadleDialog">Новый ковш</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete ladle?</span>
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

                <ladle-edit-dialog
                        v-model="currentLadleToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></ladle-edit-dialog>

                <ladle-edit-dialog
                        v-model="currentLadleToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></ladle-edit-dialog>

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
                    :items="filteredLadles"
                    :loading="ladlesFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.shop ? props.item.shop.id : ""}}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditLadleDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeleteLadleDialog(props.item)"
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
    import LadleEditDialog from './LadleEditDialog';
    import lodash from 'lodash';

    const ladleDefault = {
        id: "",
        name: "",
        photo: "",
        shop: {
            name: "",
            id: "",
        },
        zones: []
    };

    export default {
        name: "LadleTable",
        components: {LadleEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'Ковш id', value: 'id'},
                    {text: 'Название', value: 'name'},
                    {text: 'Цех id', value: 'shop.id'},
                ],

                currentLadleToCreate: lodash.cloneDeep(ladleDefault),
                currentLadleToEdit: lodash.cloneDeep(ladleDefault),
                currentLadleToDelete: lodash.cloneDeep(ladleDefault),

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
                'ladles',
                'ladlesFetching',
            ]),
            filteredLadles() {
                return this.ladles
            },
        },
        methods: {
            ...mapActions([
                'updateLadles',
                'saveLadle',
                'editLadle',
                'deleteLadle',
            ]),
            success() {
                this.updateLadles();
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
                this.editLadle(this.currentLadleToEdit).then(() => {
                    this.editLoading = false;
                    this.currentLadleToEdit = lodash.cloneDeep(ladleDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveLadle(this.currentLadleToCreate).then(() => {
                    this.createLoading = false;
                    this.currentLadleToCreate = lodash.cloneDeep(ladleDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreateLadleDialog() {
                this.createDialog = true;
            },
            openEditLadleDialog(item) {
                this.currentLadleToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeleteLadleDialog(item) {
                this.currentLadleToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteLadle(this.currentLadleToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentLadleToDelete = lodash.cloneDeep(ladleDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateLadles();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
