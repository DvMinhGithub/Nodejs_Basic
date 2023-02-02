import express from 'express';
import homeController from '../controller/homeController'
let router = express.Router()

const intWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/create/user', homeController.createNewUser)
    router.post('/delete/user', homeController.deleteUser)
    router.get('/edit/user/:id', homeController.getEditPage)
    router.post('/update/user', homeController.postUpdateUser);
    return app.use('/', router)
}

module.exports = intWebRoute