const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const verifyPassword = (password, encrypted) => {
    return bcrypt.compareSync(password, encrypted)
}

module.exports = { hashPassword, verifyPassword }