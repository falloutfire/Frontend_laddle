<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center>
                        <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                //
            }
        }
    }
</script>
