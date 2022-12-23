<template>
    <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
            <v-row>
                <v-col cols="2" class="d-flex justify-center align-center pa-0">
                    <v-avatar rounded width="60%" class="overflow-hidden">
                        <v-img src="./img/logo.png"></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <v-btn to="/" plain text>
                        Products
                    </v-btn>
                </v-col>
                <v-col cols="2" class="d-flex">
                    <v-btn class="ml-auto" plain text>
                        <v-icon>mdi-cart-outline</v-icon>
                    </v-btn>
                    <v-btn class="mr-auto" to="/personalManage" plain text>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-btn v-if="!is_login" color="primary" to="/login">登入</v-btn>
                    <v-btn v-else to="/" color="grey darken-1" @click="logout">登出</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import axios from 'axios';
export default {
    props: ['is_login'],
    methods: {
        logout() {
            axios.get('user/logout');
            location.href = '/';
        },
    },
};
</script>