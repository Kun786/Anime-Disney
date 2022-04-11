const expres = require('express');
const Router = expres.Router();


const { UserLogin, UserRegister, getAllUsers, UpdateUser } = require('../controllers/UserManagementController');



//Embdedded Data Route
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister );
Router.get('/getAllUsers', getAllUsers);
Router.put('/UpdateUser/:id',UpdateUser );
module.exports = Router;