require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const reqBody = req.body;

    const accessToken = reqBody.accessToken;
    const refreshToken = reqBody.user.refreshToken;
    if (!accessToken) return res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, id) => {

        if (err) return res.sendStatus(403)
        req.refreshToken = refreshToken;
        next()
    })
};

module.exports = auth;
