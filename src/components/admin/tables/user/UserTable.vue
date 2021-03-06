<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>Пользователь</v-toolbar-title>
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
                <v-btn color="primary" dark class="mb-2" @click="openCreateUserDialog">Новый пользователь</v-btn>
                <v-dialog v-model="deleteDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <v-layout row wrap justify-center>
                                <span class="headline ">Are you sure to delete user?</span>
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

                <user-edit-dialog
                        v-model="currentUserToCreate"
                        :is-open="createDialog"
                        :save-loading="createLoading"
                        @close="createDialog = false"
                        @apply="save"
                ></user-edit-dialog>

                <user-edit-dialog
                        v-model="currentUserToEdit"
                        :is-open="editDialog"
                        :save-loading="editLoading"
                        @close="editDialog = false"
                        @apply="edit"
                ></user-edit-dialog>

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
                    :items="filteredUsers"
                    :loading="usersFetching"
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.shop ?  props.item.shop.id : ""}}</td>
                    <td>{{ props.item.login }}</td>
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.secondName }}</td>
                    <td>{{ props.item.middleName }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEditUserDialog(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click="openDeleteUserDialog(props.item)"
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
    import UserEditDialog from './UserEditDialog';
    import lodash from 'lodash';

    const userDefault = {
        shop: {
            name: "",
            id: "",
        },
        roles: [],
        login: "",
        password: "",
        firstName: "",
        lastName: "",
        middleName: "",
    };

    export default {
        name: "UserTable",
        components: {UserEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'Цех id', value: 'shop.id'},
                    {text: 'Имя пользователя', value: 'login'},
                    {text: 'Имя', value: 'firstName'},
                    {text: 'Фамилия', value: 'secondName'},
                    {text: 'Отчество', value: 'middleName'}
                ],

                currentUserToCreate: lodash.cloneDeep(userDefault),
                currentUserToEdit: lodash.cloneDeep(userDefault),
                currentUserToDelete: lodash.cloneDeep(userDefault),

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
                'users',
                'usersFetching',
            ]),
            filteredUsers() {
                return this.users
            },
        },
        methods: {
            ...mapActions([
                'updateUsers',
                'saveUser',
                'editUser',
                'deleteUser',
            ]),
            success() {
                this.updateUsers();
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
                this.editUser(this.currentUserToEdit).then(() => {
                    this.editLoading = false;
                    this.currentUserToEdit = lodash.cloneDeep(userDefault);
                    this.success();
                    this.editDialog = false;
                }).catch(error => {
                    this.editLoading = false;
                    this.error(error)
                });
            },
            save() {
                this.createLoading = true;
                this.saveUser(this.currentUserToCreate).then(() => {
                    this.createLoading = false;
                    this.currentUserToCreate = lodash.cloneDeep(userDefault);
                    this.success();
                    this.createDialog = false;
                }).catch(error => {
                    this.createLoading = false;
                    this.error(error)
                })
            },
            openCreateUserDialog() {
                this.createDialog = true;
            },
            openEditUserDialog(item) {
                this.currentUserToEdit = lodash.cloneDeep(item);
                this.editDialog = true;
            },
            openDeleteUserDialog(item) {
                this.currentUserToDelete = lodash.cloneDeep(item);
                this.deleteDialog = true;
            },
            sureDelete() {
                this.deleteLoading = true;
                this.deleteUser(this.currentUserToDelete).then(() => {
                    this.deleteLoading = false;
                    this.currentUserToDelete = lodash.cloneDeep(userDefault);
                    this.success();
                    this.deleteDialog = false;
                }).catch(error => {
                    this.deleteLoading = false;
                    this.error(error)
                })
            },
        },
        mounted() {
            this.updateUsers();
        }
    }
</script>

<style scoped>

</style>


<style scoped>

</style>
