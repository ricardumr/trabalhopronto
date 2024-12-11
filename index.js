import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

import publicroutes from './routes/public.js';
import adminroutes from './routes/admin.js';

app.use(publicroutes);
app.use(adminroutes);

app.listen(port);