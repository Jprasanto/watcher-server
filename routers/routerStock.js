const express = require('express')
const router = express.Router()
const ControllerStock = require('../controllers/controllerStock')

router.get('/', ControllerStock.ihsgData)

router.get('/stocks/:symbol', ControllerStock.stockDataGraph)
router.post('/wlist/:TickerId', ControllerStock.myWl)
router.get('/fs/:symbol', ControllerStock.fsTicker)
// router.post("/generate-midtrans-token", ControllerStock.midTrans);

module.exports = router