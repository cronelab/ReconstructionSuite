import path from 'path';
import express from 'express';
import routes from './routes.js';
const app = express();
let __dirname = path.resolve(path.dirname(''));

const PORT = process.env.PORT || 5000;

app.use('/', routes(express));
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(PORT, () => console.log(`Serving on port: ${PORT}`));
