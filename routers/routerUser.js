const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/controllerUser')

router.get("/", (req, res) => {
    res.status(200).json({
        message: "HELLO GES!",
    });
});

router.post('/login', ControllerUser.login)
router.post('/register', ControllerUser.register)

module.exports = router