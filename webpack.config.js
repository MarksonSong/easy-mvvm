const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
    mode: 'development',
    entry: {
        bundle: './mue.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist/index.html',
        open: true,
        hot: true
        // 跨域代理
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // },
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // The file to write the HTML to.
            filename: 'index.html',
            // webpack relative or absolute path to the template. 
            template: 'test.html',
            // chunks就是你在entry定义的入口的key
            chunks: ['bundle']
        })
    ]
}

module.exports = webpackConfig