const express = require('express');
const sellerrouter = express.Router();
const { requestSeller, getSellerStatus, cancelSellerRequest, getSellerRequest, getAllSellerRequests, approveSellerRequest, rejectSellerRequest, getAllSeller, removeSeller } = require('../controller/sellercontroller');
const { authUser, authAdmin } = require('../middleware/authmiddleware');


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
