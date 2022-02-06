// Dependencies
const expres = require('express');
const Router = expres.Router();
// Dependencies


//Importing Controllers
const { WithDrawlRequestByUser, AcquireAllWithDrawls, UpdateWithDrawStatusById, OnApprovedWithDrawlRequest, WithDrawlByUserName, DeleteWithdrawById  } = require('../controllers/WithDrawlsManagementController');
//Importing Controllers

// Making Routes
Router.post('/WithDrawlRequestByUser',WithDrawlRequestByUser);
Router.get('/AcquireAllWithDrawls',AcquireAllWithDrawls);
Router.post('/UpdateWithDrawStatus/:_WithDrawId',UpdateWithDrawStatusById );
Router.post('/OnApprovedWithDrawlRequest/:_AdminId',OnApprovedWithDrawlRequest);
Router.post('/WithDrawlByUserName',WithDrawlByUserName)
Router.delete('/WithDrawlDeleteById/:_Id', DeleteWithdrawById);
// Making Routes


module.exports = Router;