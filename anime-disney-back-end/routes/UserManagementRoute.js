const expres = require('express');
const Router = expres.Router();


const { UserLogin, UserRegister, getAllUsers } = require('../controllers/UserManagementController');



//Embdedded Data Route
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister );
Router.get('/getAllUsers', getAllUsers);
module.exports = Router;