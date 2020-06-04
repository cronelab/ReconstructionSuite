import express from 'express';
import routes from "./routes.js";
const app = express();
import config from "./webpack.config.js";
import webpackDevMiddleware from "webpack-dev-middleware";
import merge from "webpack-merge";
import webpack from "webpack";

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => console.log("Serving"));
