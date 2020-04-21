import express from 'express';
import routes from "./routes.js";
const app = express();
import path from "path";
let __dirname = path.resolve(path.dirname(""));
import config from "./webpack.config.js";
// import graphQlRoutes from "./graphqlRoute.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import merge from "webpack-merge";
import webpack from "webpack";

let newConfig = merge(config, {
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});

const compiler = webpack(newConfig);
app.use(
	webpackDevMiddleware(compiler)
);

app.use("/", routes(express));

app.listen(5000, () => console.log("Serving"));
