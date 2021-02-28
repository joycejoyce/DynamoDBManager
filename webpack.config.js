//引用path模組
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //如果有一個以上的檔案需要打包，可以傳陣列給entry
    entry: ['./scripts/src/view/main.js', './styles/index.scss'],
    output: {
        filename: './scripts/dist/bundle.js',
        path: path.resolve(__dirname, './'),
    },
    //將loader的設定寫在module的rules屬性中
    module: {
        //rules的值是一個陣列可以存放多個loader物件
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { 
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-runtime',
                            { "regenerator": true }]
                        ]
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    //增加一個給devserver的設定
    /*devServer: {
        //指定開啟port為9000
        port: 9000
    },*/
    plugins: [
        new MiniCssExtractPlugin({
            // 指定輸出位置
            // [name] 為上方進入點設定的 "名稱"
            filename: "./styles/index.css"
        })
    ]
};