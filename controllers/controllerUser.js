const { User } = require('../models/index')
const { generateToken } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/bcrypt')

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await User.findOne({ where: { email } })
            if (!data) {
                throw { name: "Invalid email/password" }
            }
            if (!verifyPassword(password, data.password)) throw { name: "Invalid email/password" }

            const token = generateToken({
                id: data.id,
                email: data.email,
            })
            res.status(200).json({
                access_token: token,
                email: data.email,
            })
        } catch (err) {
            next(err)
        }
    }
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const register = await User.create({ email, password })
            res.status(201).json({
                message: {
                    id: register.id,
                    email: register.email
                }
            })
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Controller