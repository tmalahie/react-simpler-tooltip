const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.css$/, use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]}
    ]
  }
}