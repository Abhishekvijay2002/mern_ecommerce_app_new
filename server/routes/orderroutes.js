const express = require('express');

const { addOrder,updateOrder, getOrders, cancelOrder, getAllOrders } = require('../controller/ordercontroller');
const { authUser, authAdmin } = require('../middleware/authmiddleware');

const orderrouter = express.Router();

orderrouter.post('/add', authUser, addOrder);
orderrouter.get('/userorders', authUser, getOrders);
orderrouter.get('/allorders', authAdmin, getAllOrders);
orderrouter.patch('/update/:id',authAdmin, updateOrder);
orderrouter.delete('/delete/:id',authUser,cancelOrder);

module.exports =orderrouter;
