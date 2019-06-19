<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Цех</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-flex xs12 sm3>
                    <v-text-field class="ml-3 mt-2"
                                  v-model="search"
                                  label="Фильтр по названию цеха" clearable></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="openCreateShopDialog">Новый цех</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete shop?</span>
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

                <shop-edit-dialog
                        v-model="currentShopToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></shop-edit-dialog>

                <shop-edit-dialog
                        v-model="currentShopToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></shop-edit-dialog>

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
                    :items="filteredShops"
                    :loading="shopsFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.employeesNumber }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditShopDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeleteShopDialog(props.item)"
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
    import ShopEditDialog from './ShopEditDialog';
    import lodash from 'lodash';

    const shopDefault = {
        id: "",
        name: "",
        employeesNumber: "",
    };

    export default {
        name: "ShopTable",
        components: {ShopEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'Цех id', value: 'id'},
                    {text: 'Название', value: 'name'},
                    {text: 'Количество сотрудников', value: 'employeesNumber'},
                ],

                currentShopToCreate: lodash.cloneDeep(shopDefault),
                currentShopToEdit: lodash.cloneDeep(shopDefault),
                currentShopToDelete: lodash.cloneDeep(shopDefault),

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
                'shops',
                'shopsFetching',
            ]),
            filteredShops() {
                return this.shops
            },
        },
        methods: {
            ...mapActions([
                'updateShops',
                'saveShop',
                'editShop',
                'deleteShop',
            ]),
            success() {
                this.updateShops();
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
                this.editShop(this.currentShopToEdit).then(() => {
                    this.editLoading = false;
                    this.currentShopToEdit = lodash.cloneDeep(shopDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveShop(this.currentShopToCreate).then(() => {
                    this.createLoading = false;
                    this.currentShopToCreate = lodash.cloneDeep(shopDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreateShopDialog() {
                this.createDialog = true;
            },
            openEditShopDialog(item) {
                this.currentShopToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeleteShopDialog(item) {
                this.currentShopToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteShop(this.currentShopToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentShopToDelete = lodash.cloneDeep(shopDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateShops();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
