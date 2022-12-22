const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname,
        filename: "./templates/js/bundle.js"
    },
    module: {
        rules: [
            // 編譯 css 檔案設定
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    }, 
    plugins: [
        new VueLoaderPlugin()
    ],
};