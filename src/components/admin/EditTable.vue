<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2">{{ itemName }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>

                        <v-flex v-bind="descr['flexValues']" v-for="[key, descr] in fields" :key="key">
                            <template v-if="descr['descriptionFieldType'] === 'textField'">
                                <template v-if="key.indexOf('.') === -1">
                                    <v-text-field
                                            v-if="descr['objectKeyField'] === undefined"
                                            v-model="value[key]"
                                            v-bind="descr"
                                    ></v-text-field>
                                    <v-text-field
                                            v-else
                                            v-model="value[key][descr['objectKeyField']]"
                                            v-bind="descr"
                                    ></v-text-field>
                                </template>
                                <template v-else>
                                    <v-text-field
                                            v-if="descr['objectKeyField'] === undefined"
                                            v-model="value[key.split('.')[0]][key.split('.')[1]]"
                                            v-bind="descr"
                                    ></v-text-field>
                                    <v-text-field
                                            v-else
                                            v-model="value[key][descr['objectKeyField']]"
                                            v-bind="descr"
                                    ></v-text-field>
                                </template>
                            </template>
                            <v-select
                                    v-if="descr['descriptionFieldType'] === 'selectField'"
                                    v-model="value[key]"
                                    v-bind="descr"
                                    :items="items[key]"
                            ></v-select>
                            <v-checkbox
                                    v-if="descr['descriptionFieldType'] === 'checkBox'"
                                    v-model="value[key]"
                                    v-bind="descr"
                            ></v-checkbox>
                            <template v-if="descr['descriptionFieldType'] === 'photoField'">
                                <v-layout row wrap justify-center align-center>
                                    <v-flex xs6>
<!--                                        <v-btn type="image" color="primary" dark class="mb-2" @click="choosePhoto">Выбрать фото-->
<!--                                        </v-btn>-->
                                        <input type="file" @change="choosePhoto(value, key)" id="fileInput"/>
                                    </v-flex>
                                    <v-flex xs6 v-if="value[key]">
                                        <v-btn color="primary" dark class="mb-2" @click="openDialog">Редактировать зоны
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-img max-height="300" max-width="300" :src="getV(value[key])"
                                               alt="photo"></v-img>
                                    </v-flex>
                                </v-layout>
                                <v-dialog
                                        persistent
                                        fullscreen
                                        hide-overlay
                                        transition="dialog-bottom-transition"
                                        lazy
                                        v-model="dialog"
                                >
                                    <v-card>
                                        <zone-editor
                                                @close="dialog = false"
                                                :value="value"
                                                @input="zoneEditorInput"
                                        ></zone-editor>
                                    </v-card>
                                </v-dialog>
                            </template>
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
    import HTTP from "@/http";
    import lodash from 'lodash';
    import ZoneEditor from "./tables/ladle/ZoneEditor";

    export default {
        name: "EditTable",
        components: {ZoneEditor},
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
            console.log(this.value);
        },
        methods: {
            zoneEditorInput(value) {
              const newValue = lodash.cloneDeep(this.value);
              newValue.zones = value.zones.slice();
              this.$emit('input', newValue);
            },
            choosePhoto(value, key) {
                const reader = new FileReader();
                reader.readAsBinaryString(document.getElementById('fileInput').files[0]);

                reader.onload = () => {
                    const newValue = lodash.cloneDeep(value);
                    newValue[key] = btoa(reader.result);
                    this.$emit('input', newValue);
                };
                reader.onerror = function() {
                    console.log('there are some problems');
                };
            },
            openDialog() {
                this.dialog = true;
            },
            getV(src) {
                return `data:image/jpeg;base64,${src}`;
            },
            async retrieveSelectable(fields) {
                fields.filter(([, descr]) => {
                    return descr['descriptionFieldType'] === 'selectField';
                }).forEach(([key, descr]) => {
                    HTTP.get(descr['urlToGetSelectables']).then(response => {
                        this.items[key] = response.data.result
                    })
                })
            },
        },
        computed: {
            fields() {
                const fields = Object.entries(this.fieldsDescription).filter(([, descr]) => {
                    return descr['editableField'] !== undefined ? descr['editableField'] : true;
                });
                fields.forEach(([key,]) => {
                    this.items[key] = [];
                });
                this.retrieveSelectable(fields);
                return fields;
            },
        },
    }
</script>

<style scoped>

</style>
