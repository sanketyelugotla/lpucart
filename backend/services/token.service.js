const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: expires
    }
    return jwt.sign(payload, secret)
}

const generateAuthToken = async (user) => {
    const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60
    const accessToken = generateToken(user._id, accessTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: new Date(accessTokenExpires * 1000)
        }
    }
}

module.exports = {
    generateToken,
    generateAuthToken
}