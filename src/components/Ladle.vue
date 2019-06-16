<template>
    <v-layout row wrap>
        <v-flex xs12>
            <photo-holder
                    :zones="zones"
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
                <v-data-table
                        expand
                        :headers="headers"
                        :items="currentZone ? currentZone.refractories : []"
                        hide-actions
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <template v-for="prop in Object.values(props.item.properties)">
                            <td :key="prop.id"><p style="word-break: break-all">{{ prop.value }}</p></td>
                        </template>
                    </template>
                </v-data-table>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import PhotoHolder from './PhotoHolder'

    export default {
        name: "Shop",
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
            headers() {
                if (this.currentZone) {
                    const propertiesHeader = this.currentZone.refractories[0].properties.map(el => {
                        return {
                            text: el.name, value: el.name
                        }
                    });
                    return [{text: 'name', value: 'name'}].concat(propertiesHeader)
                } else {
                    return []
                }
            },
            zoneName() {
                if(this.currentZone) {
                    return this.currentZone.name
                }
                return ""
            }
        },
    }
</script>

<style scoped>

</style>
