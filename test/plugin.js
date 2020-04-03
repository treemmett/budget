const autoprefixer = require('autoprefixer');
const sass = require('sass');
const wp = require('@cypress/webpack-preprocessor');

module.exports = on => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            loader: 'awesome-typescript-loader',
            options: { transpileOnly: true },
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
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
    },
  };

  on('file:preprocessor', wp(options));
};
