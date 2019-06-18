<template>
    <v-layout row wrap>
        <v-flex xs12>
            <photo-holder
                    :zones="zones"
                    :photo="photo"
                    @zone-clicked="zoneClicked"
            ></photo-holder>
        </v-flex>
        <v-dialog
                persistent
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                lazy
                v-model="dialog"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Огнеупорные материалы для {{zoneName}}</v-toolbar-title>
                </v-toolbar>
                <v-card-media>
                    <v-container fluid grid-list-md>
                        <v-data-iterator
                                :items="currentZone ? currentZone.refractories : []"
                                row
                                wrap
                                content-tag="v-layout"
                        >
                            <template v-slot:item="props">
                                <v-flex
                                        xs12
                                        sm6
                                        md4
                                        lg3
                                >
                                    <v-card>
                                        <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                                        <v-divider></v-divider>
                                        <v-list dense>
                                            <v-list-tile
                                                    v-for="(prop, index) in Object.values(props.item.properties)"
                                                    :key="index"
                                            >
                                                <v-list-tile-content>{{ prop.name }}:</v-list-tile-content>
                                                <v-list-tile-content>{{ prop.value }} ({{ prop.type }})
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile
                                            >
                                                <v-list-tile-content>Характеристика:</v-list-tile-content>
                                                <v-list-tile-content>{{ props.item.characteristic }}
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </template>
                        </v-data-iterator>
                    </v-container>
                </v-card-media>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import PhotoHolder from './PhotoHolder'

    export default {
        name: "Ladle",
        components: {PhotoHolder},
        props: {
            name: {
                type: String,
                default: '',
            },
            zones: {
                type: Array,
                default: () => [],
            },
            photo: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                dialog: false,
                currentZone: null,
            }
        },
        methods: {
            zoneClicked(zone) {
                this.currentZone = zone;
                this.dialog = true;
            },
        },
        computed: {
            zoneName() {
                if (this.currentZone) {
                    return this.currentZone.name
                }
                return ""
            }
        },
    }
</script>

<style scoped>

</style>
