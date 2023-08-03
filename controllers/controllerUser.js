const { User } = require('../models/index')
const { generateToken } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/bcrypt')
const midtransClient = require("midtrans-client");

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: "Email is required" }
            if (!password) throw { name: "Password is required" }

            const data = await User.findOne({ where: { email } })
            if (!data) {
                throw { name: "Invalid email/password" }
            }
            if (!verifyPassword(password, data.password)) throw { name: "Invalid email/password" }

            const token = generateToken({
                id: data.id,
                email: data.email,
                role: data.role
            })
            res.status(200).json({
                access_token: token,
                email: data.email,
                role: data.role
            })
        } catch (err) {
            if (err.name === "Email is required" ||
                err.name === "Password is required") {
                res.status(400).json({
                    "message": err.name
                })
            } else if (err.name === "Invalid email/password") {
                res.status(400).json({
                    "message": "Invalid email/password"
                })
            }
            else {
                res.status(500).json({
                    "message": "Internal server error"
                })
            }
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
    static async midTrans(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)
            if (user.role === "premium") throw { name: "You are already a premimum member" }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            let parameter = {
                transaction_details: {
                    order_id: "TRANSACTION" + Math.floor(100000 + Math.random() * 90000),
                    gross_amount: 99999,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    email: user.email,
                },
            };

            const midtransToken = await snap.createTransaction(parameter);
            console.log(midtransToken, "<<<")
            res.status(201).json({
                midtransToken,
            });
        } catch (err) {
            console.log(err);
            if (err.name === "You are already a premimum member") {
                res.status(400).json({
                    message: "You are already a premimum member"
                });
            }
        }
    }
    //ini untuk lanjutan midtrans, kalo udah baya, baru trigger
    static async roleUpdate(req, res, next) {
        try {
            await User.update(
                { role: "premium" }, {
                where: {
                    id: req.user.id
                }
            }
            )
            res.status(200).json({
                message: `Congratulations, account ${req.user.email} is now a premium member`
            })
        } catch (err) {
            console.log(err)
        }
    }
    static async getProfile(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)
            res.status(200).json({
                id: user.id,
                role: user.role
            })
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = Controller