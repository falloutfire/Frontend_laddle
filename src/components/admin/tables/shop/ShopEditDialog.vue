<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2">{{ itemName }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="value.name"
                                    label="Название"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    v-model="value.employeesNumber"
                                    type="number"
                                    label="Количнство сотрудников"
                            ></v-text-field>
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
    import {mapGetters} from 'vuex';

    export default {
        name: "ShopEditDialog",
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
        methods: {
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
