import bodyParser from 'body-parser';
import express from 'express';
import configViewEngine from './configs/viewEngine'
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

configViewEngine(app)

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.render('index.ejs')
})

app.listen(PORT,() => {
     console.log(`Start at http://localhost:${PORT}`);
})