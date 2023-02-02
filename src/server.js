import bodyParser from 'body-parser';
import express from 'express';
import configViewEngine from './configs/viewEngine'
import intWebRoute from './route/web'
import connection from './configs/connectDB'

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// setup view engine
configViewEngine(app)

//setup routes
intWebRoute(app)

app.use(bodyParser.json());

app.listen(PORT,() => {
     console.log(`Start at http://localhost:${PORT}`);
})