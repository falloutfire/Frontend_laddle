<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2"> Зона </span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                    label="Ковш"
                                    :items="ladles"
                                    item-text="name"
                                    item-value="id"
                                    :loading="ladlesFetching"
                                    return-object
                                    v-model="value.laddle"
                            ></v-select>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Название"
                                    v-model="value.name"
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
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "ZoneEditDialog",
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
            this.updateLadles();
        },
        methods: {
            ...mapActions([
                'updateLadles',
            ]),
            openDialog() {
                this.dialog = true;
            },
        },
        computed: {
            ...mapGetters([
                'ladles',
                'ladlesFetching',
            ])
        },
    }
</script>

<style scoped>

</style>
