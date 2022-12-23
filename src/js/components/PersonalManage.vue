<template>
    <v-container>
        <v-card class="pa-4" min-height="80vh">
            <v-card-title>
                <span class="headline">商品管理</span>
            </v-card-title>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="products" sort-by="calories" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-col cols="2">
                                <v-text-field label="輸入關鍵字搜索" v-model.lazy="keyword" append-icon="mdi-magnify"
                                    max-width="200px" @keyup.enter="searchProducts" hide-details />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                        新增商品
                                    </v-btn>
                                </template>
                                <!-- 新增/修改 彈窗 -->
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="edited_item.name" label="name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="edited_item.description" label="description">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="edited_item.price" label="price">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">
                                            Cancel

                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="save">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                <!-- 新增/修改 彈窗 end -->
                            </v-dialog>
                            <!-- 確認移除彈窗 -->
                            <v-dialog v-model="delete_dialog" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">您是否確認要刪除此商品?
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!-- 確認移除彈窗end -->
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dialog: false,
            delete_dialog: false,
            desserts: [],
            edited_index: -1,
            edited_item: {
                name: '',
                description: '',
                price: 0,
            },
            defaultItem: {
                name: '',
                description: '',
                price: 0,
            },
            products: [],
            options: {},
            keyword: '',
            headers: [
                {
                    align: 'left',
                    text: 'name',
                    value: 'name',
                    width: '30%',
                },
                {
                    text: 'description',
                    value: 'description',
                    width: '30%',
                },
                {
                    text: 'price',
                    value: 'price',
                    width: '30%',
                },
                {
                    text: 'actions',
                    value: 'actions',
                },
            ],
        };
    },
    methods: {
        searchProducts(value) {
            if (!this.dessertFilterValue) {
                return true;
            }
            return value.toLowerCase().includes(this.dessertFilterValue.toLowerCase());
        },
        editItem(item) {
            this.edited_index = this.products.indexOf(item);
            console.log(item);
            this.edited_item = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.edited_index = this.products.indexOf(item);
            this.edited_item = Object.assign({}, item);
            this.delete_dialog = true;
        },
        deleteItemConfirm() {
            this.products.splice(this.edited_index, 1);
            this.closeDelete();
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.edited_item = Object.assign({}, this.defaultItem);
                this.edited_index = -1;
            });
        },
        closeDelete() {
            this.delete_dialog = false;
            this.$nextTick(() => {
                this.edited_item = Object.assign({}, this.defaultItem);
                this.edited_index = -1;
            });
        },
        save() {
            if (this.edited_index > -1) {
                axios.post('manageProduct/updateProduct', this.edited_item).then((response) => {
                    if (response.data.success) {
                        alert('修改成功');
                        Object.assign(this.products[this.edited_index], this.edited_item);
                        this.close();
                    }
                });
            } else {
                axios.post('manageProduct/addProduct', this.edited_item).then((response) => {
                    if (response.data.success) {
                        alert('新增成功');
                        this.products.push(this.edited_item);
                        this.close();
                    }
                });
            }
        },
    },
    computed: {
        total() {
            return this.products.length;
        },
        formTitle() {
            return this.edited_index === -1 ? '新增商品' : '修改商品';
        },
    },
    created() {
        axios.get('user/loginStatus').then((response) => {
            // !response.data.status && (location.href = '/');
        });
    },
    mounted() {
        axios.get('products/getAllProducts').then((response) => {
            this.products = response.data.products;
        });
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        delete_dialog(val) {
            val || this.closeDelete();
        },
    },
};
</script>