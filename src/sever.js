import express from 'express';
import configViewEngine from './config/viewEngine';
import initwebRoutes from './routes/web';
import initApiRoute from './routes/api';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware handle post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web routes
initwebRoutes(app);

//init api routes
initApiRoute(app);

app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});
