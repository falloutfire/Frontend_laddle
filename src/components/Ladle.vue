<template>
    <v-layout row wrap>
        <v-flex xs10>
            <photo-holder
                    :zones="zones"
                    :photo="photo"
                    @zone-clicked="zoneClicked"
            ></photo-holder>
        </v-flex>
        <v-flex xs2>
            <v-container fluid>
                <v-layout fill-height>
                    <v-flex xs12>
                        <v-card>
                            <v-card-title>
                                <v-layout row wrap justify-center>
                                    <h2>Зоны</h2>

                                </v-layout>
                            </v-card-title>
                            <v-card-media>
                                <v-list two-line>
                                    <template v-for="(zone, index) in zones">
                                        <v-list-tile
                                                :key="index"
                                                @click="zoneClicked(zone)"
                                        >

                                            <v-list-tile-content>
                                                <p>{{zone.name}}</p>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                </v-list>
                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
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
                <v-layout row wrap justify-center class="my-3">
                    <v-flex xs6>
                        <v-layout row wrap>
                            <v-flex xs5 class="mx-1">
                                <v-select
                                        :items="propertiesToFilter"
                                        label="Свойство для фильтра"
                                        clearable
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
                                            <v-layout justify-center row class="mx-0">
                                                <v-flex xs12>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-content
                                                    >
                                                        <template v-slot:header>
                                                            <div>Характеристика</div>
                                                        </template>
                                                        <v-card>
                                                            <v-card-text style="word-break: break-all;overflow-y: auto;"> 123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333123333333333333333333333333333333333333333333333 </v-card-text>
                                                        </v-card>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                </v-flex>
                                            </v-layout>
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
