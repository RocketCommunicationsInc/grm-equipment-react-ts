//home-app/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  entry: './src/entry',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'GRMEquipment',
      filename: 'remoteEntry.js',
      exposes: {
        // which exposes
        './EquipmentDetails':
          './src/Components/EquipmentDetailsPanel/EquipmentDetailsPanel.tsx',
      },
      shared: {
        // and shared
        ...dependencies, // some other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          // react-dom
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'web',
};