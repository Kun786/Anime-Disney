const expres = require('express');
const Router = expres.Router();


const { UserLogin, UserRegister } = require('../controllers/UserManagementController');



//Embdedded Data Route
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister );
module.exports = Router;