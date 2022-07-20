const mode = process.env.NODE_ENV || "development";
const path = require("path");

module.exports = {
  mode: mode,

  entry: "./src/index.ts",
  module: {
    rules: [
      {
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  }
};