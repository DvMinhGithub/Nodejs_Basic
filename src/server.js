import express from 'express';
import configViewEngine from './configs/viewEngine'
import intWebRoute from './route/web'

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setup view engine
configViewEngine(app)

//setup routes
intWebRoute(app)

app.listen(PORT,() => {
     console.log(`Start at http://localhost:${PORT}`);
})