const path = require('path');

module.exports = {
  entry: './public/index.js', // Adjust this path to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/, // Add this rule for html-loader
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
};