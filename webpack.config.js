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
        test: /\.(js|jsx)$/, // Adjusted to handle both .js and .jsx files
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
  resolve: {
    extensions: ['.js', '.jsx'], // Add .jsx to the extensions
  },
};