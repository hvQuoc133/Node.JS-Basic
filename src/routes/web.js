import express from 'express';
import homeController from '../controller/homeController';
import connectDB from '../config/connectDB';

let router = express.Router();

const initwebRoutes = async (app) => {

    router.get('/', async (req, res) => {
        try {
            const connection = await connectDB();
            const [users] = await connection.execute('SELECT * FROM users');
            res.render('index.ejs', { users });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });

    router.get('/detail/user/:userId', async (req, res) => {
        try {
            const connection = await connectDB();
            const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.params.userId]);
            res.render('detailUser.ejs', { user: users[0] });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });

    return app.use("/", router);

}
export default initwebRoutes;