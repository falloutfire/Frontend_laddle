<template>
    <v-layout row wrap>
        <v-flex xs12 class="mt-3" style="border: 1px solid gray">
            <v-toolbar flat color="white">
                <v-toolbar-title>User</v-toolbar-title>
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
                <v-btn color="primary" dark class="mb-2" @click="createDialog = true">New user</v-btn>
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
                                <v-btn color="blue darken-1" flat @click="sureDelete">Delete</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!--                <edit-dialog-->
                <!--                        :itemName="tableName"-->
                <!--                        :isOpen="editDialog"-->
                <!--                        v-model="editedItem"-->
                <!--                        :fieldsDescription="itemsDescription"-->
                <!--                        @close="editDialog = $event"-->
                <!--                        @apply="edit"-->
                <!--                ></edit-dialog>-->

                <!--                <edit-dialog-->
                <!--                        :itemName="tableName"-->
                <!--                        :isOpen="createDialog"-->
                <!--                        v-model="createdItem"-->
                <!--                        :fieldsDescription="itemsDescription"-->
                <!--                        :saveLoading="createLoading"-->
                <!--                        @close="createDialog = $event"-->
                <!--                        @apply="save"-->
                <!--                ></edit-dialog>-->

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
                    <td>{{ props.item.shopId }}</td>
                    <td>{{ props.item.login }}</td>
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.secondName }}</td>
                    <td>{{ props.item.middleName }}</td>
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
    import {mapActions, mapGetters} from 'vuex';
    import UserEditDialog from './ShopEditDialog';
    import lodash from 'lodash';

    export default {
        name: "UserTable",
        components: {UserEditDialog},
        data() {
            return {
                search: "",
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'Цех id', value: 'shopId'},
                    {text: 'Имя пользователя', value: 'login'},
                    {text: 'Имя', value: 'firstName'},
                    {text: 'Фамилия', value: 'secondName'},
                    {text: 'Отчество', value: 'middleName'}
                ],

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
                'updateUsers'
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
            closeDialog() {
                this.editedItem = lodash.cloneDeep(this.defaultItem);
                this.editDialog = false;
            },
            edit() {
                this.editLoading = true;
            },
            save() {
                this.createLoading = true;
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
