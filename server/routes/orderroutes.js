const express = require('express');

const authuser = require('../middleware/authuser');
const authAdmin = require('../middleware/authadmin');
const { addOrder,updateOrder, getOrders, cancelOrder, getAllOrders } = require('../controller/ordercontroller');

const orderrouter = express.Router();

orderrouter.post('/add', authuser, addOrder);
orderrouter.get('/userorders', authuser, getOrders);
orderrouter.get('/allorders', authAdmin, getAllOrders);
orderrouter.patch('/update/:id',authAdmin, updateOrder);
orderrouter.delete('/delete/:id',authuser,cancelOrder);

module.exports =orderrouter;
