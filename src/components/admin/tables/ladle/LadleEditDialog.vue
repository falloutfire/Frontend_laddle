<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent lazy>
        <v-card>
            <v-card-title>
                <span class="headline mt-2 ml-2">Ковш</span>
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

                        <v-flex xs12 class="pt-1" v-if="!value.photo">
                            <v-btn block color="primary" @click="triggerInput('fileInputTop')">Выбрать фото ковша
                            </v-btn>
                            <input style="display: none;" title="foo" type="file" @change="choosePhoto"
                                   id="fileInputTop"/>
                        </v-flex>
                        <v-flex xs12 v-else>
                            <v-layout row wrap align-center justify-start>
                                <v-flex xs8>
                                    <v-hover>
                                        <v-avatar :size="200" slot-scope="{ hover }">
                                            <v-img :src="image">
                                                <v-expand-transition>
                                                    <div
                                                            v-if="hover"
                                                            class="d-flex transition-fast-in-fast-out blue darken-2  display-0 white--text"
                                                            style="height: 100%; "
                                                            @click="test"
                                                    >
                                                        <v-layout row wrap fill-height align-center justify-center>
                                                            <v-flex xs12>
                                                                <p>Изменить зоны</p>

                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                </v-expand-transition>
                                            </v-img>
                                        </v-avatar>
                                    </v-hover>
                                </v-flex>
                                <v-flex xs1>
                                    <v-layout column>
                                        <v-flex xs1>
                                            <v-btn icon color="primary" @click="triggerInput('fileInputRight')">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <input style="display: none;" title="foo" type="file" @change="choosePhoto"
                                                   id="fileInputRight"/>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-btn icon color="primary" @click="deletePhoto">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
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

        <v-dialog
                persistent
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                lazy
                v-model="zoneEditorDialog"
        >
            <v-card>
                <zone-editor
                        @close="zoneEditorDialog = false"
                        :value="value"
                        @input="$emit('input', $event)"
                ></zone-editor>
            </v-card>
        </v-dialog>

    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import lodash from 'lodash';
    import ZoneEditor from './ZoneEditor'
    import HTTP from "../../../../http";

    const ladleDefault = {
        id: "",
        name: "",
        zones: [],
        refractories: [],
    };

    export default {
        name: "LadleEditDialog",
        components: {
            ZoneEditor,
        },
        props: {
            value: Object,
            isOpen: Boolean,
            saveLoading: Boolean,
        },
        data() {
            return {
                items: {},
                dialog: false,
                currentLadleToZoneEdit: lodash.cloneDeep(this.value),
                zoneEditorDialog: false,
            }
        },
        mounted() {
            this.updateShops();
        },
        methods: {
            ...mapActions([
                'updateShops',
            ]),
            test() {
                this.currentLadleToZoneEdit = lodash.cloneDeep(this.value);
                this.zoneEditorDialog = true;
            },
            triggerInput(id) {
                document.getElementById(id).click();
            },
            deletePhoto() {
                const newValue = lodash.cloneDeep(this.value);
                newValue.photo = "";
                this.$emit('input', newValue);
            },
            choosePhoto(event) {
                const reader = new FileReader();
                reader.readAsBinaryString(event.target.files[0]);

                reader.onload = () => {
                    const newValue = lodash.cloneDeep(this.value);
                    newValue.photo = btoa(reader.result);
                    this.$emit('input', newValue);
                };
                reader.onerror = function () {
                    console.log('there are some problems');
                };
            },
            openDialog() {
                this.dialog = true;
            },
        },
        computed: {
            ...mapGetters([
                'shops',
                'shopsFetching',
            ]),
            image() {
                if (this.value.photo) {
                    return `data:image/jpeg;base64,${this.value.photo}`;
                }
                return '';
            }
        },
    }
</script>

<style scoped>

    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }

    .custom-file-input::before {
        content: 'Select some files';
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
    }

    .custom-file-input:hover::before {
        border-color: black;
    }

    .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }

</style>
