<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout fill-height>
        <v-toolbar app>
            <v-btn v-if="$store.getters.isAdmin" color="secondary" :to="{name: 'admin'}">
                <span class="mr-2">Admin Panel</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary">
                <span class="mr-2">LOG OUT</span>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
                class="deep-purple accent-4"
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
        <ladle v-if="currentLadle"  v-bind="currentLadle"></ladle>
    </v-layout>
</template>

<script>
    import Ladle from './Ladle';
    import HTTP from '../http';

    export default {
        components: {Ladle},
        data() {
            return {
                currentLadle: null,
                ladles: [],
            }
        },
        methods: {
            chooseLadle(id) {
                this.currentLadle = this.ladles[id];
            },
        },
        mounted() {
            HTTP.get('/bd/laddle').then(response => {
                this.ladles = response.data.result;
            })
        }
    }
</script>

<style>

</style>
