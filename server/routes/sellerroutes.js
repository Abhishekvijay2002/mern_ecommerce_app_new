const express = require('express');
const sellerrouter = express.Router();
const authUser = require('../middleware/authuser');
const { requestSeller, getSellerStatus, cancelSellerRequest, getSellerRequest, getAllSellerRequests, approveSellerRequest, rejectSellerRequest, getAllSeller, removeSeller } = require('../controller/sellercontroller');
const authAdmin = require('../middleware/authadmin');

sellerrouter.post('/request',authUser,requestSeller);
sellerrouter.get('/status', authUser, getSellerStatus);
sellerrouter.delete('/cancelrequest',authUser, cancelSellerRequest);

sellerrouter.get('/requests', authAdmin,getAllSellerRequests);
sellerrouter.get('/requests/:id',authAdmin, getSellerRequest);
sellerrouter.put('/requests/approve/:id',authAdmin, approveSellerRequest);
sellerrouter.put('/requests/reject/:id', authAdmin, rejectSellerRequest);
sellerrouter.delete('/remove/:id', authAdmin,removeSeller ); 
sellerrouter.get('/allsellers', authAdmin, getAllSeller);

module.exports = sellerrouter;
