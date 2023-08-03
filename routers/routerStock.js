const express = require('express')
const router = express.Router()
const ControllerStock = require('../controllers/controllerStock')

router.get('/', ControllerStock.ihsgData)

router.get('/ticker', ControllerStock.readTicker)
router.get('/wlist', ControllerStock.readWl)
router.get('/stocks/:symbol', ControllerStock.stockDataGraph)
router.post('/wlist/:TickerId', ControllerStock.myWl)
router.get('/fs/:symbol', ControllerStock.fsTicker)

module.exports = router