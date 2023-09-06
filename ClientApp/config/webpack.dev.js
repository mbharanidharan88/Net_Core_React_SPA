const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("../package.json");
const fs = require('fs');
const path = require('path');

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
      },
      https: {
          key: fs.readFileSync(path.resolve(__dirname, "keys/cert.key")),
          cert: fs.readFileSync(path.resolve(__dirname, "keys/cert.crt")),
          ca: fs.readFileSync(path.resolve(__dirname, "keys/ca.crt")),
      }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
