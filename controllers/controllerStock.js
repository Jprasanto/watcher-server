const { Watchlist, Composite, Ticker } = require('../models/index')
const axios = require('axios')



class Controller {
    static async ihsgData(req, res, next) {
        try {
            const { access_token } = req.headers
            console.log(access_token)
            if (!access_token) throw { name: "Please login first" }

            const ihsg = await Composite.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                },
                order: [['id', "DESC"]]
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
        const { access_token } = req.headers
        // console.log(access_token)
        if (!access_token) throw { name: "Please login first" }

        // console.log(symbol, '<<< symbol nich ')
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

}


module.exports = Controller