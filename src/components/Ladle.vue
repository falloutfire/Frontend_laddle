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
                    <v-container fluid grid-list-lg>
                        <v-data-iterator
                                :items="filteredItems"
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
                                        <v-list three-line>
                                            <v-list-tile
                                                    v-for="(prop, index) in Object.values(props.item.properties)"
                                                    :key="index"
                                            >
                                                <v-layout row wrap>
                                                    <v-list-tile-content>{{ prop.name }}:</v-list-tile-content>
                                                    <v-list-tile-content>{{ prop.value }} ({{ prop.type }})
                                                    </v-list-tile-content>
                                                </v-layout>
                                            </v-list-tile>
                                            <v-layout row wrap>
                                                <v-flex xs3>
                                                    <v-list-tile
                                                    >
                                                        <v-list-tile-content>
                                                            <p >
                                                               Хар-ка </p>
                                                        </v-list-tile-content>
                                                    </v-list-tile>
                                                </v-flex>
                                                <v-flex xs9>
                                            <v-list-tile
                                            >
                                                    <v-list-tile-content>
                                                        <p style="word-break: break-all;overflow-y: auto; height: 100%">
                                                            АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА</p>
                                                    </v-list-tile-content>
                                            </v-list-tile>
                                                </v-flex>
                                            </v-layout>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </template>
                        </v-data-iterator>
                    </v-container>
                </v-card-media>
                <v-layout row wrap justify-center>
                    <v-flex xs6>
                        <v-layout row wrap>
                            <v-flex xs5 class="mx-1">
                                <v-select
                                        :items="propertiesToFilter"
                                        label="Свойство для фильтра"
                                        v-model="propertyToFilter"
                                ></v-select>
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field
                                        label="Значение для фильтра"
                                        v-model="valueToFilter"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

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
                valueToFilter: "",
                propertyToFilter: "",
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
            propertiesToFilter() {
                return this.currentZone ? this.currentZone.refractories.reduce((acc, el) => acc.concat(el.properties), []).map(el => el.name) : []
            },
            filteredItems() {
                if (!this.currentZone) {
                    return []
                }
                if (this.propertyToFilter && this.valueToFilter) {
                    if (this.valueToFilter.indexOf('>') === 0) {
                        return this.currentZone.refractories.filter(el => {
                            const prop = el.properties.find(prop => prop.name === this.propertyToFilter);
                            return prop && parseFloat(prop.value) > parseFloat(this.valueToFilter.substring(1))
                        })
                    } else if (this.valueToFilter.indexOf('<') === 0) {
                        return this.currentZone.refractories.filter(el => {
                            const prop = el.properties.find(prop => prop.name === this.propertyToFilter);
                            return prop && parseFloat(prop.value) < parseFloat(this.valueToFilter.substring(1))
                        })
                    } else {
                        return this.currentZone.refractories.filter(el => {
                            const prop = el.properties.find(prop => prop.name === this.propertyToFilter);
                            return prop && parseFloat(prop.value) === parseFloat(this.valueToFilter)
                        })
                    }
                }
                return this.currentZone.refractories;
            },
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
