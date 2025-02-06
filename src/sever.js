const express = require('express');
require('dotenv').config();
import configViewEngine from './config/viewEngine';

const app = express();
const port = process.env.PORT || 3000;

configViewEngine(app);

app.get('/', (req, res) => {
    res.end('Hello Node.js');
});

app.get('/about', (req, res) => {
    res.end('Learn node.js with youtbe');
});

app.get('/index', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});
