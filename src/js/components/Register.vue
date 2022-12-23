<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark>
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="name" label="name" type="text">
                            </v-text-field>
                            <v-text-field v-model="email" label="email" type="email">
                            </v-text-field>
                            <v-text-field v-model="password" label="password" type="password">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-wrap">
                        <h5 v-if="hint != ''" class="red--text text--lighten">{{hint}}</h5>
                        <v-btn @click="signUp" color="#BDBDBD" block>sing up</v-btn>
                        <v-divider class="ma-8"></v-divider>
                        <v-btn block to="/login">already have account</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        name: '',
        email: '',
        password: '',
        hint: '',
    }),
    methods: {
        signUp() {
            if (this.name == '' || this.email == '' || this.password == '') {
                this.hint = '請填寫註冊資料';
            } else {
                axios
                    .post(
                        'api/user/signUp',
                        {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                        },
                        {
                            headers: {
                                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                            },
                        }
                    )
                    .catch((error) => {
                        let message = JSON.parse(error.request.response);
                        let hint = '';
                        Object.values(message.errors).forEach((error) => {
                            hint += error;
                        });
                        this.hint = hint;
                    })
                    .then((response) => {
                        if (response.data.success) {
                            alert('註冊成功，請重新登入');
                            location.href = '/#/login';
                        } else {
                            this.hint = '註冊失敗 - ' + response.data.message;
                        }
                    });
            }
        },
    },
    created() {
        axios.get('/user/loginStatus').then((response) => {
            response.data.status && history.go(-1);
        });
    },
};
</script>
