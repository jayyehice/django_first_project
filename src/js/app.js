import Vue from 'vue';
import vuetify from './vuetify';
import VueRouter from 'vue-router';
import layout from './components/Layout.vue';
import productsPage from './components/ProductsPage.vue';
import login from './components/Login.vue';
import register from './components/Register.vue';
import personalManage from './components/PersonalManage.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
    { path: '/', component: productsPage },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/personalManage', component: personalManage },
];

const router = new VueRouter({
    mode:'history',
    routes,
});

new Vue({
    el: '#app',
    vuetify,
    router,
    components: { layout }
});