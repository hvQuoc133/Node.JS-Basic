import express from 'express';
import homeController from '../controller/homeController';
import authMiddleware from '../auth/authLogin';

let router = express.Router();

const initwebRoutes = async (app) => {

    //check middleware
    router.get('/', authMiddleware, homeController.getHomePage);

    router.get('/upload-file', homeController.getUploadFile);

    router.post('/upload-profile-pic', homeController.postUploadFile);

    router.post('/upload-multiple-images', homeController.postUploadMultipleFiles);

    router.get('/detail/user/:userId', homeController.getDetailUser);

    router.get('/edit/user/:userId', homeController.getEditUser);

    router.post('/update/user', homeController.postUpdateUser);

    router.post('/create/user', homeController.postCreateUser);

    router.get('/delete/user/:userId', homeController.getDeleteUser);

    router.get('/login', homeController.getLogin);

    router.post('/login', homeController.postLogin);

    return app.use("/", router);

}
export default initwebRoutes;