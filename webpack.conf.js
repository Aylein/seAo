var path = require("path");
var fs = require("fs");
var webpack = require("webpack");

let externals = _externals();
function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}

var nodeModules = {};
fs.readdirSync("node_modules")
    .filter(function(x) {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = "commonjs " + mod;
    });

module.exports = {
    devtool: "cheap-module-source-map",
    entry: "./server.js",
    context: __dirname,
    target: "node",
    node: {
        __filename: true,
        __dirname: true,
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
		filename: "./server.js"
    },
    externals: externals,
    // externals: nodeModules,
    plugins: [
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // }),
        // new es3ifyPlugin(), //修复 default 在 ie8 的兼容问题 //插件有错需要修改
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({name: ["es6", "react"], minChunks: Infinity}),
        // new webpack.DefinePlugin({"process.env": {"NODE_ENV": "production"}}),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: "babel-loader", 
                exclude: /node_modules/, 
                query: {
                    presets: ["es2015", "stage-0"], //jsx es6 loader //loose 用于解决继承类 state props 丢失的问题
                    plugins: [
                        "transform-runtime",
                        "transform-es5-property-mutators",
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals"
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};