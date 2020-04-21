import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

import WriteFilePlugin from "write-file-webpack-plugin";
let __dirname = path.resolve(path.dirname(""));
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const devMode = process.env.NODE_ENV !== "production";

const module = {
	mode: devMode ? "development" : "production",
	devtool: devMode ? "inline-source-map" : "source-map",
	entry: {
		index: "./src/reconstruction3D/main.js"
	},

	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
					plugins: [
						"@babel/plugin-syntax-dynamic-import",
						"@babel/plugin-transform-modules-commonjs",
						"@babel/plugin-transform-runtime",
						"@babel/plugin-proposal-class-properties",
						"@babel/plugin-proposal-export-default-from"
					],
					cacheDirectory: true
				}
			},
			{
				test: /\.(png|jpe?g|gif|fbx|glb|gltf|nii|mgz)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
					loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
				},
				{
					loader: "css-loader"
				},
				{
					loader: "postcss-loader"
				},
				{
					loader: "sass-loader"
				}
				]
			},
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		},
		usedExports: true
	},

	plugins: [
		new CleanWebpackPlugin.CleanWebpackPlugin(),
		new WriteFilePlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			hash: true,
			template: "./src/reconstruction3D/index.html",
			filename: "index.html",
			chunks: ["index"],
		}),
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js",
		globalObject: `typeof self !== 'undefined' ? self : this`,
		publicPath: '/'

	}
};
export default module;