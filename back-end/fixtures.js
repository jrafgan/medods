const mongoose = require('mongoose');
const config = require('./config');
const User = require('./Model/Users');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user1, user2] = await User.create(
        {
            username: 'John',
            password: '123'
        },
        {
            username: 'Alan',
            password: '123'
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});