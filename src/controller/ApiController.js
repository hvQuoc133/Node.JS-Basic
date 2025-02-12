import connectDB from '../config/connectDB';

let getAllUsers = async (req, res) => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM users');

        return res.status(200).json({
            message: "Get all users success",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

let createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, email, address } = req.body;

        if (!firstName || !lastName || !email || !address) {
            return res.status(200).json({
                message: 'Missing required params!',
            });
        }

        const connection = await connectDB();
        await connection.execute(
            'INSERT INTO users ( firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, address,]
        )
        return res.status(200).json({
            message: "Create new user success",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

let updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, email, address } = req.body;
        if (!id || !firstName || !lastName || !email || !address) {
            return res.status(200).json({
                message: 'Missing required params!',
            });
        }
        const connection = await connectDB();
        await connection.execute(
            'UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
            [firstName, lastName, email, address, id]
        );
        return res.status(200).json({
            message: "Update user success",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

let deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                message: 'Missing required params!',
            });
        }
        const connection = await connectDB();
        const [users] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
        return res.status(200).json({
            message: "Delete user success",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
};
