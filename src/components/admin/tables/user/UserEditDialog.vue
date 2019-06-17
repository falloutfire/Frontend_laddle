<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2"> Пользователь </span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                    label="Цех"
                                    :items="shops"
                                    item-text="name"
                                    item-value="id"
                                    :loading="shopsFetching"
                                    return-object
                                    v-model="value.shop"
                            ></v-select>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Логин"
                                    v-model="value.login"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    type="password"
                                    label="Пароль"
                                    v-model="value.password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Имя"
                                    v-model="value.firstName"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Фамилия"
                                    v-model="value.lastName"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Отчество"
                                    v-model="value.middleName"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="value.roles"
                                    :items="[{id: 1, role_name: 'ROLE_USER'}, {id: 2, role_name: 'ROLE_ADMIN'}]"
                                    item-text="role_name"
                                    item-value="id"
                                    return-object
                                    label="Роли"
                                    multiple
                                    hint="Выберите роли для нового пользователя"
                            ></v-select>
                        </v-flex>


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
    import {mapActions, mapGetters} from 'vuex';

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
            this.updateShops();
        },
        methods: {
            ...mapActions([
                'updateShops',
            ]),
            openDialog() {
                this.dialog = true;
            },
        },
        computed: {
            ...mapGetters([
                'shops',
                'shopsFetching',
            ])
        },
    }
</script>

<style scoped>

</style>
