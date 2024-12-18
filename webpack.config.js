const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MyPlugin = require("./MyPlugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: { index: "./src/index.js", testA: "./src/testA.js", testB: "./src/testB.js" },
  devServer: {
    port: 8888,
    hot: true,
    open: true,
    compress: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
    //assetModuleFilename: "static/[hash][ext][query]" //仅适用于 asset 和 asset/resource 模块类型。因为其它类型没有文件，是以内容形式引入的。
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 80000,
      automaticNameDelimiter: "~",
      cacheGroups: {
        moment: {
          test: /[\\/]node_modules[\\/]moment/,
          priority: -1,
          reuseExistingChunk: true
        },
        mode_modules: {
          test: /[\\/]node_modules[\\/]/,
          priority: -2,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devtool: "eval-cheap-module-source-map", // source map
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({ filename: "static/css/[name].css" }), //更改css文件名及路径
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }]
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new MyPlugin({ param: "user input params" })
  ],

  module: {
    noParse: /jquery|moment/,
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 配置选项，如果需要的话
                      // 例如：
                      // browsers: 'last 2 versions',
                      // features: {
                      //   'custom-properties': false,
                      // }
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.txt$/,
        loader: path.join(__dirname, "upper-loader.js")
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          ,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          ,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          "postcss-loader",
          // 将 Sass 编译成 CSS
          "sass-loader"
        ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              // All default supported tags and attributes
              "...",
              {
                tag: "img",
                attribute: "src",
                type: "src"
              }
            ]
          }
        }
      },
      //   { // assert/resource 生成具体图片，以图片路径形式引入
      //     test: /\.png/,
      //     type: "asset/resource",
      //     generator: {
      //       filename: "images/[name].[hash:4][ext][query]"
      //     }
      //   }
      //   { // assert/inline以图片内容base64形式引入，不生产图片文件
      //     test: /\.png/,
      //     type: "asset/inline"
      //   }
      // {
      //   // assert/source 引入txt文件内容
      //   test: /\.txt/,
      //   type: "asset/source"
      // },
      {
        //在assert/resource与assert/inline之前选择
        test: /\.png/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb 小于4kb用assert/inline 否则用assert/resource
          }
        },
        generator: {
          filename: "static/media/[name].[hash:4][ext][query]" // 修改文件路径及名称，仅仅assert/resource模式下生效
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  }
};
