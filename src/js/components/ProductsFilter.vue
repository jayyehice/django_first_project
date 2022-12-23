<template>
    <v-col cols="2">
        <v-sheet class="pa-4" rounded="lg">
            <!-- 篩選條件 -->
            <v-list-group :value="true">
                <template v-slot:activator>
                    <v-list-item-title>{{ title }}</v-list-item-title>
                </template>

                <v-list-group v-for="(types, kind) in default_options" :key="kind" :value="true" no-action sub-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{ kind }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item>
                        <v-checkbox v-model="selected_kinds[kind]" label="全選" @change="select_all(kind)">
                        </v-checkbox>
                    </v-list-item>

                    <v-list-item v-for="(type, i) in types" :key="i">
                        <v-checkbox v-model="selected_options[kind]" :label="type" :value="type"
                            :disabled="checkbox_disable(kind, type)">
                        </v-checkbox>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
            <!-- 篩選條件End -->
            <v-btn block class="mt-4" @click="$emit('filter-products', Object.values(selected_options).flat())">
                篩選
            </v-btn>
        </v-sheet>
    </v-col>
</template>

<script>
export default {
    props: {
        title: String,
        default_options: Object,
        options: Object,
    },
    data() {
        return {
            selected_options: {},
            selected_kinds: {},
        };
    },
    methods: {
        checkbox_disable(kind, type) {
            //勾選選項剩一個時，不能再取消勾選
            return (this.selected_options[kind].includes(type) || false) && this.selected_options[kind].length < 2;
        },
        select_all(kind) {
            this.selected_kinds[kind] && (this.selected_options[kind] = this.default_options[kind]);
        },
    },
    watch: {
        options: {
            handler: function (new_options) {
                this.selected_options = Object.assign({}, new_options);
            },
            immediate: true,
        },
        default_options: {
            handler: function (new_default_options) {
                this.selected_options = Object.assign({}, new_default_options);
                Object.keys(new_default_options).forEach((kind) => {
                    this.selected_kinds[kind] = true;
                });
            },
            immediate: true,
        },
        selected_options: {
            //篩選條件有變動時，調整全選的checkbox狀態
            handler: function (new_selected_options) {
                Object.keys(new_selected_options).forEach((kind) => {
                    this.selected_kinds[kind] = new_selected_options[kind].length == this.default_options[kind].length;
                });
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>