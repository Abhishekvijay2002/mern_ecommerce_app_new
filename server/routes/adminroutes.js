const { adminregister } = require('../controller/adminController');


const adminRouter = require('express').Router()

adminRouter.post("/register",adminregister)

module.exports = adminRouter;