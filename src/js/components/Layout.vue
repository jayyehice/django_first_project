<template>
    <v-app>
        <header-navigate :is_login="is_login"></header-navigate>
        <v-main class="grey lighten-3">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import headerNavigate from './HeaderNavigate.vue';

export default {
    components: { headerNavigate },
    data: () => ({
        is_login: false,
    }),
    watch: {
        $route: function () {
            axios.get('user/loginStatus').then((response) => {
                this.is_login = response.data.status;
            });
        },
    },
    created() {
        axios.get('/user/loginStatus').then((response) => {
            this.is_login = response.data.status;
        });
    },
};
</script>