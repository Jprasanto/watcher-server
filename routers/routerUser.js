const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')

// router.get("/", (req, res) => {
//     res.status(200).json({
//         message: "HELLO GES!",
//     });
// });

router.post('/login', ControllerUser.login)
router.post('/register', ControllerUser.register)
router.get('/profile', authentication, ControllerUser.getProfile)
router.post("/generate-midtrans-token", authentication, ControllerUser.midTrans);
router.patch('/subscription', authentication, ControllerUser.roleUpdate)


module.exports = router