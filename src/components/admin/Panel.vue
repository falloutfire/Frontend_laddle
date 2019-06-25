<template>
    <v-layout row wrap>
        <v-toolbar app>
            <v-spacer></v-spacer>
            <v-btn  color="secondary" :to="{name: 'main'}">
                <span class="mr-2">Основная панель</span>
            </v-btn>
            <v-btn @click="logout().then(() => $router.push({name: 'login'}))" color="secondary">
                <span class="mr-2">Выход</span>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer"
                             class="primary"
                             dark
                             clipped
                             permanent
                             app
                             width="350">
            <v-divider></v-divider>
            <v-list dense class="pt-0">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <p class="text-md-center">Таблицы</p>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items"
                             :key="item.title"
                             @click="setCurrentTable(item.table)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-flex v-if="currentTableName" xs12 class="pt-5">
            <component :is="currentTableName"></component>
        </v-flex>
    </v-layout>
</template>

<script>
    import UserTable from './tables/user/UserTable';
    import ShopTable from './tables/shop/ShopTable';
    import LadleTable from './tables/ladle/LadleTable';
    import ZoneTable from './tables/zone/ZoneTable'
    import RefractoryTable from './tables/refractory/RefractoryTable'
    import PropertyTable from './tables/property/PropertyTable'
    import {mapActions} from 'vuex';

    export default {
        name: 'Panel',
        components: {
            UserTable,
            ShopTable,
            LadleTable,
            ZoneTable,
            RefractoryTable,
            PropertyTable,
        },
        data() {
            return {
                drawer: null,
                currentTableName: null,
                items: [
                    {
                        title: 'Пользователи',
                        table: 'UserTable',
                    },
                    {
                        title: 'Цехи',
                        table: 'ShopTable',
                    },
                    {
                        title: 'Ковши',
                        table: 'LadleTable',
                    },
                    {
                        title: 'Зоны',
                        table: 'ZoneTable',
                    },
                    {
                        title: 'Огнеупоры',
                        table: 'RefractoryTable',
                    },
                    {
                        title: 'Свойства',
                        table: 'PropertyTable',
                    },

                ],
            }
        },
        methods: {
            ...mapActions([
                'logout',
            ]),
            setCurrentTable(tableName) {
                this.drawer = !this.drawer;
                this.currentTableName = tableName;
            }
        },
    }
</script>
