const express = require('express')
const router = express.Router()
const routerStock = require('./routerStock')
const routerWl = require('./routerWl')
const routerUser = require('./routerUser')
const authentication = require('../middlewares/authentication')


router.use(routerUser)

router.use(authentication)
// router.use('/stocks', routerStock)
// router.use('/wl', routerWl)


module.exports = router