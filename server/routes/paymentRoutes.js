
const { paymentFunction } = require('../controller/paymentController')
const { authUser } = require('../middleware/authmiddleware')



const paymentRouter = require('express').Router()


paymentRouter.post("/makepayment",authUser, paymentFunction)

module.exports = paymentRouter