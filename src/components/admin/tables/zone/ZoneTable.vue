<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Зона</v-toolbar-title>
                <v-divider
                        class="mx-2"
                        inset
                        vertical
                ></v-divider>
                <v-flex xs12 sm3>
                    <v-text-field class="ml-3 mt-2"
                                  v-model="search"
                                  label="Фильтр по названию зоны" clearable></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="openCreateZoneDialog">Новая зона</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete zone?</span>
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

                <zone-edit-dialog
                        v-model="currentZoneToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></zone-edit-dialog>

                <zone-edit-dialog
                        v-model="currentZoneToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></zone-edit-dialog>

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
                    :items="filteredZones"
                    :loading="zonesFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.laddle.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditZoneDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeleteZoneDialog(props.item)"
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
    import ZoneEditDialog from './ZoneEditDialog';
    import lodash from 'lodash';

    const zoneDefault = {
        name: "",
        laddle: {
            id: "",
            name: ""
        }
    };

    export default {
        name: "ZoneTable",
        components: {ZoneEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'Ковш id', value: 'laddle.id'},
                    {text: 'Название зоны', value: 'name'},
                ],

                currentZoneToCreate: lodash.cloneDeep(zoneDefault),
                currentZoneToEdit: lodash.cloneDeep(zoneDefault),
                currentZoneToDelete: lodash.cloneDeep(zoneDefault),

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
                'zones',
                'zonesFetching',
            ]),
            filteredZones() {
                return this.zones
            },
        },
        methods: {
            ...mapActions([
                'updateZones',
                'saveZone',
                'editZone',
                'deleteZone',
            ]),
            success() {
                this.updateZones();
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
                this.editZone(this.currentZoneToEdit).then(() => {
                    this.editLoading = false;
                    this.currentZoneToEdit = lodash.cloneDeep(zoneDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveZone(this.currentZoneToCreate).then(() => {
                    this.createLoading = false;
                    this.currentZoneToCreate = lodash.cloneDeep(zoneDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreateZoneDialog() {
                this.createDialog = true;
            },
            openEditZoneDialog(item) {
                this.currentZoneToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeleteZoneDialog(item) {
                this.currentZoneToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteZone(this.currentZoneToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentZoneToDelete = lodash.cloneDeep(zoneDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateZones();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
