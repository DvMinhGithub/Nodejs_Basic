import express from 'express';
import homeController from '../controller/homeController'
let router = express.Router()

const intWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getDetailPage)

    return app.use('/', router)
}

module.exports = intWebRoute