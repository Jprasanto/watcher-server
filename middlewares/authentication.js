const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) throw { name: "Please login first" }

        const payload = verifyToken(access_token);
        if (!payload) throw { name: "JsonWebTokenError" }

        const result = await User.findByPk(payload.id);
        if (!result) throw { name: "Invalid email/password" }

        req.user = {
            id: result.id,
            email: result.email,
            role: result.role
        }
        // console.log(req.user, "AUTEN")
        next();
    } catch (err) {
        console.log(err, "err authentication")
        next(err)
    }
};

module.exports = authentication;