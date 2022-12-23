<template>
    <v-container>
        <v-row>
            <products-filter title="篩選條件" :options="options" :default_options="default_options"
                @filter-products="filterProducts">
            </products-filter>

            <v-col cols="10">
                <v-sheet class="pa-4 pb-0">
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col cols="3" class="d-flex">
                            <v-text-field class="mr-2" dense flat hide-details rounded solo-inverted v-model="keyword"
                                placeholder="請輸入關鍵字" @keyup.enter="searchProducts">
                            </v-text-field>
                            <v-btn @click="searchProducts"> 商品搜尋 </v-btn>
                        </v-col>
                    </v-row>
                </v-sheet>
                <v-sheet min-height="70vh" class="d-flex flex-wrap pa-2">
                    <div class="text-overline" v-if="products.length == 0">
                        無相關產品，請重新搜尋
                    </div>

                    <v-card v-for="(product, index) in products" :key="index"
                        class="justify-space-between align-self-start ma-2" max-width="344" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">OVERLINE</div>
                                <v-list-item-title class="text-h5 mb-1">
                                    {{ product.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ product.description }}
                                </v-list-item-subtitle>
                                <v-list-item-title class="text-h6 mt-1">
                                    TWD {{ product.price }}
                                </v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-avatar tile size="80" color="grey">
                                <v-img :src="`./img/${product.name}.jpg`"></v-img>
                            </v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn outlined rounded text class="ml-auto">
                                Add
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import productsFilter from './ProductsFilter.vue';

export default {
    components: { productsFilter },
    data: () => ({
        products: [],
        default_options: {},
        options: {},
        keyword: '',
    }),
    methods: {
        getFilterOptions(types) {
            let options = {};
            types.forEach((type) => {
                options[type.kind] = options[type.kind] || [];
                options[type.kind].push(type.name);
            });
            return options;
        },
        searchProducts() {
            axios.get('products/searchProducts', { params: { keyword: this.keyword } }).then((response) => {
                this.products = response.data.products;
                //有搜尋到商品時，才更新篩選的選項!
                response.data.products.length != 0 && (this.options = this.getFilterOptions(response.data.types));
            });
        },
        filterProducts(selected_types) {
            axios.get('products/filterProducts', { params: { types: selected_types } }).then((response) => {
                this.products = response.data.products;
                this.keyword = '';
            });
        },
    },
    mounted() {
        axios.get('products/getAllProducts').then((response) => {
            this.products = response.data.products;
        });
        axios.get('products/getAllTypes').then((response) => {
            this.default_options = this.getFilterOptions(response.data.types);
        });
    },
};
</script>