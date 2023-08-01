const { Watchlist, Composite, Ticker } = require('../models/index')
const axios = require('axios')
// const midtransClient = require("midtrans-client");

class Controller {
    static async ihsgData(req, res, next) {
        try {
            const ihsg = await Composite.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                }
            })
            res.status(200).json({
                ihsg
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "Internal server error"
            })
        }
    }
    static stockDataGraph(req, res, next) {
        const { symbol } = req.params
        const params = {
            access_key: '658610156ffa6b4c3353c27e8905eb19',
        }

        axios.get(`http://api.marketstack.com/v1/tickers/${symbol}/eod`, { params })
            .then(response => {
                // console.log(response.data)
                const apiResponse = response.data;
                res.status(200).json({
                    apiResponse
                })
            }).catch(error => {
                console.log(error);
            });
    }
    static async myWl(req, res, next) {
        // const { symbol } = req.params
        try {
            const { TickerId } = req.params
            console.log(TickerId, 9898)
            console.log(req.user, "<")

            const data = await Ticker.findByPk(+TickerId)
            if (!data) throw { name: "error not found" }
            const ticker = await Watchlist.create({ TickerId, UserId: req.user.id })
            res.status(201).json({
                message: ticker
            })
        } catch (err) {
            console.log(err, "<<<<")
            next(err)
        }
    }
    static fsTicker(req, res, next) {
        const { symbol } = req.params

        const url = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?apikey=7fc5a2dabcda5bd3fdda8086fc43b2ea`;

        axios.get(url)
            .then((response) => {
                // console.log(response.data);
                const apiResponse = response.data;
                res.status(200).json({
                    apiResponse
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // static async midTrans(req, res, next) {
    //     try {
    //         let snap = new midtransClient.Snap({
    //             // Set to true if you want Production Environment (accept real transaction).
    //             isProduction: false,
    //             serverKey: process.env.MIDTRANS_SERVER_KEY,
    //         });

    //         let parameter = {
    //             transaction_details: {
    //                 order_id: order.id,
    //                 gross_amount: orderdetail.price,
    //             },
    //             credit_card: {
    //                 secure: true,
    //             },
    //             customer_details: {
    //                 first_name: "admin",
    //             },
    //         };

    //         const midtransToken = await snap.createTransaction(parameter);
    //         res.status(201).json({
    //             midtransToken,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}


module.exports = Controller