const express = require('express')
const router = express.Router()
const ControllerStock = require('../controllers/controllerStock')

router.get('/', ControllerStock.ihsgData)

router.get('/stocks/:symbol', ControllerStock.stockDataGraph)
router.post('/stocks/:symbol', ControllerStock.myWl)

module.exports = router