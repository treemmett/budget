const autoprefixer = require('autoprefixer');
const sass = require('sass');
const wp = require('@cypress/webpack-preprocessor');

module.exports = on => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            options: { transpileOnly: true }
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    localIdentName: '[hash:base64:6]'
                  }
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: [autoprefixer]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: sass
                }
              }
            ]
          }
        ]
      }
    }
  };

  on('file:preprocessor', wp(options));
};
