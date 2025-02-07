import mysql from 'mysql2/promise';

const connectDB = async () => {
    try {
        // Create connection
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'nodejsbasic',
        });

        return connection;

    } catch (err) {
        console.log('Connection database error', err);
    }
}

// Call the connection function
connectDB().then((connection) => {
    if (connection) {
        console.log('Connection Database success');
    }
});

export default connectDB;
