<template>
    <v-layout align-center justify-center>
        <v-flex xs6>
            <v-card>
                <v-layout>
                    <v-flex class="pa-5">
                        <p class="title text-xs-center mt-3 mb-2">Вход в систему</p>
                        <v-form @submit.prevent="login">
                            <v-text-field
                                    label="Логин"
                                    v-model="username"
                            ></v-text-field>
                            <v-text-field
                                    label="Пароль"
                                    type="password"
                                    v-model="password"
                            ></v-text-field>
                            <v-btn
                                    block
                                    large
                                    :loading="loading"
                                    class="mb-3 elevation-0"
                                    type="submit"
                                    color="primary"
                                    dark
                                    @click="login"
                            >Войти</v-btn>
                        </v-form>
                        <v-alert type="error" outline :value="error">
                            Неверные данные для входа
                        </v-alert>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import HTTP from '../http';
    import { mapActions } from 'vuex';

    export default {
        name: "Login",
        data() {
          return {
              username: "",
              password: "",
              loading: false,
              error: null,
          }
        },
        methods: {
            ...mapActions([
                'setTokensInfo'
            ]),
            getBase64() {
                return 'YXBwX2NsaWVudDphcHBfYmFzZV9zZWNyZXQ='//btoa('mobile_app_client.mobile_app_password');
            },
            login() {
                this.loading = true;
                const formData = new FormData();
                formData.set('username', this.username);
                formData.set('password', this.password);
                formData.set('grant_type', 'password');
                HTTP.post('oauth/token', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Basic ${this.getBase64()}`
                        }
                    }
                ).then(response => {
                    this.setTokensInfo(response.data).then(() => {
                        this.$router.push({name: 'main'})
                    });
                    this.loading = false;
                }).catch(error => {
                    console.log(error.response);
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
