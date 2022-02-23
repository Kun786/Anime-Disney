const expres = require('express');
const Router = expres.Router();

const { MakeStripePayment } = require('../controllers/StripePaymentManagementController');
Router.post('/MakeStripePayment',MakeStripePayment);

module.exports = Router;