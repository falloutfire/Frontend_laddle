<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout fill-height>
        <v-toolbar app>
            <v-spacer></v-spacer>
            <v-btn v-if="$store.getters.isAdmin" color="secondary" :to="{name: 'admin'}">
                <span class="mr-2">Панель администратора</span>
            </v-btn>
            <v-btn @click="logout().then(() => $router.push({name: 'login'}))" color="secondary">
                <span class="mr-2">Выход</span>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
                class="primary"
                dark
                clipped
                permanent
                app
        >
            <v-list>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <p class="text-md-center">Ковши</p>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile
                        v-for="(item, id) in ladles"
                        :key="item.name"
                        @click="chooseLadle(id)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn @click="$store.dispatch('clearTokens').then(() => $router.push({name: 'login'}))" block>
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-flex xs12>
            <ladle v-if="currentLadle" v-bind="currentLadle"></ladle>
        </v-flex>
    </v-layout>
</template>

<script>
    import Ladle from './Ladle';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        components: {Ladle},
        data() {
            return {
                currentLadle: null,
            }
        },
        methods: {
            ...mapActions([
                'logout',
                "updateLadles"
            ]),
            chooseLadle(id) {
                this.currentLadle = this.ladles[id];
            },
        },
        computed: {
            ...mapGetters([
                "ladles",
            ]),
        },
        mounted() {
            this.updateLadles()
        }
    }
</script>

<style>

</style>
