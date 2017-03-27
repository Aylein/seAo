const webpack = require("webpack");
const path = require("path");
const html = require("html-webpack-plugin");

module.exports = {
    devtool: "#map-srouce",
    entry: {
        react: ["react", "react-dom", "react-router"],
        main: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
        chunkFilename: "js/[chunkhash:8].[name].chunk.min.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["es2015", {"loose": true}], "stage-0", "react"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new html({template: path.resolve(__dirname, "../src/default.html")}),
        new webpack.optimize.CommonsChunkPlugin({name: ["main"], minChunks: Infinity}),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ]
};