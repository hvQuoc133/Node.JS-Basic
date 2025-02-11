import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

const initwebRoutes = async (app) => {

    router.get('/', homeController.getHomePage);

    router.get('/detail/user/:userId', homeController.getDetailUser);

    router.get('/edit/user/:userId', homeController.getEditUser);

    router.post('/update/user', homeController.postUpdateUser);

    router.post('/create/user', homeController.postCreateUser);

    router.get('/delete/user/:userId', homeController.getDeleteUser);

    return app.use("/", router);

}
export default initwebRoutes;