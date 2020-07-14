import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WriteFilePlugin from "write-file-webpack-plugin";
let __dirname = path.resolve(path.dirname(""));

const module = {
	mode: "production",
	entry: {
		index: "./src/main.js"
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
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
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	}
};
export default module;