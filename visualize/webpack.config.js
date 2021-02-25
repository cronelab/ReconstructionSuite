import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WriteFilePlugin from "write-file-webpack-plugin";
let __dirname = path.resolve(path.dirname(""));

const module = {
	mode: "development",
	entry: {
		index: "./src/main.js",
		main: "./src/React/index.jsx"
	},
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				use:{
					loader: 'babel-loader',
					options:{
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: [
								"@babel/plugin-transform-runtime",

					]
			}
				}

				// 	plugins: [
				// 		"@babel/plugin-syntax-dynamic-import",
				// 		"@babel/plugin-transform-modules-commonjs",
				// 		"@babel/plugin-proposal-class-properties",
				// 		"@babel/plugin-proposal-export-default-from",
				// 	  ],
			
				// }
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
					loader: "style-loader"
				},
				{
					loader: "css-loader"
				}
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new WriteFilePlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			template: "./src/index.html",
			filename: "index.html",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			hash: true,
			template: "./src/React/index.html",
			filename: "threed.html",
			chunks: ["main"],
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all',
	// 	},
	// }
};
export default module;