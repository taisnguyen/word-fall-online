const mode = process.env.NODE_ENV || "development";
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = mode == "development";

module.exports = {
    mode: mode,
    entry: {
        homepage: "./src/client/homepage.ts",
    },
    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.module\.s(a|c)ss$/i,
                use: [
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment,
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: ["utils/styles"]
                            },
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/i,
                exclude: /\.module\.s(a|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                    // Compiles Sass to CSS
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment,
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: ["utils/styles"]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.ts$/i,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
};