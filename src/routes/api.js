import express from 'express';
import ApiControllers from '../controller/ApiController';

let router = express.Router();

const initApiRoute = async (app) => {
    router.get('/users', ApiControllers.getAllUsers); // Method GET => Read data
    router.post('/create-user', ApiControllers.createNewUser); // Method POST => Create data
    router.put('/update-user', ApiControllers.updateUser); // Method PUT => Update data
    router.delete('/delete-user/:id', ApiControllers.deleteUser); // Method DELETE => Delete data

    return app.use("/api/v1", router);

}
export default initApiRoute;