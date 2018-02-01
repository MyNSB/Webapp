const merge = require("webpack-merge");
const Uglify = require("uglifyjs-webpack-plugin");

const config = require("./webpack.config.js");

module.exports = merge(config, {
    plugins: [
        new Uglify()
    ]    
});
