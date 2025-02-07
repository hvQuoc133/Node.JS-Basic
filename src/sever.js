import express from 'express';
import configViewEngine from './config/viewEngine';
import initwebRoutes from './routes/web';
import connectDB from './config/connectDB';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//set up view engine
configViewEngine(app);

//init web
initwebRoutes(app);

app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});
