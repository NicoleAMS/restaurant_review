const path = require("path");
const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
  mode: "production",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  }
});
