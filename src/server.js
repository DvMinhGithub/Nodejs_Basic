import express from 'express';
import configViewEngine from './configs/viewEngine';
import intWebRoute from './route/web';
import intAPIRoute from './route/api';
import mutler from 'multer';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup view engine
configViewEngine(app);

//setup routes
intWebRoute(app);

// init api route
intAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(PORT, () => {
    console.log(`Start at http://localhost:${PORT}`);
});
