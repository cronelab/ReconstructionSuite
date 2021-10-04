import webpack from 'webpack';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
let __dirname = path.resolve(path.dirname(''));

const module = {
  mode: 'development',
  context: __dirname,
  devServer: {
    hot: true,
  },
  entry: {
    main: './src/index.tsx',
  },
  // entry: [
  //   // Add the client which connects to our middleware
  //   // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
  //   // useful if you run your app from another point like django
  //   'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  //   // And then the actual application
  //   './src/main.ts',
  // ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
export default module;
