const express = require('express')
const router = express.Router()
const routerStock = require('./routerStock')
const routerUser = require('./routerUser')
const authentication = require('../middlewares/authentication')


router.use(routerUser)
router.use(authentication)
router.use(routerStock)



module.exports = router