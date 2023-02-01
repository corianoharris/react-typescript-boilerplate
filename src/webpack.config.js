
const path = require("path");
const { DefinePlgin } = require('webpack')
const { execSync } = require('child.process')
const { version } = require('../package.json')
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getCommitSHA() {
  try {
    const command = `git --no-pager log -1  --format="%H"`
    return execSync( command, { encoding: 'utf8})'}).trim()
  } catch (e) {
    return "unknown"
  }
}

module.exports = {
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "public"), filename: "bundle.js", clean: true},
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new DefinePlgin({
        APPLICATION_BUILD_INFO: JSON.stringify({
          date: new Date().toISOString(),
          commit: getCommitSHA(),
          version,
        })
      })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
      ],
      devtool: "inline-source-map",
};