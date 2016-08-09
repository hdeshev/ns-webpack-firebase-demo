var bundler = require("nativescript-dev-webpack");
//var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = bundler.getConfig({
});

config.context = path.resolve("./app");
config.resolve.extensions.unshift(".ts");
config.entry.bundle = "./main.ts";

config.module = {
    loaders: [
        {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }
    ]
};

config.plugins.push(
    new CopyWebpackPlugin([
        {
            from: path.resolve("google-services.json"),
            to: path.resolve("platforms/android")
        }
    ])
);

//config.plugins.push(new ForkCheckerPlugin());

console.log(JSON.stringify(config, null, "    "));
module.exports = config;
