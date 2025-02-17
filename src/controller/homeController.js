import connectDB from '../config/connectDB';
import { upload } from '../config/multerConfig';

let getHomePage = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM users');
        res.render('index.ejs', { users });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

let getUploadFile = async (req, res) => {
    try {
        return res.render('uploadFile.ejs');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Xử lý upload 1 file
let postUploadFile = (req, res) => {
    upload.single('profile_pic')(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (!req.file) {
            return res.send('Please select an image to upload');
        }
        if (err) {
            return res.send(err.message);
        }

        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);
    });
};



// Xử lý upload nhiều file
let postUploadMultipleFiles = (req, res) => {
    upload.array('profile_pic', 5)(req, res, (err) => { // Limit up to 5 images
        if (err) {
            console.error("Upload Error:", err);
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send('❌ You can only upload up to 5 images!');
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).send('Maximum 5 images allowed!');
            }
            return res.status(500).send(err.message);
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('Please select images to upload!');
        }

        let images = req.files.map(file => `<img src="/images/${file.filename}" width="200">`).join(' ');
        res.send(`You have uploaded these images: <hr/>${images}<hr /><a href="/upload-file">Upload more images</a>`);
    });
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

module.exports = {
    getHomePage, getDetailUser, getEditUser, postUpdateUser,
    postCreateUser, getDeleteUser, getUploadFile, postUploadFile, postUploadMultipleFiles
};