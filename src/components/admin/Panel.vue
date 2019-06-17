<template>
    <v-layout row wrap>
        <v-toolbar app>
            <v-btn  color="secondary" :to="{name: 'main'}">
                <span class="mr-2">Main</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="$store.dispatch('clearTokens').then(() => $router.push({name: 'login'}))" color="secondary">
                <span class="mr-2">LOG OUT</span>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer"
                             class="deep-purple accent-4"
                             dark
                             clipped
                             permanent
                             app
                             width="350">
            <v-divider></v-divider>
            <v-list dense class="pt-0">
                <v-list-tile v-for="item in items"
                             :key="item.title"
                             @click="setCurrentTable(item.table)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-flex v-if="currentTable" xs12 class="pt-5">
            <crud-table
                    :key="currentTable.tableName"
                    v-bind="currentTable"
            ></crud-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import CrudTable from '@/components/admin/CrudTable'
    import lodash from 'lodash';

    import {defaultUser, usersDescription} from "@/models/users";
    import {defaultZone, zoneDescription} from "@/models/zones";
    import {defaultShop, shopDescription} from "@/models/shops";
    import {refractoryDescription, defaultRefractory} from "@/models/refractories";
    import {defaultProperty, propertyDescription} from "@/models/properties";
    import {defaultLadle, ladleDescription} from "@/models/ladles";


    export default {
        name: 'Panel',
        components: {
            CrudTable
        },
        data() {
            return {
                drawer: null,
                currentTableName: null,
                tables: {
                    'UserTable': {
                        tableName: 'User',
                        crudURL: 'users',
                        itemsDescription: lodash.cloneDeep(usersDescription),
                        defaultItem: lodash.cloneDeep(defaultUser),
                        filterName: 'login'
                    },
                    'ShopsTable': {
                        tableName: 'Shops',
                        crudURL: 'bd/shop',
                        itemsDescription: lodash.cloneDeep(shopDescription),
                        defaultItem: lodash.cloneDeep(defaultShop),
                        filterName: 'name'
                    },
                    'LadlesTypesTable': {
                        tableName: 'Ladles',
                        crudURL: 'bd/laddle',
                        itemsDescription: lodash.cloneDeep(ladleDescription),
                        defaultItem: lodash.cloneDeep(defaultLadle),
                        filterName: 'name'
                    },
                    'ZonesTable': {
                        tableName: 'Zones',
                        crudURL: 'bd/zone',
                        itemsDescription: lodash.cloneDeep(zoneDescription),
                        defaultItem: lodash.cloneDeep(defaultZone),
                        filterName: 'name'
                    },
                    'RefractoriesTable': {
                        tableName: 'Refractories',
                        crudURL: 'bd/refractory',
                        itemsDescription: lodash.cloneDeep(refractoryDescription),
                        defaultItem: lodash.cloneDeep(defaultRefractory),
                        filterName: 'name'
                    },
                    'PropertiesTable': {
                        tableName: 'Properties',
                        crudURL: 'bd/property',
                        itemsDescription: lodash.cloneDeep(propertyDescription),
                        defaultItem: lodash.cloneDeep(defaultProperty),
                        filterName: 'name'
                    },
                },
                items: [
                    {
                        title: 'Users',
                        table: 'UserTable',
                    },
                    {
                        title: 'Shops',
                        table: 'ShopsTable',
                    },
                    {
                        title: 'Ladles',
                        table: 'LadlesTypesTable',
                    },
                    {
                        title: 'Zones',
                        table: 'ZonesTable',
                    },
                    {
                        title: 'Refractories',
                        table: 'RefractoriesTable',
                    },
                    {
                        title: 'Properties',
                        table: 'PropertiesTable',
                    },

                ],
            }
        },
        methods: {
            setCurrentTable(tableName) {
                this.drawer = !this.drawer;
                this.currentTableName = tableName;
            }
        },
        mounted() {

        },
        computed: {
            currentTable() {
                return this.currentTableName ? this.tables[this.currentTableName] : null
            },
            table() {
                return this.currentTableName ? CrudTable : null
            }
        }
    }
</script>
