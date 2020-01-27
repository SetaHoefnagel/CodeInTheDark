/*
 * Copyright Kindermedicijn
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

console.log(JSON.stringify((process.env.HOSTNAME !== undefined ? process.env.HOSTNAME.split(',')[0] : 'localhost:8000')))

module.exports = {
  entry: {
    main: ['./src/typescript/main.tsx', './src/sass/main.scss'],
    serviceWorker: './src/typescript/serviceWorker.ts'
  },
   plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
      allChunks: true
   }),
    new webpack.DefinePlugin({
      HOST_URL: JSON.stringify((process.env.HOSTNAME !== undefined ? process.env.HOSTNAME.split(',')[0] : 'localhost:8000'))
    }),

  ],
  module: {
      rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: [
            'ts-loader',
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath: 'images/',
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true, // webpack@1.x
                    disable: true, // webpack@2.x and newer
                },
            }],
        },
      {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-url-loader',
            },
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'build')
  },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  }
};
