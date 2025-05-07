import express from 'express';
import configViewEngine from './config/viewEngine';
import initwebRoutes from './routes/web';
import initApiRoute from './routes/api';
const cookieParser = require('cookie-parser');

require('dotenv').config();
var morgan = require('morgan')

const app = express();

app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log('Run to middleware');
    console.log('Time:', Date.now());
    next();
});

app.use(morgan('combined'));

//Middleware handle post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web routes
initwebRoutes(app);

//init api routes
initApiRoute(app);

//handle 404 not found
app.use((req, res) => {
    res.render('404NotFound.ejs');
});

app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});
