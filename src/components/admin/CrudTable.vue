<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3"  style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title >{{ tableName }}</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-flex xs12 sm3>
                    <v-text-field class="ml-3 mt-2"
                                  v-model="search"
                                  :label="filteredName" clearable></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="createDialog = true">New {{ tableName }}</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete {{ tableName }}?</span>
                            </v-layout>
                        </v-card-title>
                        <v-card-actions>
                            <v-layout row wrap justify-center>
                                <v-btn color="blue darken-1" flat @click="closeDeleteDialog">Cancel</v-btn>
                                <v-btn color="blue darken-1" flat @click="sureDelete">Delete</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <edit-dialog
                        :itemName="tableName"
                        :isOpen="editDialog"
                        v-model="editedItem"
                        :fieldsDescription="itemsDescription"
                        @close="editDialog = $event"
                        @apply="edit"
                ></edit-dialog>

                <edit-dialog
                        :itemName="tableName"
                        :isOpen="createDialog"
                        v-model="createdItem"
                        :fieldsDescription="itemsDescription"
                        :saveLoading="createLoading"
                        @close="createDialog = $event"
                        @apply="save"
                ></edit-dialog>

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
                    :items="filteredItems"
                    :loading="itemsLoading"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <template v-for="[key, descr] in Object.entries(itemsDescription)">
                        <td
                                :key="key"
                                v-if="(descr['showInTable'] !== undefined ? descr['showInTable'] : true)
                                 && descr['descriptionFieldType'] !== 'checkBox'"
                        > {{ getValues(props.item[key], descr) }}
                        </td>
                        <td :key="key" v-if="descr['descriptionFieldType'] === 'checkBox'">
                            <v-checkbox
                                    v-model="props.item[key]"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>

                    </template>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(props.item)"
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
    import HTTP from '../../http';
    import EditDialog from './EditTable';
    import lodash from 'lodash';

    export default {
        name: "CrudTable",
        components: {EditDialog},
        props: {
            tableName: String,
            crudURL: String,
            itemsDescription: Object,
            defaultItem: Object,
            filterName: String
        },
        data() {
            return {
                search: "",

                snackbar: false,
                snackbarText: '',
                snackbarColor: '',

                itemsLoading: false,
                items: [],

                editDialog: false,
                createDialog: false,
                deleteDialog: false,

                createLoading: false,
                editLoading: false,
                deleteLoading: false,

                deletedItem: this.defaultItem,
                editedItem: this.defaultItem,
                createdItem: this.defaultItem,
            }
        },
        computed: {
            headers() {
                return Object.entries(this.itemsDescription).filter(([, descr]) => {
                    return descr.showInTable === undefined || descr.showInTable
                }).map(([key,]) => {
                    return {
                        text: key,
                        value: key,
                    }
                })
            },
            filteredItems() {
                const name = this.filterName;
                return this.items.filter(item => {
                    return item[name].indexOf(this.search) > -1;
                })
            },
            filteredName() {
                return "Find by " + this.filterName;

            }
        },
        methods: {
            getValues(prop, descr) {
                if (descr.convertFunction !== undefined) {
                    return descr.convertFunction(prop)
                }
                return prop
            },
            success() {
                this.updateItems();
                this.snackbarText = 'success';
                this.snackbar = true;
                this.snackbarColor = 'success';
            },
            error(error) {
                this.snackbarText = `${error.response.data.error} - ${error.response.data.message}`;
                this.snackbar = true;
                this.snackbarColor = 'error';
            },
            getRoles(roles) {
                return roles.map(role => role.roleName).join(', ');
            },
            closeDeleteDialog() {
                this.deletedItem = null;
                this.deleteDialog = false;
            },
            closeDialog() {
                this.editedItem = lodash.cloneDeep(this.defaultItem);
                this.editDialog = false;
            },
            edit() {
                this.editLoading = true;
                HTTP.put(`${this.crudURL}`, this.editedItem).then(() => {
                    this.editLoading = false;
                    this.editedItem = lodash.cloneDeep(this.defaultItem);
                    this.editDialog = false;
                    this.success();
                }).catch(error => {
                    this.editLoading = false;
                    this.editedItem = lodash.cloneDeep(this.defaultItem);
                    this.editDialog = false;
                    this.error(error);
                })
            },
            save() {
                this.createLoading = true;
                HTTP.post(`${this.crudURL}/${this.deletedItem.id}`, this.createdItem).then(() => {
                    this.createLoading = false;
                    this.createdItem = lodash.cloneDeep(this.defaultItem);
                    this.createDialog = false;
                    this.success();
                }).catch(error => {
                    this.createLoading = false;
                    this.createdItem = lodash.cloneDeep(this.defaultItem);
                    this.createDialog = false;
                    this.error(error);
                })
            },
            editItem(item) {
                this.editedItem = item;
                this.editDialog = true;
            },
            deleteItem(item) {
                this.deletedItem = item;
                this.deleteDialog = true;
            },
            sureDelete: function () {
                this.deleteLoading = true;
                HTTP.delete(`${this.crudURL}/${this.deletedItem.id}`).then(() => {
                    this.deleteLoading = false;
                    this.deleteDialog = false;
                    this.success();
                }).catch(error => {
                    this.deleteLoading = false;
                    this.deleteDialog = false;
                    this.error(error);
                })
            },
            updateItems() {
                this.deletedItem = lodash.cloneDeep(this.defaultItem);
                this.editedItem = lodash.cloneDeep(this.defaultItem);
                this.createdItem = lodash.cloneDeep(this.defaultItem);
                this.itemsLoading = true;
                HTTP.get(`${this.crudURL}`).then(response => {
                    this.itemsLoading = false;
                    this.items = response.data.result
                }).catch(error => {
                    this.itemsLoading = false;
                    this.error(error);
                });
            },
        },
        mounted() {
            this.updateItems();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
