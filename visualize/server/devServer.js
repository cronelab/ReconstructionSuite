import express from 'express';
import routes from './routes.js';
import middleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import config from '../webpack.development.config.js';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
let __dirname = path.resolve(path.dirname(''));
const compiler = webpack(config);
const app = express();

const PORT = process.env.PORT || 80;

app.use(
  middleware(compiler, {
    // logLevel: 'warn',
    publicPath: config.output.publicPath,
  })
);

app.use(
  WebpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});
app.use('/', routes(express));

app.listen(PORT, () => console.log(`Serving on port: ${PORT}`));
