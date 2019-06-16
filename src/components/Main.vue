<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout fill-height>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>TEST</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
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
                    <v-btn block>Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <ladle v-if="currentLadle" v-bind="currentLadle"></ladle>
    </v-layout>
</template>

<script>
    import Ladle from './Ladle';

    export default {
        components: {Ladle},
        data: () => ({
            currentLadle: null,
            ladles: [
                {
                    name: "test",
                    zones: [{
                        name: "test",
                        points: [
                            {
                                x: 100,
                                y: 200,
                            },
                            {
                                x: 150,
                                y: 200,
                            },
                            {
                                x: 300,
                                y: 250,
                            },
                            {
                                x: 400,
                                y: 250,
                            },
                            {
                                x: 300,
                                y: 300,
                            },
                        ],
                        refractories: [
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10",
                                        type: "int",
                                    },
                                ],
                            },
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10",
                                        type: "int",
                                    },
                                ],
                            },
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10",
                                        type: "int",
                                    },
                                ],
                            },
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10",
                                        type: "int",
                                    },
                                ],
                            },
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10",
                                        type: "int",
                                    },
                                ],
                            },
                            {
                                name: "test_refractory",
                                properties: [
                                    {
                                        id: 1,
                                        name: "test_property_1",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 2,
                                        name: "test_property_2",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 3,
                                        name: "test_property_3",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 4,
                                        name: "test_property_4",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 5,
                                        name: "test_property_5",
                                        value: "10",
                                        type: "int",
                                    },
                                    {
                                        id: 6,
                                        name: "test_property_6",
                                        value: "10101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010",
                                        type: "int",
                                    },
                                ],
                            },
                        ],
                    }],
                },
            ]
        }),
        methods: {
            chooseLadle(id) {
                this.currentLadle = this.ladles[id];
            },
        }
    }
</script>

<style>

</style>
