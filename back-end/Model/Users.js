const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
     },
    refreshToken: {
        type: String,
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateRefreshToken = async function(username) {

    const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET);

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    const refToken = await bcrypt.hash(refreshToken, salt);

    return this.refreshToken = refToken;
}

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
