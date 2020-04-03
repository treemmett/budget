import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import sass from 'sass';

const config: Configuration = {
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': {
        pathRewrite: {
          '^/api': '',
        },
        target: 'http://localhost:8080',
      },
    },
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        loader: 'awesome-typescript-loader',
        test: /\.tsx?$/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[hash:base64:6]',
              },
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  output: {
    filename: 'main.[hash:6].js',
    path: path.join(__dirname, '/dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default config;
