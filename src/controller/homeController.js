import connectDB from '../config/connectDB';

let getHomePage = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM users');
        res.render('index.ejs', { users });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let getDetailUser = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.params.userId]);
        res.render('detailUser.ejs', { user: users[0] });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let postCreateUser = async (req, res) => {
    try {
        if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.address) {
            return res.status(400).send({ message: 'Data to update can not be empty!' });
        }
        const { firstName, lastName, email, address } = req.body;
        const connection = await connectDB();

        await connection.execute(
            'INSERT INTO users ( firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, address,]
        )
        res.redirect('/');

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let getEditUser = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.params.userId]);
        res.render('editUser.ejs', { user: users[0] });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let postUpdateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, email, address } = req.body;
        const connection = await connectDB();

        await connection.execute(
            'UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
            [firstName, lastName, email, address, id]
        );

        res.redirect('/')
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let getDeleteUser = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('DELETE FROM users WHERE id = ?', [req.params.userId]);
        res.redirect('/');

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = { getHomePage, getDetailUser, getEditUser, postUpdateUser, postCreateUser, getDeleteUser };