const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },
  devServer: {
    port: 8000,
    hot: true,
    compress: true,
    open: true
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyWebpackPlugin({ patterns: { from: "./src/static", to: "static" } }),
    new MiniCssExtractPlugin({ filename: "public/[name].css" })
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
    minimize: true,
    splitChunks: {
      miniSize: 800000,
      chunks: "all",
      cacheGroupe: {
        moment: {
          test: /[\\/]node_modules[\\/]moment/,
          reuseExistingChunks: true,
          priority: 100
        },
        default: {
          reuseExistingChunks: true,
          priority: -100
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [[MiniCssExtractPlugin.loader, "css-loader"]]
      },
      {
        test: /\.png|jpg/,
        type: "resource",
        generator: { filename: "images/[name][hashcontent:8][ext]" }
      }
    ]
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-env"],
            plugins: []
          }
        }
      }
    ]
  }
};
