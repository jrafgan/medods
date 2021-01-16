const {sha512} = require("js-sha512");
const dotenv = require("dotenv")
const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Model/Users');
const app = express();
const auth = require('./midleware/auth');
const jwt = require('jsonwebtoken');
dotenv.config()

app.use(cors({
    credentials: true,
    exposedHeaders: ['accessToken', 'refreshToken']
}))

app.use(express.json());
app.use(express.static('public'));

const port = 4000;

function generateAccessToken(username) {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 30});
}

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {

    app.post('/session', auth, async (req, res) => {

        try {
            const oldRefreshToken = req.refreshToken;
            let user = await User.find({refreshToken: oldRefreshToken});
            user = user[0];
            const username = {name: user.username};

            const accessToken = generateAccessToken(username);

            const refreshToken = await user.generateRefreshToken(username);

            await user.save();

            res.send({
                user,
                'accessToken': accessToken
            });
        } catch(e){
            return res.send(e);
        }

    });

    app.post('/login', async (req, res) => {

        try {
            const user = await User.findOne({username: req.body.username});

            if (!user) {
                return res.status(400).send({error: 'User does not exist'});
            }

            const isMatch = await user.checkPassword(req.body.password);

            if (!isMatch) {
                return res.status(400).send({error: 'Username or password is incorrect'});
            }

            const username = {name: user.username};

            const accessToken = generateAccessToken(username);

            const refreshToken = await user.generateRefreshToken(username);

            await user.save();

            res.send({
                user,
                'accessToken': accessToken
            });

        } catch (e) {
            return res.send(e);
        }
    }
);

    app.delete('/logout/:id', async (req, res) => {
        const id = req.params.id;

        const user = await User.findOne({_id: id});

        const username = {name: user.username}
        const success = {message: 'Logged out'};

        await user.generateRefreshToken(username);
        await user.save();
        return res.send(success);
    });

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});