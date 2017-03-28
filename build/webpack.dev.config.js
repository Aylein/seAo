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
        path: path.resolve(__dirname, "../src"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js"
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
    devServer: {
        port: 800,
        inline: true,
        historyApiFallback: true,
        compress: true,
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("develepment")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new html({template: path.resolve(__dirname, "../src/default.html")})
    ]
};